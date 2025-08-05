import styles from './cadastroelogin.module.css';

const Login = () => {
  return (
    <div className={styles["login-page"]}>
      <div className={styles["logo"]}>
        <img src="/imagens/neo_volt.png" alt="NeoVolt" />
      </div>

      <div className={styles["login-box"]}>
        <img
          src="/imagens/usuario.webp"
          alt="User Icon"
          className="user-image"
        />
        <h2>LOGIN</h2>

        <form>
          <label>
            Nome de usuário:
            <input type="text" />
          </label>

          <label>
            Senha:
            <input type="password" />
          </label>

          <div className="options">
            <label>
              <input type="radio" name="remember" />
              Lembrar meu login
            </label>
          </div>

          <div className="links">
            <a href="#">Cadastrar</a>
            <a href="#">Esqueci minha senha</a>
          </div>

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
