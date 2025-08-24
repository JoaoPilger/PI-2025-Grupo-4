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
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const validateField = (name, value) => {
    const newErrors = { ...errors };
    
    switch (name) {
      case "nome":
        if (!value.trim()) {
          newErrors.nome = "Nome é obrigatório";
        } else if (value.trim().length < 2) {
          newErrors.nome = "Nome deve ter pelo menos 2 caracteres";
        } else {
          delete newErrors.nome;
        }
        break;
      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          newErrors.email = "Email é obrigatório";
        } else if (!emailRegex.test(value.trim())) {
          newErrors.email = "Email inválido";
        } else {
          delete newErrors.email;
        }
        break;
      case "senha":
        if (!value) {
          newErrors.senha = "Senha é obrigatória";
        } else if (value.length < 6) {
          newErrors.senha = "Senha deve ter pelo menos 6 caracteres";
        } else {
          delete newErrors.senha;
        }
        // Validar confirmação de senha quando senha muda
        if (formData.confirmaSenha && value !== formData.confirmaSenha) {
          newErrors.confirmaSenha = "As senhas não coincidem";
        } else if (formData.confirmaSenha) {
          delete newErrors.confirmaSenha;
        }
        break;
      case "confirmaSenha":
        if (!value) {
          newErrors.confirmaSenha = "Confirme sua senha";
        } else if (value !== formData.senha) {
          newErrors.confirmaSenha = "As senhas não coincidem";
        } else {
          delete newErrors.confirmaSenha;
        }
        break;
      default:
        break;
    }
    
    setErrors(newErrors);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
    setSuccessMessage(""); // Limpa mensagem de sucesso quando usuário digita
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validação final antes do envio
    validateField("nome", formData.nome);
    validateField("email", formData.email);
    validateField("senha", formData.senha);
    validateField("confirmaSenha", formData.confirmaSenha);
    
    // Aguarda um tick para que os erros sejam atualizados
    setTimeout(() => {
      if (Object.keys(errors).length > 0) {
        return;
      }

      axios.post("http://localhost:3000/cadastro", {
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
      })
      .then(response => {
        console.log("Cadastro realizado:", response.data);
        setSuccessMessage("Cadastro realizado com sucesso!");
        setErrors({});
        setFormData({ nome: "", email: "", senha: "", confirmaSenha: "" });
      })
      .catch(error => {
        console.error("Erro no cadastro:", error);
        setErrors({ submit: "Ocorreu um erro ao cadastrar. Tente novamente." });
      });
    }, 0);
  };

  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-box"] + " " + styles["cadastro-box"]}>
        <img src="imagens/user_black.svg" alt="User Icon" className={styles["user-image"]} />
        <h2>CADASTRO</h2>

        <form onSubmit={handleSubmit} className={styles["login-form"]}>
          <label>
            Nome:
            <input 
              type="text" 
              name="nome" 
              value={formData.nome} 
              onChange={handleChange}
              className={`${styles["login-input"]} ${errors.nome ? styles.error : formData.nome.trim().length >= 2 ? styles.success : ""}`}
            />
            {errors.nome && <span className={styles["error-message"]}>{errors.nome}</span>}
          </label>

          <label>
            Email:
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              className={`${styles["login-input"]} ${errors.email ? styles.error : formData.email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()) ? styles.success : ""}`}
            />
            {errors.email && <span className={styles["error-message"]}>{errors.email}</span>}
          </label>

          <label>
            Senha:
            <input 
              type="password" 
              name="senha" 
              value={formData.senha} 
              onChange={handleChange}
              className={`${styles["login-input"]} ${errors.senha ? styles.error : formData.senha.length >= 6 ? styles.success : ""}`}
            />
            {errors.senha && <span className={styles["error-message"]}>{errors.senha}</span>}
          </label>

          <label>
            Confirme a senha:
            <input 
              type="password" 
              name="confirmaSenha" 
              value={formData.confirmaSenha} 
              onChange={handleChange}
              className={`${styles["login-input"]} ${errors.confirmaSenha ? styles.error : formData.confirmaSenha && formData.confirmaSenha === formData.senha ? styles.success : ""}`}
            />
            {errors.confirmaSenha && <span className={styles["error-message"]}>{errors.confirmaSenha}</span>}
          </label>

          {errors.submit && <div className={styles["error-message"]}>{errors.submit}</div>}
          {successMessage && <div className={styles["success-message"]}>{successMessage}</div>}

          <button type="submit" className={styles["login-button"]}>Criar conta</button>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
