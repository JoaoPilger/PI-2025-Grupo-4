import { useState } from "react";
import axios from "axios";
import styles from "./cadastroelogin.module.css";

const Cadastro = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmaSenha: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.senha !== formData.confirmaSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/cadastro", {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
      });
      console.log("Cadastro realizado:", response.data);
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert("Ocorreu um erro ao cadastrar.");
    }
  };

  return (
    <div className={styles["login-page"]}>
      <div className={styles["logo"]}>
        <img src="/imagens/neo_volt.png" alt="NeoVolt" />
      </div>

      <div className={styles["login-box"] + " " + styles["cadastro-box"]}>
        <img src="imagens/usuario.webp" alt="User Icon" className="user-image" />
        <h2>CADASTRO</h2>

        <form onSubmit={handleSubmit}>
          <label>
            Nome:
            <input type="text" name="nome" value={formData.nome} onChange={handleChange} />
          </label>

          <label>
            Email:
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </label>

          <label>
            Senha:
            <input type="password" name="senha" value={formData.senha} onChange={handleChange} />
          </label>

          <label>
            Confirme a senha:
            <input type="password" name="confirmaSenha" value={formData.confirmaSenha} onChange={handleChange} />
          </label>

          <button type="submit">Criar conta</button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
