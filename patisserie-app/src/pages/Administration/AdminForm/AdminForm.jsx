import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetAllPastriesQuery, useDeletePastrieMutation } from "../../../store/slices/crudSlice";
import { useGetUserQuery } from "../../../store/slices/userSlice";
import "./AdminForm.scss";

const AdminForm = () => {
  const navigate = useNavigate();
  const { data: user, isSuccess: isUserLoaded } = useGetUserQuery();
  const { data: pastries, isLoading, isError, refetch } = useGetAllPastriesQuery();
  const [deletePastrie] = useDeletePastrieMutation();

  useEffect(() => {
    if (isUserLoaded && !user) {
      navigate("/admin");
    }
  }, [isUserLoaded, user, navigate]);

  const handleDelete = async (id) => {
    if (!user) {
      alert("Vous devez être connecté pour supprimer une pâtisserie.");
      navigate("/admin");
      return;
    }

    try {
      await deletePastrie(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
      alert("Échec de la suppression de la pâtisserie.");
    }
  };

  if (!isUserLoaded) return <p>Chargement des informations utilisateur...</p>;
  if (isLoading) return <p>Chargement des pâtisseries...</p>;
  if (isError) return <p>Erreur lors du chargement des pâtisseries.</p>;

  return (
    <div className="admin-container">
      <h2>Administration</h2>
      <button onClick={() => navigate("/add")}>
        Ajouter une pâtisserie
      </button>
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
          {pastries.map((pastry) => (
            <tr key={pastry.id}>
              <td>
                <img src={pastry.image} alt={pastry.name} />
              </td>
              <td>{pastry.name}</td>
              <td>{pastry.quantity}</td>
              <td>
                <button onClick={() => handleDelete(pastry.id)}>Supprimer</button>
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
