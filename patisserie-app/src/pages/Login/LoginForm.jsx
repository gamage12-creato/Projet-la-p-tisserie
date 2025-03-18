import "./Login.scss";

const LoginForm = () => {
  return (
    <div className="login-container">
      <h2>Connexion</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Votre e-mail :</label>
          <input type="email" id="email" placeholder="alice@alice.fr" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Votre mot de passe :</label>
          <input type="password" id="password" />
        </div>
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
