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
    "You’re doing fine, honestly.",
    "Even MATLAB crashes sometimes.",
    "Steam the stress away 🥟",
    "Bad labs happen. Good momos heal.",
    "Flower power > lab error 🌸",
    "One step at a time. You got this."
  ];

  useEffect(() => {
    if (stage === "delivering") {
      setTimeout(() => setShowFlower(true), 500);
      setTimeout(() => setShowMomo(true), 1200);
      setTimeout(() => setStage("delivered"), 2500);
    }
  }, [stage]);

  const handleOrder = () => {
    setStage("delivering");
  };

  const handleMoreMomo = () => {
    setMomoCount(momoCount + 1);
    const randomMsg = randomMessages[Math.floor(Math.random() * randomMessages.length)];
    setMessages((prev) => [...prev, randomMsg]);
  };

  return (
    <div className="App">
      <div className="card">
        {stage === "start" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Hey 👋</h1>
            <p>You did your lab. It’s fine. <br />Here’s something to fix the mood.</p>
            <button onClick={handleOrder}>Deliver my order 🌸🥟</button>
          </motion.div>
        )}

        {stage === "delivering" && (
          <motion.div
            key="delivering"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>Preparing your order...</p>
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
            transition={{ duration: 0.6 }}
          >
            <div className="delivery">
              <AnimatePresence>
                {showFlower && (
                  <motion.div
                    className="emoji flower"
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    🌸
                  </motion.div>
                )}
                {showMomo && (
                  <motion.div
                    className="emoji momo"
                    initial={{ y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 80 }}
                  >
                    🥟
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <h2>1 flower 🌸 and 1 plate of momos 🥟 delivered successfully.</h2>
            <p className="quote">Bad labs happen. Good momos heal.</p>

            <button onClick={handleMoreMomo}>Need another momo?</button>

            <div className="message-box">
              {messages.map((msg, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {msg}
                </motion.p>
              ))}
            </div>

            {momoCount >= 5 && (
              <p className="easter-egg">Okay calm down chef 😭 that’s enough momos.</p>
            )}

            <button className="secondary" onClick={() => window.location.reload()}>
              Deliver again 🚀
            </button>
          </motion.div>
        )}
      </div>
      <footer>made with 🌸 + 🥟 + 😎</footer>
    </div>
  );
}

export default App;
