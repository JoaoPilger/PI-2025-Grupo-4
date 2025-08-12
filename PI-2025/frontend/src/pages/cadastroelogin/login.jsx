import { useState } from "react";
import axios from "axios";
import styles from "./cadastroelogin.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    senha: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        usuario: formData.usuario,
        senha: formData.senha,
      });
      console.log("Login realizado:", response.data);
      alert("Login efetuado com sucesso!");
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className={styles["login-page"]}>
      <div className={styles["logo"]}>
        <img src="/imagens/neo_volt.png" alt="NeoVolt" />
      </div>

      <div className={styles["login-box"]}>
        <img src="/imagens/usuario.webp" alt="User Icon" className="user-image" />
        <h2>LOGIN</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Nome de usuário:
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
            />
          </label>

          <label>
            Senha:
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
            />
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
