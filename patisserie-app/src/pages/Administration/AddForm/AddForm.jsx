import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  useCreatePastrieMutation, 
  useUpdatePastrieMutation, 
  useGetPastrieByIdQuery 
} from "../../../store/slices/crudSlice";
import { useGetUserQuery } from "../../../store/slices/userSlice";
import "./AddForm.scss";

// Importation des images des pâtisseries
import brioche from "../../../assets/patisserie/brioche.png";
import cakeFramboise from "../../../assets/patisserie/cake_framboise.png";
import fondantChocolat from "../../../assets/patisserie/fondant_chocolat.png";
import fondantSupreme from "../../../assets/patisserie/fondant_supreme.png";
import eclair from "../../../assets/patisserie/eclair.png";

// Liste des options d'images pour le formulaire
const imageOptions = [
  { label: "Brioche", value: brioche },
  { label: "Cake Framboise", value: cakeFramboise },
  { label: "Fondant Chocolat", value: fondantChocolat },
  { label: "Fondant Suprême", value: fondantSupreme },
  { label: "Éclair", value: eclair },
];

const AddForm = () => {
  // Récupération de l'ID de la pâtisserie depuis l'URL 
  const { id } = useParams(); 
  const navigate = useNavigate();

  // Récupération des informations de l'utilisateur connecté
  const { data: user, isSuccess } = useGetUserQuery();

  // Mutations pour créer et modifier une pâtisserie
  const [createPastrie] = useCreatePastrieMutation();
  const [updatePastrie] = useUpdatePastrieMutation();

  // Récupération des données d'une pâtisserie existante (en mode modification)
  const { data: existingPastrie } = useGetPastrieByIdQuery(id, { skip: !id }); 

  // États locaux pour stocker les valeurs du formulaire
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(imageOptions[0].value); // Image par défaut

  // Effet pour pré-remplir le formulaire en mode modification
  useEffect(() => {
    if (existingPastrie) {
      setName(existingPastrie.name);
      setQuantity(existingPastrie.quantity);
      setImage(existingPastrie.image);
    }
  }, [existingPastrie]);

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Vérification si l'utilisateur est connecté
    if (!isSuccess || !user) {
      alert("Vous devez être connecté pour ajouter ou modifier une pâtisserie.");
      return;
    }

    const data = { name, quantity, image };

    try {
      if (id) {
        // Mode modification : mise à jour de la pâtisserie existante
        await updatePastrie({ id, ...data }).unwrap();
        console.log("Modification réussie !");
      } else {
        // Mode création : ajout d'une nouvelle pâtisserie
        await createPastrie(data).unwrap();
        console.log("Ajout réussi !");
      }
      navigate("/admin"); // Redirection vers la page d'administration après validation
    } catch (error) {
      console.error("Erreur lors de la sauvegarde :", error);
    }
  };

  return (
    <div className="form-container">
      <h2>Administration</h2>
      <h3>{id ? "Modifier la pâtisserie" : "Ajouter une pâtisserie"}</h3>
      <form onSubmit={handleSubmit}>
        
        {/* Champ pour le nom de la pâtisserie */}
        <label>Nom</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />

        {/* Champ pour la quantité */}
        <label>Quantité</label>
        <input 
          type="number" 
          value={quantity} 
          min="1" 
          onChange={(e) => setQuantity(e.target.value)} 
          required 
        />

        {/* Sélection de l'image de la pâtisserie */}
        <label>Image</label>
        <select value={image} onChange={(e) => setImage(e.target.value)}>
          {imageOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>

        {/* Boutons d'action */}
        <div className="buttons">
          <button type="submit">{id ? "Modifier" : "Créer"}</button>
          <button type="button" onClick={() => navigate("/admin")}>Annuler</button>
        </div>

      </form>
    </div>
  );
};

export default AddForm;
