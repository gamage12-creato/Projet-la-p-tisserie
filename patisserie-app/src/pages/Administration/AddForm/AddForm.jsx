import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddForm.scss";

const AddForm = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, quantity, image });
  };

  return (
    <div className="form-container">
      <h2>Administration</h2>
      <h3>Ajouter une pâtisserie</h3>
      <form onSubmit={handleSubmit}>
        <label>Nom</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />

        <label>Quantité</label>
        <input 
          type="number" 
          value={quantity} 
          min="1" 
          onChange={(e) => setQuantity(e.target.value)} 
          required 
        />

        <label>Image</label>
        <input 
          type="text" 
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
          required 
        />

        <div className="buttons">
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Annuler
          </button>
          <button type="submit" className="submit-button" onClick={handleCancel}>
            Créer la pâtisserie
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
