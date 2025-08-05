import { useState } from 'react';
import styles from './historico.module.css';

function Historico() {
  const [showChart, setShowChart] = useState(false);

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
  ];

  const maxValue = Math.max(...chartData.map(d => Math.max(d.consumo, d.gasto)));
  const chartHeight = 200;
  const barWidth = 30;

  return (
    <div className={styles["pagina-historico"]}>
      <h1 className={styles["titulo-historico"]}>HISTÓRICO</h1>
      
      {/* Cards de Estatísticas */}
      <div className={styles["cards-estatisticas"]}>
        <div className={styles["card-estatistica"]}>
          <div className={styles["estatistica-esquerda"]}>
            <span className={styles["rotulo-estatistica"]}>TOTAL DE SIMULAÇÕES FEITAS</span>
          </div>
          <div className={styles["estatistica-centro"]}>
            <span className={styles["valor-estatistica"]}>2</span>
          </div>
          <div className={styles["estatistica-direita"]}>
            <button className={styles["botao-ver-grafico"]} onClick={() => setShowChart(!showChart)}>
              VISUALIZAR GRÁFICO
            </button>
          </div>
        </div>

        <div className={styles["card-estatistica"]}>
          <div className={styles["estatistica-esquerda"]}>
            <span className={styles["rotulo-estatistica"]}>MÉDIA DE CONSUMO TOTAL</span>
          </div>
          <div className={styles["estatistica-direita"]}>
            <span className={styles["valor-estatistica"]}>160 KWH / MÊS</span>
          </div>
        </div>

        <div className={styles["card-estatistica"]}>
          <div className={styles["estatistica-esquerda"]}>
            <span className={styles["rotulo-estatistica"]}>GASTO MÉDIO ESTIMADO</span>
          </div>
          <div className={styles["estatistica-direita"]}>
            <span className={styles["valor-estatistica"]}>R$ 130,43 / MÊS</span>
          </div>
        </div>

        <div className={styles["card-estatistica"]}>
          <div className={styles["estatistica-esquerda"]}>
            <span className={styles["rotulo-estatistica"]}>TARIFA MÉDIA TOTAL</span>
          </div>
          <div className={styles["estatistica-direita"]}>
            <span className={styles["valor-estatistica"]}>R$ 0,8105 / KWH</span>
          </div>
        </div>
      </div>

      {/* Tabela de Simulações */}
      <div className={styles["container-tabela-simulacoes"]}>
        <div className={styles["cabecalho-tabela"]}>
          <h3 className={styles["titulo-tabela"]}>Tabela de Simulações</h3>
          <div className={styles["acoes-tabela"]}>
            <button className={styles["botao-acao"]}>+</button>
            <button className={styles["botao-acao"]}>×</button>
            <button className={styles["botao-acao"]}>⚙</button>
            <button className={styles["botao-acao"]}>↑</button>
          </div>
        </div>
        
        <table className={styles["tabela-simulacoes"]}>
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
        <div className={styles["container-grafico"]}>
          <div className={styles["grafico-consumo"]}>
            <div className={styles["legenda-grafico"]}>
              <div className={styles["item-legenda"]}>
                <div className={`${styles["cor-legenda"]} ${styles.consumo}`}></div>
                <span>Consumo (kw)</span>
              </div>
              <div className={styles["item-legenda"]}>
                <div className={`${styles["cor-legenda"]} ${styles.gasto}`}></div>
                <span>Gasto Estimado (R$)</span>
              </div>
            </div>

            <div className={styles["container-chart"]}>
              <div className={styles["eixo-y"]}>
                {[0, 50, 100, 150, 200].map((value) => (
                  <div key={value} className={styles["marcacao-y"]}>
                    <span className={styles["rotulo-marcacao"]}>{value}</span>
                  </div>
                ))}
              </div>

              <div className={styles["barras-grafico"]}>
                {chartData.map((item, index) => (
                  <div key={index} className={styles["grupo-mes"]}>
                    <div className={styles["barras"]}>
                      <div 
                        className={`${styles.barra} ${styles["barra-consumo"]}`}
                        style={{
                          height: `${(item.consumo / maxValue) * chartHeight}px`,
                          width: `${barWidth}px`
                        }}
                      ></div>
                      <div 
                        className={`${styles.barra} ${styles["barra-gasto"]}`}
                        style={{
                          height: `${(item.gasto / maxValue) * chartHeight}px`,
                          width: `${barWidth}px`
                        }}
                      ></div>
                    </div>
                    <div className={styles["rotulo-mes"]}>{item.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Historico;
