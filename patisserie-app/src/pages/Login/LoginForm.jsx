import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useGetUserQuery } from "../../store/slices/userSlice"; 
import "./Login.scss";

const LoginPage = () => {
  const navigate = useNavigate(); 
  const [login, { isLoading, error }] = useLoginMutation(); 
  const { refetch } = useGetUserQuery(); 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault(); 
    try {
      const reponse = await login({ email, password }).unwrap(); 
      console.log("connnecter :", reponse);
      await refetch(); 
      navigate("/admin"); 
    } catch (err) {
      console.error("Erreur de connexion :", err);
    }
  };

  return (
    <div className="login">
      <h2 className="login__title">Connexion</h2>
      <form className="login__form" onSubmit={handleLogin}>
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
        <button type="submit" className="login__button" disabled={isLoading}>
          {isLoading ? "Connexion en cours..." : "Login"}
        </button>
        {error && <p className="login__error">Échec de la connexion. Vérifiez vos identifiants.</p>}
      </form>
    </div>
  );
};

export default LoginPage;
