# 🏏 IPL Oracle: AI-Powered Player Guessing Engine

**IPL Oracle** is an intelligent, interactive guessing game inspired by "Akinator," specifically designed for the Indian Premier League (IPL) ecosystem[cite: 5]. [cite_start]Unlike traditional games that use static decision trees, IPL Oracle leverages **Generative AI** and **Probabilistic Reasoning** to identify any IPL player (past or present) through a sequence of dynamic, high-impact questions[cite: 4, 13].

---

## 🚀 Core Features

* **Dynamic Questioning:** No hardcoded logic or static if/else flows[cite: 30, 34]. The AI generates context-aware questions in real-time based on your previous answers[cite: 7, 33].
* **Information Maximization:** Every question is designed to maximize entropy reduction, narrowing down the pool of all IPL players from 2008 to the present[cite: 18, 25, 42].
* **Confidence-Based Logic:** The engine triggers a final guess only when it reaches a confidence threshold of **≥ 80%**[cite: 44, 59].
* **Adaptive Learning:** The system incorporates user feedback ("No, that wasn't my player") to improve future predictions and knowledge[cite: 48, 49, 50].
* **Efficiency:** Designed to identify the target player in a strict maximum of **8 questions**[cite: 46, 60].

---

## 🏗️ Tech Stack & Infrastructure

The project uses a modern, high-performance stack to ensure a smooth and engaging user experience[cite: 15]:

* **Frontend:** Built with **Tailwind CSS** for a clean, "classic and aesthetic" UI that is fully responsive.
* **Backend:** Powered by **Node.js**, handling the asynchronous AI engine loop and candidate probability updates[cite: 52].
* **AI Engine:** Integrated with the **Gemini API** for dynamic question generation and reasoning logic[cite: 89].
* **Database:** Utilizing **Google Sheets or BigQuery** as the foundational database for historical IPL player stats[cite: 93].

---

## 🧠 The Engine Loop

The system operates on a sophisticated AI-driven deduction loop[cite: 52]:
1.  **First Question:** AI asks a broad, high-impact question[cite: 53].
2.  **User Input:** User responds with *Yes, No, Maybe,* or *Don't Know*[cite: 54].
3.  **Probability Update:** The system updates candidate probabilities across the entire IPL player pool[cite: 55].
4.  **Optimal Selection:** AI selects the next question based on the updated pool to minimize steps[cite: 56].
5.  **Final Prediction:** Once confidence is high, the AI makes its guess: *"You're thinking of [Player Name], right?"*[cite: 65, 66].

---

# 📊 Evaluation Focus

The project is optimized for the following criteria:
* **AI Reasoning (Very High):** Ensuring the system is genuinely dynamic and avoids hidden hardcoded scripts[cite: 97].
* **Question Intelligence (High):** Questions are contextually relevant and information-rich[cite: 97].
* **Innovation & Learning (High):** The ability to adapt from mistakes and user feedback[cite: 97].
* **Accuracy (High):** Consistently guessing correctly within the question limit.

