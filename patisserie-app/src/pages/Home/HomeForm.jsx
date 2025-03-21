import { useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { useGetPastriesQuery } from "../../store/slices/gameSlice";
import "./Home.scss";

const HomeForm = () => {
  const navigate = useNavigate();
  
  // Récupération des lots de pâtisseries disponibles via l'API
  const { data: lots, isLoading, isError, refetch } = useGetPastriesQuery();

  // Effet pour rafraîchir les données à chaque rendu du composant
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="home">
      <h2>Jouez à notre jeu de Yam's pour tenter de remporter des lots !</h2>

      {/* Bouton permettant de naviguer vers la page du jeu */}
      <button className="play-button" onClick={() => navigate("/jeu")}>
        Jouer
      </button>

      <h3>Lots restants :</h3>

      {/* Gestion des états de chargement et d'erreur */}
      {isLoading && <p>Chargement des pâtisseries...</p>}
      {isError && <p>Erreur lors du chargement des lots.</p>}

      {/* Affichage des lots restants si la récupération des données a réussi */}
      {!isLoading && !isError && lots && (
        <div className="lots-container">
          {lots.length > 0 ? (
            lots.map((pastry) => (
              <div key={pastry.id} className="lot">
                <img src={pastry.image} alt={pastry.name} />
                <p>{pastry.name} : <strong>{pastry.quantity}</strong></p>
              </div>
            ))
          ) : (
            <p>Aucun lot disponible pour le moment.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default HomeForm;
