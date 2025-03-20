import { useNavigate } from "react-router-dom";
import { useGetPastriesQuery } from "../../store/slices/gameSlice";
import "./Home.scss";

const HomeForm = () => {
  const navigate = useNavigate();
  
  const { data: lots , isLoading, isError } = useGetPastriesQuery();

  return (
    <div className="home">
      <h2>Jouez à notre jeu de Yam's pour tenter de remporter des lots !</h2>
      <button className="play-button" onClick={() => navigate("/jeu")}>
        Jouer
      </button>

      <h3>Lots restants :</h3>

      {isLoading && <p>Chargement des pâtisseries...</p>}
      {isError && <p>Erreur lors du chargement des lots.</p>}

      {!isLoading && !isError && lots  && (
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
