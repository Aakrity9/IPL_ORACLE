import os
import uuid
import math
import pandas as pd
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load data
DATA_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "IPL_players_2008_2026.csv")
df = pd.read_csv(DATA_PATH)

# Clean up data
df.fillna('', inplace=True)

# Generate binary features
binary_features = {}

def add_feature(name, condition, question_text):
    binary_features[name] = {
        'condition': condition,
        'question_text': question_text
    }

# Bools
for col in ['is_caption', 'is_opener', 'is_finisher', 'is_death_bowler', 'is_man_of_the_match']:
    question_text = f"Is the player a {col.replace('is_', '').replace('_', ' ')}?"
    if col == 'is_caption': question_text = "Has the player ever been a captain?"
    elif col == 'is_opener': question_text = "Does the player open the batting?"
    elif col == 'is_finisher': question_text = "Is the player known as a finisher?"
    elif col == 'is_death_bowler': question_text = "Is the player a death bowler?"
    elif col == 'is_man_of_the_match': question_text = "Has the player ever won Man of the Match?"
    
    add_feature(col, lambda row, c=col: str(row[c]).lower() == 'true', question_text)

# Categoricals
for val in df['batting_style'].unique():
    if val: add_feature(f'bat_{val}', lambda row, v=val: row['batting_style'] == v, f"Is the player a {val} batsman?")

for val in df['bowling_style'].unique():
    if val: add_feature(f'bowl_{val}', lambda row, v=val: row['bowling_style'] == v, f"Does the player bowl {val}?")

for val in df['country'].unique():
    if val:
        q = "Is the player from India?" if val.lower() == 'indian' else "Is the player an overseas player?"
        add_feature(f'country_{val}', lambda row, v=val: row['country'] == v, q)

for val in df['primary_role'].unique():
    if val: add_feature(f'role_{val}', lambda row, v=val: row['primary_role'] == v, f"Is the player's primary role a {val}?")

for val in df['legacy_teams_tag'].unique():
    if val: add_feature(f'team_{val}', lambda row, v=val: row['legacy_teams_tag'] == v, f"Has the player played for {val}?")

for val in df['cap_winner'].unique():
    if val: add_feature(f'cap_{val}', lambda row, v=val: row['cap_winner'] == v, f"Has the player ever won the {val} cap?")

for val in df['player_status_tag'].unique():
    if val: add_feature(f'status_{val}', lambda row, v=val: row['player_status_tag'] == v, f"Is the player currently {val} in IPL?")

# Precompute feature matrix
players = df.to_dict(orient='records')
feature_matrix = []
for p in players:
    f_row = {}
    for f_name, f_info in binary_features.items():
        f_row[f_name] = f_info['condition'](p)
    feature_matrix.append(f_row)

sessions = {}

class AnswerReq(BaseModel):
    session_id: str
    answer: str

def get_best_question(remaining_indices, asked_features):
    best_f = None
    min_diff = float('inf')
    
    total = len(remaining_indices)
    if total == 0:
        return None
        
    for f_name in binary_features.keys():
        if f_name in asked_features:
            continue
            
        true_count = sum(1 for idx in remaining_indices if feature_matrix[idx][f_name])
        
        diff = abs(total / 2 - true_count)
        
        if true_count == 0 or true_count == total:
            continue
            
        if diff < min_diff:
            min_diff = diff
            best_f = f_name
            
    return best_f

@app.post("/start-session")
def start_session():
    session_id = str(uuid.uuid4())
    sessions[session_id] = {
        'remaining': list(range(len(players))),
        'asked': set(),
        'question_number': 1
    }
    
    best_f = get_best_question(sessions[session_id]['remaining'], sessions[session_id]['asked'])
    if not best_f:
        raise HTTPException(status_code=500, detail="No questions available")
        
    sessions[session_id]['current_attribute'] = best_f
    sessions[session_id]['asked'].add(best_f)
    
    return {
        "session_id": session_id,
        "question_number": 1,
        "max_questions": 12,
        "question_text": binary_features[best_f]['question_text'],
        "attribute": best_f,
        "confidence": 0.0
    }

@app.post("/submit-answer")
def submit_answer(req: AnswerReq):
    session = sessions.get(req.session_id)
    if not session:
        raise HTTPException(status_code=404, detail="Session not found")
        
    attr = session['current_attribute']
    ans = req.answer.lower()
    
    new_remaining = []
    for idx in session['remaining']:
        val = feature_matrix[idx][attr]
        if ans == 'yes' and val:
            new_remaining.append(idx)
        elif ans == 'no' and not val:
            new_remaining.append(idx)
        elif ans in ['maybe', 'dont_know']:
            new_remaining.append(idx)
            
    # if our filtering removed all players, we rollback the filtering to prevent 0 remaining.
    if not new_remaining:
        new_remaining = session['remaining']

    session['remaining'] = new_remaining
    session['question_number'] += 1
    
    total_initial = len(players)
    current = len(new_remaining)
    confidence = 1.0 - (current / total_initial) if total_initial > 0 else 0.0
    if confidence < 0: confidence = 0.0
    
    if current <= 1 or session['question_number'] > 12:
        guessed_idx = new_remaining[0] if new_remaining else 0
        session['guessed_idx'] = guessed_idx
        return {
            "question_number": session['question_number'],
            "confidence": 1.0,
            "is_guess": True,
            "guessed_player": players[guessed_idx]['players_name']
        }
        
    best_f = get_best_question(session['remaining'], session['asked'])
    if not best_f:
        guessed_idx = new_remaining[0] if new_remaining else 0
        session['guessed_idx'] = guessed_idx
        return {
            "question_number": session['question_number'],
            "confidence": 1.0,
            "is_guess": True,
            "guessed_player": players[guessed_idx]['players_name']
        }
        
    session['current_attribute'] = best_f
    session['asked'].add(best_f)
    
    return {
        "question_number": session['question_number'],
        "confidence": confidence,
        "is_guess": False,
        "question_text": binary_features[best_f]['question_text'],
        "attribute": best_f
    }

@app.get("/reveal/{session_id}")
def reveal(session_id: str):
    session = sessions.get(session_id)
    if not session or 'guessed_idx' not in session:
        raise HTTPException(status_code=404, detail="Reveal data not available")
        
    p = players[session['guessed_idx']]
    return {
        "player_name": p['players_name'],
        "country": str(p['country']),
        "role": str(p['primary_role']),
        "teams": str(p['legacy_teams_tag']),
        "matches": int(p['total_matchs_played']) if p['total_matchs_played'] else 0,
        "confidence": 0.99,
        "explanation": f"Based on your answers, {p['players_name']} is the best match!"
    }
