import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreatePastrieMutation } from "../../../store/slices/crudSlice";
import { useGetUserQuery } from "../../../store/slices/userSlice";
import "./AddForm.scss";
import brioche from "../../../assets/patisserie/brioche.png";
import cakeFramboise from "../../../assets/patisserie/cake_framboise.png";
import fondantChocolat from "../../../assets/patisserie/fondant_chocolat.png";
import fondantSupreme from "../../../assets/patisserie/fondant_supreme.png";
import eclair from "../../../assets/patisserie/eclair.png";

const imageOptions = [
  { label: "Brioche", value: brioche },
  { label: "Cake Framboise", value: cakeFramboise },
  { label: "Fondant Chocolat", value: fondantChocolat },
  { label: "Fondant Suprême", value: fondantSupreme },
  { label: "Éclair", value: eclair },
];

const AddForm = () => {
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(imageOptions[0].value);
  const navigate = useNavigate();
  const [createPastrie] = useCreatePastrieMutation();
  const { data: user, isSuccess } = useGetUserQuery();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isSuccess || !user) {
      alert("Vous devez être connecté pour ajouter une pâtisserie.");
      return;
    }

    const data = { name, quantity, image, choice: true };

    try {
      await createPastrie(data).unwrap();
      navigate("/admin"); 
    } catch (error) {
      console.error("Erreur lors de l'ajout :", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Administration</h2>
      <h3>Ajouter une pâtisserie</h3>
      <form onSubmit={handleSubmit}>
        <label>Nom</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

        <label>Quantité</label>
        <input type="number" value={quantity} min="1" onChange={(e) => setQuantity(e.target.value)} required />

        <label>Image</label>
        <select value={image} onChange={(e) => setImage(e.target.value)}>
          {imageOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        <div className="buttons">
          <button type="submit" >Créer</button>
          <button type="button" onClick={() => navigate("/admin")}>Annuler</button>
        </div>
      </form>
    </div>
  );
};

export default AddForm;
