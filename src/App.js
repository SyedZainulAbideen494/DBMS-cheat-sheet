import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./App.css";

function App() {
  const [stage, setStage] = useState("start");
  const [showFlower, setShowFlower] = useState(false);
  const [showMomo, setShowMomo] = useState(false);
  const [messages, setMessages] = useState([]);
  const [momoCount, setMomoCount] = useState(0);

  const randomMessages = [
    "Okay okay chill, you survived the math lab 💀",
    "Even the computer was confused today ngl 😭",
    "If overthinking was graded, you’d get full marks 🧠💯",
    "Steam away the pain 🥟✨",
    "Flower for your flop day 🌸",
    "Bad labs. Good vibes. Better momos.",
    "Math said ‘no’. I said ‘momos’ 😌",
    "Bro this is therapy disguised as food 💀"
  ];

  useEffect(() => {
    if (stage === "delivering") {
      setTimeout(() => setShowFlower(true), 500);
      setTimeout(() => setShowMomo(true), 1200);
      setTimeout(() => setStage("delivered"), 2500);
    }
  }, [stage]);

  const handleOrder = () => setStage("delivering");

  const handleMoreMomo = () => {
    setMomoCount(momoCount + 1);
    const msg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    setMessages((prev) => [...prev, msg]);
  };

  return (
    <div className="App">
      <div className="card">
        <AnimatePresence mode="wait">
          {stage === "start" && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1>Hey 👋</h1>
              <p>
                I heard the math lab went... let’s say, *memorable* 😭 <br />
                So here — flower & momos therapy, on the house.
              </p>
              <button onClick={handleOrder}>Deliver my order 🌸🥟</button>
            </motion.div>
          )}

          {stage === "delivering" && (
            <motion.div
              key="delivering"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <p>Cooking happiness...</p>
              <div className="loader">
                <div></div><div></div><div></div>
              </div>
            </motion.div>
          )}

          {stage === "delivered" && (
            <motion.div
              key="delivered"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="delivery">
                <AnimatePresence>
                  {showFlower && (
                    <motion.img
                      src="https://cdn-icons-png.flaticon.com/512/765/765477.png"
                      alt="flower"
                      className="emoji flower"
                      initial={{ scale: 0, rotate: -20 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                  {showMomo && (
                    <motion.img
                      src="https://cdn-icons-png.flaticon.com/512/3147/3147997.png"
                      alt="momo"
                      className="emoji momo"
                      initial={{ y: -100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 80 }}
                    />
                  )}
                </AnimatePresence>
              </div>
              <h2>Delivery complete ✅</h2>
              <p className="quote">
                One flower 🌸 & one plate of momos 🥟 — guaranteed to fix 82% of bad moods.
              </p>

              <button onClick={handleMoreMomo}>More momos please 😭</button>

              <div className="message-box">
                {messages.map((msg, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {msg}
                  </motion.p>
                ))}
              </div>

              {momoCount >= 2 && (
                <p className="easter-egg">STFU bro 😭💀 that’s ENOUGH momos.</p>
              )}

              <button className="secondary" onClick={() => window.location.reload()}>
                Send another round 🚀
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <footer>made with 🌸 + 🥟 + 😎 (and questionable math)</footer>
    </div>
  );
}

export default App;
