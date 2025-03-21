import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  rollDices as rollDicesAction,
  toggleLockDice as toggleLockDiceAction,
  saveGameProgress,
  resetGame,
} from "../../store/slices/gameDice";
import { useGetWinPastriesMutation } from "../../store/slices/gameSlice";
import dice1 from "../../assets/dice/dice1.png";
import dice2 from "../../assets/dice/dice2.png";
import dice3 from "../../assets/dice/dice3.png";
import dice4 from "../../assets/dice/dice4.png";
import dice5 from "../../assets/dice/dice5.png";
import dice6 from "../../assets/dice/dice6.png";
import "./Jouer.scss";

const diceImages = [null, dice1, dice2, dice3, dice4, dice5, dice6];

const JouerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dices = useSelector((state) => state.game.dices);
  const lockedDices = useSelector((state) => state.game.lockedDices);
  const attempts = useSelector((state) => state.game.attempts);
  const firstRollDone = useSelector((state) => state.game.firstRollDone);
  const [gameOver, setGameOver] = React.useState(false);
  const [result, setResult] = React.useState(null);
  const [pastriesWon, setPastriesWon] = React.useState([]);
  const [updateWinPastries, { isLoading }] = useGetWinPastriesMutation();

  // Réinitialise la partie quand il n'y a plus d'essais ou si le joueur a gagné
  useEffect(() => {
    if (attempts === 0 || (gameOver && pastriesWon.length > 0)) {
      setTimeout(() => {
        dispatch(resetGame());
        navigate("/");
      }, 2000); // Petite pause pour voir le message avant redirection
    }
  }, [attempts, gameOver, pastriesWon, dispatch, navigate]);

  const getRandomDice = () => Math.floor(Math.random() * 6) + 1;

  const rollDices = async () => {
    if (attempts > 0 && !gameOver) {
      const newDices = dices.map((dice, index) =>
        lockedDices[index] ? dice : getRandomDice()
      );

      dispatch(
        rollDicesAction({
          newDices,
          lockedDices,
        })
      );

      await checkWin(newDices);
    }
  };

  const toggleLockDice = (index) => {
    if (!gameOver) {
      dispatch(toggleLockDiceAction(index));
    }
  };

  const checkWin = async (newDices) => {
    const count = newDices.reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    }, {});

    const values = Object.values(count);
    let quantity = 0;

    if (values.includes(4)) {
      quantity = 3;
      setResult("🎉 BRAVO, vous avez gagné 3 pâtisseries !");
      setGameOver(true);
    } else if (values.includes(3)) {
      quantity = 2;
      setResult("🎉 BRAVO, vous avez gagné 2 pâtisseries !");
      setGameOver(true);
    } else if (values.includes(2)) {
      quantity = 1;
      setResult("🎉 BRAVO, vous avez gagné 1 pâtisserie !");
      setGameOver(true);
    } else {
      setResult("😞 PERDU");
      if (attempts - 1 === 0) {
        setGameOver(true);
      }
    }

    if (quantity > 0) {
      try {
        const response = await updateWinPastries(quantity).unwrap();
        setPastriesWon(response);
      } catch (error) {
        console.error("Erreur lors de la récupération des pâtisseries gagnées :", error);
      }
    }
  };

  const endGame = () => {
    if (attempts > 0) {
      dispatch(
        saveGameProgress({
          dices,
          lockedDices,
          attempts,
          firstRollDone,
        })
      );
    } else {
      dispatch(resetGame()); // Réinitialise si plus d'essais
    }
    navigate("/");
  };

  return (
    <div className="game-container">
      <h2>🎲 Jeu du Yams</h2>
      <p>Vous avez {attempts} lancés restants.</p>

      <div className="dice-container">
        {dices.map((dice, index) => (
          <div
            key={index}
            className={`dice ${lockedDices[index] ? "locked" : ""}`}
            onClick={() => toggleLockDice(index)}
          >
            {dice ? <img src={diceImages[dice]} alt={`Dé ${dice}`} /> : "❓"}
          </div>
        ))}
      </div>

      {result && <p className={pastriesWon.length > 0 ? "win" : "lose"}>{result}</p>}

      {isLoading ? (
        <p>Chargement des pâtisseries gagnées...</p>
      ) : (
        pastriesWon.length > 0 && (
          <div className="win">
            <ul>
              {pastriesWon.map((pastry) => (
                <li key={pastry.id}>{pastry.name}</li>
              ))}
            </ul>
          </div>
        )
      )}

      <button onClick={rollDices} disabled={attempts === 0 || gameOver || isLoading}>
        {gameOver ? "Partie terminée" : `🎲 Lancer (${attempts} restants)`}
      </button>
      <button onClick={endGame} className="end-game-btn">
        Terminer la partie
      </button>
    </div>
  );
};

export default JouerForm;
