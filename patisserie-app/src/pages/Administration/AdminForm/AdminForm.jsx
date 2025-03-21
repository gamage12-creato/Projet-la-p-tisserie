import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  useGetAllPastriesQuery, 
  useDeletePastrieMutation 
} from "../../../store/slices/crudSlice";
import { useGetUserQuery } from "../../../store/slices/userSlice";
import "./AdminForm.scss";

const AdminForm = () => {
  const navigate = useNavigate();

  // Récupération des informations de l'utilisateur connecté
  const { data: user, isSuccess: isUserLoaded } = useGetUserQuery();

  // Récupération de la liste des pâtisseries
  const { data: pastries, isLoading, isError, refetch } = useGetAllPastriesQuery();
  
  // Mutation pour supprimer une pâtisserie
  const [deletePastrie] = useDeletePastrieMutation();

  // État pour la recherche
  const [searchTerm, setSearchTerm] = useState("");
  
  // Effet pour rafraîchir les données des pâtisseries 
  useEffect(() => {
    refetch();
  }, [refetch]);

  // Vérification si l'utilisateur est connecté, sinon redirection
  useEffect(() => {
    if (isUserLoaded && !user) {
      navigate("/admin"); // Redirige si l'utilisateur n'est pas connecté
    }
  }, [isUserLoaded, user, navigate]);

  // Fonction pour supprimer une pâtisserie
  const handleDelete = async (id) => {
    if (!user) {
      alert("Vous devez être connecté pour supprimer une pâtisserie.");
      navigate("/admin");
      return;
    }

    try {
      await deletePastrie(id).unwrap(); // Suppression de la pâtisserie
      refetch(); // Rafraîchissement des données après suppression
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Échec de la suppression de la pâtisserie.");
    }
  };

  // Gestion des états de chargement et d'erreur
  if (!isUserLoaded) return <p>Chargement des informations utilisateur...</p>;
  if (isLoading) return <p>Chargement des pâtisseries...</p>;
  if (isError) return <p>Erreur lors du chargement des pâtisseries.</p>;

  // Filtrage des pâtisseries en fonction du champ de recherche
  const filteredPastries = pastries.filter(pastry =>
    searchTerm.length < 3 || pastry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <h2>Administration</h2>

      {/* Champ de recherche */}
      <input
        type="text"
        placeholder="Rechercher une pâtisserie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Bouton pour ajouter une nouvelle pâtisserie */}
      <button onClick={() => navigate("/add")}>Ajouter une pâtisserie</button>
    
      {/* Tableau affichant la liste des pâtisseries */}
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Nom</th>
            <th>Quantité restante</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPastries.map((pastry) => (
            <tr key={pastry.id}>
              <td><img src={pastry.image} alt={pastry.name} /></td>
              <td>{pastry.name}</td>
              <td>{pastry.quantity}</td>
              <td>
                {/* Bouton pour supprimer une pâtisserie */}
                <button onClick={() => handleDelete(pastry.id)}>Supprimer</button>

                {/* Bouton pour modifier une pâtisserie */}
                <button onClick={() => navigate(`/add/${pastry.id}`)}>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminForm;
