"""
============================================================
  BASIC RULE-BASED CHATBOT
  Internship Project | Python Fundamentals
  Key Concepts: if-elif, functions, loops, input/output
============================================================
"""

import time
import random


# ─────────────────────────────────────────────
#  RESPONSE BANK  (rule → list of replies)
# ─────────────────────────────────────────────
RESPONSES = {
    # Greetings
    "hello":        ["Hi there! 😊", "Hello! How can I help you?", "Hey! Good to see you!"],
    "hi":           ["Hi! 👋", "Hello!", "Hey there!"],
    "hey":          ["Hey! 😄", "Hi!", "Hello! What's up?"],
    "good morning": ["Good morning! ☀️ Hope you have a great day!", "Morning! 😊"],
    "good evening": ["Good evening! 🌙", "Evening! How's your day been?"],
    "good night":   ["Good night! 🌛 Sleep well!", "Good night! See you tomorrow!"],

    # Status
    "how are you":       ["I'm doing great, thanks for asking! 😊", "All good on my end! How about you?"],
    "how are you doing": ["I'm fantastic! Thanks! 💪", "Doing well! How can I assist you?"],
    "what's up":         ["Not much, just here to chat! 😄", "All good! What about you?"],
    "how do you feel":   ["I'm a chatbot, but if I could feel — I'd say awesome! 🤖"],

    # Identity
    "what is your name": ["I'm ChatBot 🤖, your friendly assistant!", "You can call me ChatBot!"],
    "who are you":       ["I'm a rule-based chatbot built in Python! 🐍", "I'm ChatBot — here to help!"],
    "what can you do":   ["I can chat with you, answer basic questions, and keep you company! 😊"],
    "are you a robot":   ["Technically yes — I'm a bot! 🤖 But a friendly one!"],
    "are you human":     ["Nope! I'm a Python-powered chatbot! 🐍"],
    "are you real":      ["As real as code can be! 😄"],

    # Thanks
    "thank you": ["You're welcome! 😊", "Happy to help!", "Anytime! 🙌"],
    "thanks":    ["No problem! 😊", "Glad I could help!", "You're welcome!"],
    "thank you so much": ["Of course! Always here for you! 🤗"],

    # Help
    "help":       ["Sure! You can say: hello, how are you, tell me a joke, or bye 😊"],
    "what should i say": ["Try: hello / how are you / tell me a joke / your name / bye!"],

    # Jokes
    "tell me a joke": [
        "Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂",
        "Why did the computer go to the doctor? It had a virus! 💻😄",
        "How many programmers does it take to change a lightbulb? None — that's a hardware problem! 😂",
        "I told my computer I needed a break. Now it won't stop sending me Kit-Kat ads! 😄",
    ],
    "joke":       ["Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂"],
    "funny":      ["Here's one: A SQL query walks into a bar, walks up to two tables and asks… 'Can I join you?' 😂"],

    # Weather / Time (simulated)
    "what time is it": [f"I don't have a clock, but Python does! Try: import time; print(time.ctime()) 🕐"],
    "what is the date": ["I can't check dates, but your OS can! Try the `date` command 📅"],

    # Compliments
    "you are great":    ["Aww, thank you! You're pretty great too! 😊🌟"],
    "you are smart":    ["Thanks! I was trained well 😄 (by a smart coder!)"],
    "i love you":       ["That's sweet! I love helping you! 💙"],
    "you are the best": ["You're too kind! 🌟 Thank you!"],

    # Negative
    "i am sad":    ["I'm sorry to hear that 😔 I hope things get better soon! 💙"],
    "i am bored":  ["Let's fix that! Ask me for a joke or tell me something! 😄"],
    "i am tired":  ["Get some rest! 😴 I'll be here when you're back!"],
    "i am happy":  ["That's wonderful! 😊🎉 What's making you happy?"],

    # Python / Tech
    "what is python": ["Python is a high-level, interpreted programming language known for its simplicity! 🐍"],
    "do you know python": ["I was built with Python! It's my native language 🐍😄"],

    # Farewells
    "bye":       ["Goodbye! 👋 It was nice chatting!", "See you later! 😊", "Take care! 👋"],
    "goodbye":   ["Goodbye! Have a great day! 🌟", "See you soon! 👋"],
    "see you":   ["See you! Take care! 😊"],
    "take care": ["You too! Goodbye! 💙"],
    "exit":      ["Exiting chat. Goodbye! 👋"],
    "quit":      ["Goodbye! 👋"],
}

# Keywords that trigger exit
EXIT_KEYWORDS = {"bye", "goodbye", "exit", "quit", "see you", "take care"}

# ─────────────────────────────────────────────
#  HELPER FUNCTIONS
# ─────────────────────────────────────────────

def normalize(text: str) -> str:
    """Lowercase and strip punctuation/extra spaces from user input."""
    import string
    text = text.lower().strip()
    text = text.translate(str.maketrans("", "", string.punctuation))
    return text


def get_response(user_input: str) -> str:
    """
    Match user input against the RESPONSES dictionary.
    Returns a matched reply or a default fallback.
    """
    cleaned = normalize(user_input)

    # Direct match
    if cleaned in RESPONSES:
        return random.choice(RESPONSES[cleaned])

    # Partial / keyword match
    for keyword, replies in RESPONSES.items():
        if keyword in cleaned:
            return random.choice(replies)

    # Fallback
    fallbacks = [
        "Hmm, I'm not sure I understand. Could you rephrase? 🤔",
        "I didn't quite catch that! Try saying 'help' to see what I can do 😊",
        "Interesting! But I'm not sure how to respond to that. Try: hello / joke / bye",
        "I'm still learning! Try asking me something else 🤖",
    ]
    return random.choice(fallbacks)


def typing_effect(text: str, delay: float = 0.03) -> None:
    """Simulate a typing effect for chatbot replies."""
    import sys
    for char in text:
        sys.stdout.write(char)
        sys.stdout.flush()
        time.sleep(delay)
    print()


def print_banner() -> None:
    """Display a welcome banner."""
    banner = """
╔══════════════════════════════════════════════╗
║         🤖  WELCOME TO CHATBOT 1.0  🤖       ║
║  A rule-based chatbot built with Python 🐍   ║
║  Type 'help' to see what I can do!           ║
║  Type 'bye' or 'exit' to quit.               ║
╚══════════════════════════════════════════════╝
"""
    print(banner)


def print_divider() -> None:
    print("─" * 50)


# ─────────────────────────────────────────────
#  MAIN CHAT LOOP
# ─────────────────────────────────────────────

def chat() -> None:
    """Main function: runs the chatbot loop."""
    print_banner()
    print_divider()

    message_count = 0

    while True:
        try:
            # Get user input
            user_input = input("\n  You: ").strip()

            # Handle empty input
            if not user_input:
                print("  Bot: Please say something! I'm listening 😊")
                continue

            message_count += 1

            # Get and display response
            response = get_response(user_input)
            print(f"\n  Bot: ", end="")
            typing_effect(response)
            print_divider()

            # Check for exit keywords
            cleaned = normalize(user_input)
            if any(kw in cleaned for kw in EXIT_KEYWORDS):
                print(f"\n  [Session ended after {message_count} message(s). Goodbye!]\n")
                break

        except KeyboardInterrupt:
            print("\n\n  Bot: Interrupted! Goodbye 👋\n")
            break


# ─────────────────────────────────────────────
#  ENTRY POINT
# ─────────────────────────────────────────────

if __name__ == "__main__":
    chat()
