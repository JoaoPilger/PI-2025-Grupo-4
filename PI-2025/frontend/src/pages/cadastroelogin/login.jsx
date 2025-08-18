import { useState, useCallback } from "react";
import axios from "axios";
import styles from "./cadastroelogin.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    usuario: "",
    senha: "",
  });
  const [loading, setLoading] = useState(false);
  const [lembrarLogin, setLembrarLogin] = useState(false);

  const handleChange = useCallback((e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleCheckbox = useCallback((e) => {
    setLembrarLogin(e.target.checked);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/login", {
        usuario: formData.usuario.trim(),
        senha: formData.senha,
      });
      console.log("Login realizado:", response.data);
      alert("Login efetuado com sucesso!");
    } catch (error) {
      console.error("Erro no login:", error);
      alert("Usuário ou senha inválidos.");
    } finally {
      setLoading(false);
    }
  }, [formData]);

  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-box"]}>
        <img src="/imagens/usuario.webp" alt="User Icon" className={styles["user-image"]} />
        <h2>LOGIN</h2>

        <form onSubmit={handleSubmit} className={styles["login-form"]}>
          <label>
            Nome de usuário:
            <input
              type="text"
              name="usuario"
              value={formData.usuario}
              onChange={handleChange}
              className={styles["login-input"]}
              disabled={loading}
            />
          </label>

          <label>
            Senha:
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              className={styles["login-input"]}
              disabled={loading}
            />
          </label>

          <div className={styles["options"]}>
            <label>
              <input 
                type="checkbox" 
                name="remember" 
                checked={lembrarLogin}
                onChange={handleCheckbox}
                className={styles["login-radio"]} 
                disabled={loading} 
              />
              Lembrar meu login
            </label>
          </div>

          <div className={styles["links"]}>
            <a href="/cadastro">Cadastrar</a>
            <a href="#">Esqueci minha senha</a>
          </div>

          <button type="submit" className={styles["login-button"]} disabled={loading}>
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
