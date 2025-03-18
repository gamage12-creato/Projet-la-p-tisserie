import { useNavigate } from 'react-router-dom';
import './Home.scss';

import brioche from '../../assets/patisserie/brioche.png';
import cakeFramboise from '../../assets/patisserie/cake_framboise.png';
import fondantChocolat from '../../assets/patisserie/fondant_chocolat.png';
import fondantSupreme from '../../assets/patisserie/fondant_supreme.png';
import eclair from '../../assets/patisserie/eclair.png';

const HomeForm = () => {

  const navigate = useNavigate();

  const lots = [
    { name: "Brioche sucrée avec chocolat", quantity: 5, image: brioche },
    { name: "Cake Framboise chocolat", quantity: 5, image: cakeFramboise },
    { name: "Cake glacé fondant au chocolat", quantity: 10, image: fondantChocolat },
    { name: "Fondant suprême", quantity: 6, image: fondantSupreme },
    { name: "Éclairs au chocolat", quantity: 2, image: eclair },
  ];

  return (
    <div className="home">
      <h2>Jouez à notre jeu de Yam's pour tenter de remporter des lots !</h2>
      <button className="play-button" onClick={() => navigate('/jeu')}>
        Jouer
      </button>

      <h3>Lots restants :</h3>
      <div className="lots-container">
        {lots.map((lot, index) => (
          <div key={index} className="lot">
            <img src={lot.image} alt={lot.name} />
            <p>{lot.name} : <strong>{lot.quantity}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeForm;
