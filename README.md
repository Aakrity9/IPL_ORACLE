# 🏏 IPL Oracle: AI-Powered Player Guessing Engine

**IPL Oracle** is an intelligent, interactive guessing game inspired by "Akinator," specifically designed for the Indian Premier League (IPL) ecosystem. Unlike traditional games that use static decision trees, IPL Oracle leverages **Generative AI** and **Probabilistic Reasoning** to identify any IPL player (past or present) through a sequence of dynamic, high-impact questions.

---

## 🚀 Core Features

* **Dynamic Questioning:** No hardcoded logic or static if/else flows. The AI generates context-aware questions in real-time based on your previous answers.
* **Information Maximization:** Every question is designed to maximize entropy reduction, narrowing down the pool of all IPL players from 2008 to the present.
* **Confidence-Based Logic:** The engine triggers a final guess only when it reaches a confidence threshold of **≥ 80%**.
* **Adaptive Learning:** The system incorporates user feedback ("No, that wasn't my player") to improve future predictions and knowledge.
* **Efficiency:** Designed to identify the target player in a strict maximum of **8 questions**.

---

## 🏗️ Tech Stack & Infrastructure

The project uses a modern, high-performance stack to ensure a smooth and engaging user experience64:

* **Frontend:** Built with **Tailwind CSS** for a clean, "classic and aesthetic" UI that is fully responsive.
* **Backend:** Powered by **Node.js**, handling the asynchronous AI engine loop and candidate probability updates.
* **AI Engine:** Integrated with the **Gemini API** for dynamic question generation and reasoning logic.
* **Database:** Utilizing **Google Sheets or BigQuery** as the foundational database for historical IPL player stats.

---

## 🧠 The Engine Loop

The system operates on a sophisticated AI-driven deduction loop:
1.  **First Question:** AI asks a broad, high-impact question.
2.  **User Input:** User responds with *Yes, No, Maybe,* or *Don't Know*.
3.  **Probability Update:** The system updates candidate probabilities across the entire IPL player pool.
4.  **Optimal Selection:** AI selects the next question based on the updated pool to minimize steps.
5.  **Final Prediction:** Once confidence is high, the AI makes its guess: *"You're thinking of [Player Name], right?.

---

# 📊 Evaluation Focus

The project is optimized for the following criteria:
* **AI Reasoning (Very High):** Ensuring the system is genuinely dynamic and avoids hidden hardcoded scripts.
* **Question Intelligence (High):** Questions are contextually relevant and information-rich.
* **Innovation & Learning (High):** The ability to adapt from mistakes and user feedback.
* **Accuracy (High):** Consistently guessing correctly within the question limit.

