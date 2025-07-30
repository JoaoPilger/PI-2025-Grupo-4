import { useState } from 'react';
import './historico.css';

function Historico() {
  const [showChart, setShowChart] = useState(false)

  const chartData = [
    { month: 'Jan', consumo: 170, gasto: 150 },
    { month: 'Fev', consumo: 150, gasto: 110 },
    { month: 'Mar', consumo: 160, gasto: 140 },
    { month: 'Abr', consumo: 155, gasto: 135 },
    { month: 'Mai', consumo: 140, gasto: 115 },
    { month: 'Jun', consumo: 130, gasto: 115 },
    { month: 'Jul', consumo: 200, gasto: 180 },
    { month: 'Ago', consumo: 190, gasto: 170 },
    { month: 'Set', consumo: 120, gasto: 105 },
    { month: 'Out', consumo: 170, gasto: 150 },
    { month: 'Nov', consumo: 185, gasto: 170 },
    { month: 'Dez', consumo: 180, gasto: 175 }
  ]

  const maxValue = Math.max(...chartData.map(d => Math.max(d.consumo, d.gasto)))
  const chartHeight = 200
  const barWidth = 30

  return (
    <div className="pagina-historico">
      <h1 className="titulo-historico">HISTÓRICO</h1>
      
      {/* Cards de Estatísticas */}
      <div className="cards-estatisticas">
        <div className="card-estatistica">
          <div className="estatistica-esquerda">
            <span className="rotulo-estatistica">TOTAL DE SIMULAÇÕES FEITAS</span>
          </div>
          <div className="estatistica-centro">
            <span className="valor-estatistica">2</span>
          </div>
          <div className="estatistica-direita">
            <button className="botao-ver-grafico" onClick={() => setShowChart(!showChart)}>
              VISUALIZAR GRÁFICO
            </button>
          </div>
        </div>

        <div className="card-estatistica">
          <div className="estatistica-esquerda">
            <span className="rotulo-estatistica">MÉDIA DE CONSUMO TOTAL</span>
          </div>
          <div className="estatistica-direita">
            <span className="valor-estatistica">160 KWH / MÊS</span>
          </div>
        </div>

        <div className="card-estatistica">
          <div className="estatistica-esquerda">
            <span className="rotulo-estatistica">GASTO MÉDIO ESTIMADO</span>
          </div>
          <div className="estatistica-direita">
            <span className="valor-estatistica">R$ 130,43 / MÊS</span>
          </div>
        </div>

        <div className="card-estatistica">
          <div className="estatistica-esquerda">
            <span className="rotulo-estatistica">TARIFA MÉDIA TOTAL</span>
          </div>
          <div className="estatistica-direita">
            <span className="valor-estatistica">R$ 0,8105 / KWH</span>
          </div>
        </div>
      </div>

      {/* Tabela de Simulações */}
      <div className="container-tabela-simulacoes">
        <div className="cabecalho-tabela">
          <h3 className="titulo-tabela">Tabela de Simulações</h3>
          <div className="acoes-tabela">
            <button className="botao-acao">+</button>
            <button className="botao-acao">×</button>
            <button className="botao-acao">⚙</button>
            <button className="botao-acao">↑</button>
          </div>
        </div>
        
        <table className="tabela-simulacoes">
          <thead>
            <tr>
              <th>Nome Simulação</th>
              <th>Data</th>
              <th>Consumo Estimado (kWh)</th>
              <th>Tarifa Média</th>
              <th>Custo Estimado (R$)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Meu Quarto</td>
              <td>20/05/2025</td>
              <td>170 kWh</td>
              <td>R$ 0,885/kWh</td>
              <td>R$150,45</td>
            </tr>
            <tr>
              <td>Cozinha com Ar</td>
              <td>21/06/2025</td>
              <td>150 kWh</td>
              <td>R$ 0,736/kWh</td>
              <td>R$110,40</td>
            </tr>
          </tbody>
        </table>
      </div>

      {showChart && (
        <div className="container-grafico">
          <div className="grafico-consumo">
            <div className="legenda-grafico">
              <div className="item-legenda">
                <div className="cor-legenda consumo"></div>
                <span>Consumo (kw)</span>
              </div>
              <div className="item-legenda">
                <div className="cor-legenda gasto"></div>
                <span>Gasto Estimado (R$)</span>
              </div>
            </div>

            <div className="container-chart">
              <div className="eixo-y">
                {[0, 50, 100, 150, 200].map((value) => (
                  <div key={value} className="marcacao-y">
                    <span className="rotulo-marcacao">{value}</span>
                  </div>
                ))}
              </div>

              <div className="barras-grafico">
                {chartData.map((item, index) => (
                  <div key={index} className="grupo-mes">
                    <div className="barras">
                      <div 
                        className="barra barra-consumo"
                        style={{
                          height: `${(item.consumo / maxValue) * chartHeight}px`,
                          width: `${barWidth}px`
                        }}
                      ></div>
                      <div 
                        className="barra barra-gasto"
                        style={{
                          height: `${(item.gasto / maxValue) * chartHeight}px`,
                          width: `${barWidth}px`
                        }}
                      ></div>
                    </div>
                    <div className="rotulo-mes">{item.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Historico
