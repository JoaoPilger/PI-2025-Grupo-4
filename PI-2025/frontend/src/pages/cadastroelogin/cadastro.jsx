import styles from './cadastroelogin.module.css';

const Cadastro = () => {
  return (
    <div className={styles["login-page"]}>
      <div className={styles["logo"]}>
        <img src="/imagens/neo_volt.png" alt="NeoVolt" />
      </div>

      <div className={styles["login-box cadastro-box"]}>
        <img
          src="imagens/usuario.webp"
          alt="User Icon"
          className="user-image"
        />
        <h2>CADASTRO</h2>

        <form>
          <label>
            Nome:
            <input type="text" />
          </label>

          <label>
            Email:
            <input type="email" />
          </label>

          <label>
            Senha:
            <input type="password" />
          </label>

          <label>
            Confirme a senha:
            <input type="password" />
          </label>

          <button type="submit">Criar conta</button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
