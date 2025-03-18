import { useNavigate } from "react-router-dom";
import "./Login.scss";

const LoginForm = () => {
  const navigate = useNavigate(); // Hook pour la navigation

  const handleLogin = (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    navigate("/admin"); // Rediriger vers AdminPanel
  };

  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Votre e-mail :</label>
          <input type="email" id="email" placeholder="alice@alice.fr" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Votre mot de passe :</label>
          <input type="password" id="password" required />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
