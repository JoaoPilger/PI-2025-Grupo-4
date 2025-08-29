import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.js";
import axios from "axios";
import styles from "./cadastroelogin.module.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [loading, setLoading] = useState(false);
  const [lembrarLogin, setLembrarLogin] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setSuccessMessage(""); // Limpa mensagem de sucesso quando usuário digita
  }, []);

  const handleCheckbox = useCallback((e) => {
    setLembrarLogin(e.target.checked);
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    const validateField = (name, value) => {
      const newErrors = { ...errors };
      
      switch (name) {
        case "email":
          if (!value.trim()) {
            newErrors.email = "Email é obrigatório";
          } else if (!/\S+@\S+\.\S+/.test(value)) {
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
          break;
        default:
          break;
      }
      
      setErrors(newErrors);
    };
    
    // Validação final antes do envio
    validateField("email", formData.email);
    validateField("senha", formData.senha);
    
    // Aguarda um tick para que os erros sejam atualizados
    setTimeout(() => {
      if (Object.keys(errors).length > 0) {
        return;
      }
      
      setLoading(true);
      setSuccessMessage("");

      axios.post("http://localhost:3000/auth/login", {
        email: formData.email.trim(),
        senha: formData.senha,
      }, {
        withCredentials: true
      })
      .then(response => {
        console.log("Login realizado:", response.data);
        setSuccessMessage("Login efetuado com sucesso!");
        setErrors({});
        
        // Usar o contexto de autenticação para fazer login
        if (response.data.user && response.data.token) {
          login(response.data.user, response.data.token);
          
          // Redirecionar para a página inicial após um breve delay
          setTimeout(() => {
            navigate('/');
          }, 1000);
        }
      })
      .catch(error => {
        console.error("Erro no login:", error);
        setErrors({ submit: "Usuário ou senha inválidos." });
      })
      .finally(() => {
        setLoading(false);
      });
    }, 0);
  }, [formData, errors, login, navigate]);

  return (
    <div className={styles["login-page"]}>
      <div className={styles["login-box"]}>
        <img src="/imagens/user_black.svg" alt="User Icon" className={styles["user-image"]} />
        <h2>LOGIN</h2>

        <form onSubmit={handleSubmit} className={styles["login-form"]}>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`${styles["login-input"]} ${errors.email ? styles.error : formData.email.trim().length >= 3 ? styles.success : ""}`}
              disabled={loading}
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
              disabled={loading}
            />
            {errors.senha && <span className={styles["error-message"]}>{errors.senha}</span>}
          </label>

          {errors.submit && <div className={styles["error-message"]}>{errors.submit}</div>}
          {successMessage && <div className={styles["success-message"]}>{successMessage}</div>}

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
