import { useState, useRef, useEffect } from "react";

// ── RESPONSE BANK ──────────────────────────────────────────────────────────
const RESPONSES = {
  hello: ["Hi there! 😊", "Hello! How can I help you?", "Hey! Great to see you!"],
  hi: ["Hi! 👋", "Hello!", "Hey there! What's up?"],
  hey: ["Hey! 😄", "Hi!", "Hello! How can I help?"],
  "good morning": ["Good morning! ☀️ Hope your day is amazing!", "Morning! 😊 Ready to chat?"],
  "good evening": ["Good evening! 🌙", "Evening! How was your day?"],
  "good night": ["Good night! 🌛 Sleep well!", "Good night! See you tomorrow! 😴"],

  "how are you": ["I'm doing great, thanks! 😊", "All good on my end! How about you?"],
  "how are you doing": ["Fantastic! 💪 How can I help?", "Doing well! And you?"],
  "what's up": ["Not much, just here to chat! 😄", "All good! What about you?"],
  "how do you feel": ["I'm a bot, but I feel… awesome! 🤖✨"],

  "what is your name": ["I'm ChatBot 🤖 — your friendly assistant!", "Call me ChatBot!"],
  "who are you": ["A rule-based chatbot built in Python! 🐍", "I'm ChatBot, here to help! 😊"],
  "what can you do": ["Chat, tell jokes, answer questions, and keep you company! 😊"],
  "are you a robot": ["Technically yes! 🤖 But a very friendly one!"],
  "are you human": ["Nope! Pure Python magic here 🐍😄"],
  "are you real": ["As real as code can be! 😄"],

  "thank you": ["You're welcome! 😊", "Happy to help!", "Anytime! 🙌"],
  thanks: ["No problem! 😊", "Glad I could help!", "You're very welcome!"],

  help: ["Try saying: hello · how are you · tell me a joke · your name · bye 😊"],

  "tell me a joke": [
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂",
    "Why did the computer go to the doctor? It had a virus! 💻😷",
    "How many programmers does it take to change a lightbulb? None — that's a hardware problem! 😂",
    "A SQL query walks into a bar and asks two tables: 'Can I join you?' 😂",
  ],
  joke: ["Why do programmers prefer dark mode? Because light attracts bugs! 🐛😂"],
  funny: ["A SQL query walks into a bar… 'Can I join you?' 😂"],

  "what is python": ["Python is a high-level language loved for its simplicity! 🐍"],
  "do you know python": ["I was built with Python — it's basically my mother tongue! 🐍😄"],

  "i am sad": ["I'm sorry 😔 I hope things look up soon! 💙 I'm here if you need to talk."],
  "i am bored": ["Let's fix that! Ask me for a joke or just say hello! 😄"],
  "i am tired": ["Rest up! 😴 I'll be here when you're back."],
  "i am happy": ["That's wonderful! 🎉 What's making you happy?"],

  "you are great": ["Aww, thank you! You're pretty great too! 🌟"],
  "you are smart": ["Thanks! I had a great coder! 😄"],
  "i love you": ["That's sweet! I love helping you! 💙"],
  "you are the best": ["You're too kind! 🌟 Thank you!"],

  bye: ["Goodbye! 👋 It was great chatting!", "See you later! 😊", "Take care! 👋"],
  goodbye: ["Goodbye! Have a great day! 🌟", "See you soon! 👋"],
  "see you": ["See you! Take care! 😊"],
  exit: ["Thanks for chatting! Goodbye! 👋"],
};

const EXIT_KEYWORDS = new Set(["bye", "goodbye", "exit", "quit", "see you"]);

function normalize(text) {
  return text.toLowerCase().replace(/[^\w\s]/g, "").trim();
}

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getResponse(input) {
  const cleaned = normalize(input);
  if (RESPONSES[cleaned]) return getRandom(RESPONSES[cleaned]);
  for (const [key, replies] of Object.entries(RESPONSES)) {
    if (cleaned.includes(key)) return getRandom(replies);
  }
  const fallbacks = [
    "Hmm, I'm not sure I understand 🤔 Try typing 'help'!",
    "I didn't catch that! Try: hello / joke / bye 😊",
    "Still learning! Try asking something else 🤖",
    "Could you rephrase that? I want to help! 😊",
  ];
  return getRandom(fallbacks);
}

// ── SUGGESTION CHIPS ───────────────────────────────────────────────────────
const SUGGESTIONS = [
  "Hello 👋", "How are you?", "Tell me a joke 😂",
  "What's your name?", "What can you do?", "Bye 👋",
];

// ── TYPING INDICATOR ───────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 4, padding: "10px 14px",
      background: "#1e293b", borderRadius: 18, borderBottomLeftRadius: 4,
      width: "fit-content",
    }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 7, height: 7, borderRadius: "50%", background: "#6366f1",
          animation: "bounce 1.2s infinite ease-in-out",
          animationDelay: `${i * 0.2}s`,
        }} />
      ))}
    </div>
  );
}

// ── MESSAGE BUBBLE ─────────────────────────────────────────────────────────
function Bubble({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div style={{
      display: "flex",
      justifyContent: isUser ? "flex-end" : "flex-start",
      marginBottom: 12,
      animation: "fadeUp 0.3s ease",
    }}>
      {!isUser && (
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, marginRight: 8, flexShrink: 0, marginTop: 2,
        }}>🤖</div>
      )}
      <div style={{
        maxWidth: "72%",
        padding: "11px 16px",
        borderRadius: isUser ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
        background: isUser
          ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
          : "#1e293b",
        color: "#f1f5f9",
        fontSize: 14.5,
        lineHeight: 1.55,
        boxShadow: "0 2px 8px rgba(0,0,0,0.25)",
        wordBreak: "break-word",
      }}>
        {msg.text}
        <div style={{ fontSize: 10.5, color: isUser ? "rgba(255,255,255,0.55)" : "#475569", marginTop: 4, textAlign: "right" }}>
          {msg.time}
        </div>
      </div>
      {isUser && (
        <div style={{
          width: 34, height: 34, borderRadius: "50%",
          background: "#334155",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 16, marginLeft: 8, flexShrink: 0, marginTop: 2,
        }}>🧑</div>
      )}
    </div>
  );
}

// ── MAIN APP ───────────────────────────────────────────────────────────────
export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      role: "bot", text: "Hi! I'm ChatBot 🤖 — a rule-based assistant built with Python. Type something to get started, or pick a suggestion below!",
      time: now(),
    }
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [ended, setEnded] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  function now() {
    return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }

  function send(text) {
    if (!text.trim() || ended) return;
    const userMsg = { role: "user", text: text.trim(), time: now() };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setMsgCount(c => c + 1);
    setTyping(true);

    const delay = 600 + Math.random() * 600;
    setTimeout(() => {
      const reply = getResponse(text);
      setTyping(false);
      setMessages(prev => [...prev, { role: "bot", text: reply, time: now() }]);

      const cleaned = normalize(text);
      if ([...EXIT_KEYWORDS].some(k => cleaned.includes(k))) {
        setEnded(true);
        setTimeout(() => {
          setMessages(prev => [...prev, {
            role: "bot",
            text: `✅ Session ended after ${msgCount + 1} message(s). Refresh to start a new chat!`,
            time: now(),
          }]);
        }, 800);
      }
    }, delay);
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(input); }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#0f0c29,#302b63,#24243e)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "'Segoe UI',system-ui,sans-serif",
      padding: 16,
    }}>
      <style>{`
        @keyframes bounce {
          0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)}
        }
        @keyframes fadeUp {
          from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)}
        }
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-track{background:transparent}
        ::-webkit-scrollbar-thumb{background:#334155;border-radius:4px}
        textarea:focus{outline:none}
        button:hover{opacity:0.88}
        button:active{transform:scale(0.97)}
      `}</style>

      <div style={{
        width: "100%", maxWidth: 480,
        background: "#0f172a",
        borderRadius: 24,
        boxShadow: "0 24px 60px rgba(0,0,0,0.6)",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
        height: "min(680px,90vh)",
        border: "1px solid rgba(99,102,241,0.2)",
      }}>

        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg,#4f46e5,#7c3aed)",
          padding: "16px 20px",
          display: "flex", alignItems: "center", gap: 12,
          flexShrink: 0,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: "50%",
            background: "rgba(255,255,255,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 22,
          }}>🤖</div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#fff" }}>ChatBot 1.0</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block" }} />
              Rule-based · Python 🐍 · {msgCount} messages
            </div>
          </div>
          <div style={{ marginLeft: "auto", fontSize: 12, color: "rgba(255,255,255,0.5)", textAlign: "right" }}>
            Internship<br />Project
          </div>
        </div>

        {/* Concept tags */}
        <div style={{
          background: "#1e293b",
          padding: "8px 16px",
          display: "flex", gap: 6, flexWrap: "wrap",
          borderBottom: "1px solid #334155",
          flexShrink: 0,
        }}>
          {["if-elif", "functions", "loops", "input/output"].map(tag => (
            <span key={tag} style={{
              fontSize: 10.5, fontFamily: "monospace",
              background: "rgba(99,102,241,0.15)", color: "#818cf8",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: 20, padding: "2px 9px",
            }}>{tag}</span>
          ))}
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto",
          padding: "18px 16px",
        }}>
          {messages.map((msg, i) => <Bubble key={i} msg={msg} />)}
          {typing && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: "linear-gradient(135deg,#6366f1,#8b5cf6)",
                display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
              }}>🤖</div>
              <TypingDots />
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestion chips */}
        {!ended && (
          <div style={{
            padding: "6px 14px",
            display: "flex", gap: 6, flexWrap: "wrap",
            borderTop: "1px solid #1e293b",
            flexShrink: 0,
          }}>
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => send(s)} style={{
                fontSize: 12, padding: "4px 11px",
                background: "rgba(99,102,241,0.12)",
                color: "#a5b4fc",
                border: "1px solid rgba(99,102,241,0.25)",
                borderRadius: 20, cursor: "pointer",
                transition: "all 0.15s",
              }}>{s}</button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{
          padding: "12px 14px",
          borderTop: "1px solid #1e293b",
          display: "flex", gap: 10, alignItems: "flex-end",
          flexShrink: 0,
          background: "#0f172a",
        }}>
          <textarea
            ref={inputRef}
            rows={1}
            placeholder={ended ? "Session ended. Refresh to restart." : "Type a message…"}
            value={input}
            disabled={ended}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            style={{
              flex: 1,
              background: "#1e293b",
              border: "1px solid #334155",
              borderRadius: 14,
              padding: "10px 14px",
              color: "#f1f5f9",
              fontSize: 14,
              resize: "none",
              fontFamily: "inherit",
              lineHeight: 1.4,
              maxHeight: 100,
              overflowY: "auto",
            }}
          />
          <button
            onClick={() => send(input)}
            disabled={ended || !input.trim()}
            style={{
              width: 42, height: 42,
              borderRadius: 14,
              background: input.trim() && !ended
                ? "linear-gradient(135deg,#6366f1,#8b5cf6)"
                : "#1e293b",
              border: "none",
              color: "#fff",
              fontSize: 18,
              cursor: input.trim() && !ended ? "pointer" : "default",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.2s", flexShrink: 0,
            }}
          >➤</button>
        </div>
      </div>
    </div>
  );
}
