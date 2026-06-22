# 🤖 Basic Rule-Based ChatBot
### Internship Project — Python Fundamentals

---

## 📌 Project Overview

A **rule-based chatbot** built in Python that accepts natural language input from the user and responds with predefined, context-aware replies.

---

## 🎯 Goal

Build a simple chatbot using core Python concepts to simulate a basic conversation interface.

---

## 🔍 Scope

| Feature | Details |
|---|---|
| User Inputs | "hello", "how are you", "tell me a joke", "bye", and 30+ more |
| Bot Replies | Predefined, randomized responses from a response bank |
| Exit Detection | Detects "bye", "exit", "quit", "goodbye" to end the session |
| Typing Effect | Simulates realistic typing with character-by-character output |
| Session Stats | Displays total messages sent when session ends |

---

## 🧠 Key Concepts Used

| Concept | Where Used |
|---|---|
| `if-elif` | Inside `get_response()` to match inputs to replies |
| `functions` | `normalize()`, `get_response()`, `typing_effect()`, `chat()` |
| `loops` | `while True` main chat loop with exit condition |
| `input/output` | `input()` for user text, `print()` / `sys.stdout.write()` for output |
| `dictionaries` | `RESPONSES` dict maps keywords → list of replies |
| `random` | `random.choice()` picks a random reply from matched list |
| `string` | `str.maketrans()` strips punctuation for clean matching |

---

## 📁 Project Structure

```
chatbot_project/
│
├── chatbot.py       ← Main Python script (run this)
├── README.md        ← This file
└── ChatBot.jsx      ← React UI version (bonus web demo)
```

---

## ▶️ How to Run

```bash
python chatbot.py
```

No external libraries required — **100% Python Standard Library**.

---

## 💬 Sample Conversation

```
╔══════════════════════════════════════════════╗
║         🤖  WELCOME TO CHATBOT 1.0  🤖       ║
╚══════════════════════════════════════════════╝

  You: hello
  Bot: Hi there! 😊

  You: how are you
  Bot: I'm doing great, thanks for asking! 😊

  You: tell me a joke
  Bot: Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂

  You: bye
  Bot: Goodbye! 👋 It was nice chatting!

  [Session ended after 4 message(s). Goodbye!]
```

---

## 🛠️ How It Works

```
User types input
      │
      ▼
normalize() → lowercase + remove punctuation
      │
      ▼
get_response() → check RESPONSES dict
      │
      ├─ Direct key match?  → return random reply
      ├─ Keyword found?     → return random reply
      └─ No match?          → return fallback message
      │
      ▼
typing_effect() → prints reply character by character
      │
      ▼
Check for EXIT keyword → end loop or continue
```

---

## ✅ Requirements

- Python 3.6+
- No external packages needed

---

*Built for Internship Submission | Python Fundamentals Project*
