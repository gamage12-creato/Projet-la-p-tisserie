import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useGetUserQuery } from "../../store/slices/userSlice"; 
import "./Login.scss";

const LoginPage = () => {
  const navigate = useNavigate(); // Hook pour la navigation après connexion

  // Mutation pour envoyer les informations de connexion
  const [login, { isLoading, error }] = useLoginMutation(); 

  // Récupération de l'utilisateur et possibilité de rafraîchir les données après connexion
  const { refetch } = useGetUserQuery(); 

  // États pour stocker les valeurs du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Gestion de la soumission du formulaire
  const handleLogin = async (e) => {
    e.preventDefault(); // Empêche le rechargement de la page par défaut

    try {
      const response = await login({ email, password }).unwrap(); // Envoi des informations et récupération de la réponse
      console.log("Connecté :", response);

      await refetch(); // Rafraîchir les informations utilisateur après connexion

      navigate("/admin"); // Rediriger vers l'espace administrateur après connexion réussie
    } catch (err) {
      console.error("Erreur de connexion :", err);
    }
  };

  return (
    <div className="login">
      <h2 className="login__title">Connexion</h2>

      {/* Formulaire de connexion */}
      <form className="login__form" onSubmit={handleLogin}>

        {/* Champ Email */}
        <div className="login__group">
          <label htmlFor="email" className="login__label">Votre e-mail :</label>
          <input
            type="email"
            id="email"
            placeholder="alice@alice.fr"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="login__input"
          />
        </div>

        {/* Champ Mot de passe */}
        <div className="login__group">
          <label htmlFor="password" className="login__label">Votre mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="login__input"
          />
        </div>

        {/* Bouton de soumission */}
        <button type="submit" className="login__button" disabled={isLoading}>
          {isLoading ? "Connexion en cours..." : "Login"}
        </button>

        {/* Message d'erreur en cas d'échec */}
        {error && <p className="login__error">Échec de la connexion. Vérifiez vos identifiants.</p>}
      </form>
    </div>
  );
};

export default LoginPage;
