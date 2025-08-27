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

  function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = axios.post('http://localhost:3000/simulacoes', form, {
        withCredentials: true,
      })
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
    }
    console.log("Enviado:", form);
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
