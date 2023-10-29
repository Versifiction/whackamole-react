import { useEffect, useState } from "react";
import mole from "./assets/mole.png";

import "./App.css";

const INITIAL_TIME = 15;
const INITIAL_SCORE = 0;
const DELAY = 1000;

function App() {
  const [holes, setHoles] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const [moleIndex, setMoleIndex] = useState();
  const [gameHasStarted, setGameHasStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(10);

  const randomMoveFromMole = () => {
    setInterval(() => {
      if (gameHasStarted) {
        let randomIndex = Math.floor(Math.random() * holes.length);
        setMoleIndex(randomIndex);
        setTimeout(() => {
          setMoleIndex(-1);
        }, DELAY);
      } else {
        setMoleIndex(-1);
      }
    }, DELAY);
  };

  const toggleStateGame = () => {
    setGameHasStarted((g) => !g);
  };

  const incrementScore = () => {
    setScore((s) => s + 1);
  };

  const decrementTime = () => {
    setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);
  };

  const resetGame = () => {
    setGameHasStarted(false);
    setTime(INITIAL_TIME);
    setScore(INITIAL_SCORE);
  };

  useEffect(() => {
    if (gameHasStarted) {
      randomMoveFromMole();

      decrementTime();
    }
  }, [gameHasStarted]);

  useEffect(() => {
    if (time === 0) {
      alert(`Temps écoulé ! Score : ${score}`);
      resetGame();
    }
  }, [time]);

  return (
    <>
      <div className="flex justify-center my-4">
        Score :&nbsp;<span className="font-bold">{score}</span>
      </div>
      <div className="flex justify-center my-4">
        Temps restant :&nbsp;<span className="font-bold">{time} secondes</span>
      </div>
      <div className="flex justify-center my-16">
        <div className="flex justify-center items-center flex-wrap max-w-[660px]">
          {holes?.map((hole, index) => (
            <div
              className="h-[220px] w-[220px] rounded-full bg-black"
              key={index}
            >
              {moleIndex === index && (
                <img
                  src={mole}
                  className="h-[220px] w-[220px] cursor-pointer"
                  onClick={incrementScore}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center my-4">
        <button onClick={toggleStateGame}>
          {!gameHasStarted ? "Commencer" : "Arrêter"}
        </button>
      </div>
    </>
  );
}

export default App;
