import React, { useState } from "react";
import { useGetWinPastriesMutation } from "../../store/slices/gameSlice";
import dice1 from "../../assets/dice/dice1.png";
import dice2 from "../../assets/dice/dice2.png";
import dice3 from "../../assets/dice/dice3.png";
import dice4 from "../../assets/dice/dice4.png";
import dice5 from "../../assets/dice/dice5.png";
import dice6 from "../../assets/dice/dice6.png";
import "./Jouer.scss";

// Tableau contenant les images des dés
const diceImages = [null, dice1, dice2, dice3, dice4, dice5, dice6];

const JouerForm = () => {
  // État des dés affichés
  const [dices, setDices] = useState(["❓", "❓", "❓", "❓", "❓"]);
  
  // Nombre d'essais restants
  const [attempts, setAttempts] = useState(3);
  
  // Indique si la partie est terminée
  const [gameOver, setGameOver] = useState(false);
  
  // Message de résultat (gagné/perdu)
  const [result, setResult] = useState(null);
  
  //  Stocke les pâtisseries gagnées
  const [pastriesWon, setPastriesWon] = useState([]);

  // Mutation pour récupérer les pâtisseries gagnées
  const [updateWinPastries, { isLoading }] = useGetWinPastriesMutation();

  // Fonction pour générer un nombre aléatoire entre 1 et 6
  const getRandomDice = () => Math.floor(Math.random() * 6) + 1;

  // Fonction pour lancer les dés
  const rollDices = async () => {
    if (attempts > 0 && !gameOver) {
      // Génération de 5 dés aléatoires
      const newDices = Array.from({ length: 5 }, getRandomDice);
      setDices(newDices);
      setAttempts(attempts - 1);
      await checkWin(newDices); // Vérification du résultat
    }
  };

  // Fonction pour vérifier si le joueur a gagné des pâtisseries
  const checkWin = async (newDices) => {
    // Compte le nombre d'occurrences de chaque valeur de dé
    const count = newDices.reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    }, {});

    const values = Object.values(count);
    let quantity = 0;

    // Détermination du gain en fonction des dés obtenus
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

    // Si le joueur a gagné, mise à jour des pâtisseries gagnées
    if (quantity > 0) {
      try {
        const response = await updateWinPastries(quantity).unwrap();
        setPastriesWon(response); // Mise à jour de la liste des pâtisseries gagnées
      } catch (error) {
        console.error("Erreur lors de la récupération des pâtisseries gagnées :", error);
      }
    }
  };

  return (
    <div className="game-container">
      <h2>🎲 Jeu du Yams</h2>
      <p>Vous avez 3 lancés.</p>
      <p>🎁 Si vous obtenez une paire (deux dés identiques), vous gagnez 1 pâtisserie.</p>
      <p>🎁 Avec un brelan (trois dés identiques), c'est 2 pâtisseries.</p>
      <p>🎁 En cas de carré (quatre dés identiques), vous remportez 3 pâtisseries.</p>

      {/*  Affichage des dés */}
      <div className="dice-container">
        {dices.map((dice, index) => (
          <div key={index} className="dice">
            {typeof dice === "number" ? <img src={diceImages[dice]} alt={`Dé ${dice}`} /> : "❓"}
          </div>
        ))}
      </div>

      {/*  Affichage du résultat (gagné/perdu) */}
      {result && <p className={pastriesWon.length > 0 ? "win" : "lose"}>{result}</p>}

      {/*  Chargement des pâtisseries gagnées */}
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

      {/* Bouton pour lancer les dés */}
      <button onClick={rollDices} disabled={attempts === 0 || gameOver || isLoading}>
        {gameOver ? "Partie terminée" : `🎲 Il vous reste ${attempts} essais`}
      </button>
    </div>
  );
};

export default JouerForm;
