import './Simulator.css'
import axios from 'axios'
import { useState } from 'react'


export default function Simulator() {
  const [form, setForm] = useState({
    nomeSimulacao: "",
    data: new Date()
  })
  
  function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
  }

  let canSubmit = true; // controle global ou do componente

async function handleSubmit(e) {
  e.preventDefault();

  if (!canSubmit) {
    console.log("Aguarde 5 segundos antes de enviar novamente.");
    return;
  }

  canSubmit = false; // bloqueia novas submissões

  try {
    const response = await axios.post('http://localhost:3000/simulacao', form, {
      withCredentials: true,
    });
    console.log("Resposta do servidor:", response.data);
    window.location.href = "/historico"

  } catch (error) {
    console.error("Erro ao enviar o formulário:", error);
    if (error.response && error.response.status === 401) {
      alert(error.response.data.error);
      window.location.href = "/login"
      
    }
    if (error.response && error.response.status === 400) {
      alert(error.response.data.error);
      window.location.href = "/meuscomodos";
      
    }
  }

  console.log("Enviado:", form);

  // libera o envio após 5 segundos
  setTimeout(() => {
    canSubmit = true;
  }, 5000);
}

  return (
    <>
      <div className="sim-container" id='simulador'>
        <div className="sim-card">
          <h1>SIMULADOR DE GASTO ENERGÉTICO</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
            <label>
              Nome da Simulação:
              <input
                type="text"
                name="nomeSimulacao"
                value={form.nomeSimulacao}
                onChange={handleChange}
                required   // 🔴 torna o campo obrigatório
                className="border rounded p-2 w-full"
              />
            </label>
          <button>Iniciar</button>

          </form>

        </div>
      </div>
    </>
  )
}
