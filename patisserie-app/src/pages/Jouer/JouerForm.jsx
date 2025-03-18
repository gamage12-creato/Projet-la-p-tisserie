import React, { useState } from "react";
import dice1 from "../../assets/dice/dice1.png";
import dice2 from "../../assets/dice/dice2.png";
import dice3 from "../../assets/dice/dice3.png";
import dice4 from "../../assets/dice/dice4.png";
import dice5 from "../../assets/dice/dice5.png";
import dice6 from "../../assets/dice/dice6.png";
import "./Jouer.scss";

const diceImages = [null, dice1, dice2, dice3, dice4, dice5, dice6];

const JouerForm = () => {
  const [dices, setDices] = useState(["❓", "❓", "❓", "❓", "❓"]);
  const [attempts, setAttempts] = useState(3);
  const [result, setResult] = useState(null);

  const getRandomDice = () => Math.floor(Math.random() * 6) + 1;

  const rollDices = () => {
    if (attempts > 0) {
      const newDices = Array.from({ length: 5 }, getRandomDice);
      setDices(newDices);
      setAttempts(attempts - 1);
      checkWin(newDices);
    }
  };

  const checkWin = (newDices) => {
    const count = newDices.reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    }, {});

    const values = Object.values(count);
    if (values.includes(4)) {
      setResult("🎉 BRAVO, vous avez gagné 3 pâtisseries !");
    } else if (values.includes(3)) {
      setResult("🎉 BRAVO, vous avez gagné 2 pâtisseries !");
    } else if (values.includes(2)) {
      setResult("🎉 BRAVO, vous avez gagné 1 pâtisserie !");
    } else if (attempts === 1) {
      setResult("😞 PERDU");
    }
  };

  return (
    <div className="game-container">
      <h2>🎲 Jeu du Yams</h2>
      <p>Vous avez 3 lancés.</p>
      <p>🎁 Si vous obtenez une paire (deux dés identiques), vous gagnez 1 pâtisserie.</p>
      <p>🎁 Avec un brelan (trois dés identiques), c'est 2 pâtisseries.</p>
      <p>🎁 En cas de carré (quatre dés identiques), vous remportez 3 pâtisseries.</p>

      <div className="dice-container">
        {dices.map((dice, index) => (
          <div key={index} className="dice">
            {typeof dice === "number" ? <img src={diceImages[dice]} alt={`Dé ${dice}`} /> : "❓"}
          </div>
        ))}
      </div>

      {result && <p className={result.includes("PERDU") ? "lose" : "win"}>{result}</p>}

      <button onClick={rollDices} disabled={attempts === 0}>
        {attempts > 0 ? `🎲 Il vous reste ${attempts} essais` : "Vous n'avez plus d'essais"}
      </button>
    </div>
  );
};

export default JouerForm;
