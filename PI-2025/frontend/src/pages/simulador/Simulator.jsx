import './Simulator.css'
import { useState } from 'react'

const estados = [
  "AC", "AL", "AM", "AP", "BA", "CE", "DF", "ES", "GO",
  "MA", "MG", "MS", "MT", "PA", "PB", "PE", "PI", "PR",
  "RJ", "RN", "RO", "RR", "RS", "SC", "SE", "SP", "TO"
]

const distribuidoras = [
  "CELESC", "COELBA", "CEMIG", "CPFL", "ENEL SP", "ENEL RJ", "ENEL CE",
  "EQUATORIAL MA", "EQUATORIAL AL", "EQUATORIAL PI", "EQUATORIAL PA",
  "COPEL", "ELEKTRO", "ENERGISA", "LIGHT", "RGE", "AMAZONAS ENERGIA",
  "ESCELSA", "CHESP", "BOA VISTA ENERGIA", "EFLUL", "DME Poços de Caldas"
]

export default function Simulator() {
  const [estadoSelecionado, setEstadoSelecionado] = useState('')
  const [distribuidoraSelecionada, setDistribuidoraSelecionada] = useState('')

  return (
    <>
      <div className="sim-container">
        <div className="sim-card">
          <h1>SIMULADOR DE GASTO ENERGÉTICO</h1>

          <label>Selecione o estado:</label>
          <select
            value={estadoSelecionado}
            onChange={(e) => setEstadoSelecionado(e.target.value)}
          >
            <option value="">Selecione</option>
            {estados.map(estado => (
              <option key={estado} value={estado}>
                {estado}
              </option>
            ))}
          </select>

          <label>Selecione a Distribuidora:</label>
          <select
            value={distribuidoraSelecionada}
            onChange={(e) => setDistribuidoraSelecionada(e.target.value)}
          >
            <option value="">Selecione</option>
            {distribuidoras.map(dist => (
              <option key={dist} value={dist}>
                {dist}
              </option>
            ))}
          </select>

          <button>Iniciar</button>
        </div>
      </div>
    </>
  )
}
