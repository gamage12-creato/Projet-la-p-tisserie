import { useNavigate } from "react-router-dom";
import "./AdminForm.scss";
import brioche from "../../../assets/patisserie/brioche.png";
import cakeFramboise from "../../../assets/patisserie/cake_framboise.png";
import fondantChocolat from "../../../assets/patisserie/fondant_chocolat.png";
import fondantSupreme from "../../../assets/patisserie/fondant_supreme.png";
import eclair from "../../../assets/patisserie/eclair.png";

const AdminForm = () => {
  const navigate = useNavigate();

  const pastries = [
    { image: brioche, name: "Brioche sucrée avec chocolat", quantity: 5 },
    { image: cakeFramboise, name: "Cake Framboise chocolat", quantity: 5 },
    { image: fondantChocolat, name: "Cake glacé fondant au chocolat", quantity: 10 },
    { image: fondantSupreme, name: "Fondant suprême au chocolat", quantity: 8 },
    { image: eclair, name: "Éclair au chocolat", quantity: 7 },
  ];

  return (
    <div className="admin-container">
      <h2>Administration</h2>
      <button className="add-button" onClick={() => navigate("/add")}>
        Ajouter une pâtisserie
      </button>
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Quantités restantes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pastries.map((pastry, index) => (
            <tr key={index}>
              <td>
                <img src={pastry.image} alt={pastry.name} />
              </td>
              <td>{pastry.name}</td>
              <td>{pastry.quantity}</td>
              <td>
                <button className="delete-button">Supprimer</button>
                <button className="edit-button">Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminForm;
