import './Simulator.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Simulator() {
  const [form, setForm] = useState({
    nomeSimulacao: "",
    data: new Date()
  })
  const [comodosAtivos, setComodosAtivos] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  useEffect(() => {
    verificarComodosAtivos()
  }, [])

  async function verificarComodosAtivos() {
    try {
      const response = await axios.get('http://localhost:3000/comodos', {
        withCredentials: true
      })
      
      const comodosAtivos = response.data.filter(comodo => comodo.ativo)
      setComodosAtivos(comodosAtivos)
      
      if (comodosAtivos.length === 0) {
        alert('Você precisa ter pelo menos um cômodo ativo para fazer uma simulação.')
        navigate('/meuscomodos')
        return
      }
      
      setLoading(false)
    } catch (error) {
      console.error('Erro ao buscar cômodos:', error)
      if (error.response?.status === 401) {
        navigate('/login')
      } else {
        alert('Erro ao carregar cômodos')
        navigate('/meuscomodos')
      }
    }
  }
  
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
    // Redireciona para meuscomodos para escolher os cômodos
    // Passa o nome da simulação através da URL
    const nomeSimulacao = encodeURIComponent(form.nomeSimulacao);
    navigate(`/meuscomodos?simulacao=true&nome=${nomeSimulacao}`)

  } catch (error) {
    console.error("Erro ao processar formulário:", error);
    if (error.response && error.response.status === 401) {
      alert(error.response.data.error);
      navigate('/login')
      
    }
    if (error.response && error.response.status === 400) {
      alert(error.response.data.error);
      navigate('/meuscomodos');
      
    }
  }

  // libera o envio após 5 segundos
  setTimeout(() => {
    canSubmit = true;
  }, 5000);
}

  if (loading) {
    return (
      <div className="sim-container" id='simulador'>
        <div className="sim-card">
          <h1>Carregando...</h1>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="sim-container" id='simulador'>
        <div className="sim-card">
          <h1>SIMULADOR DE GASTO ENERGÉTICO</h1>
          <p style={{ marginBottom: '20px', color: '#666' }}>
            Cômodos ativos disponíveis: {comodosAtivos.length}
          </p>

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
