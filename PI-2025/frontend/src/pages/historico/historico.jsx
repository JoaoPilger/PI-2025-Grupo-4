import { useState, useEffect, useRef } from 'react';
import styles from './historico.module.css';

function Historico() {
  const [showChart, setShowChart] = useState(false);
  const [simulacoes, setSimulacoes] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchSimulacoes = async () => {
      try {
        const res = await fetch('http://localhost:3000/historico');
        const data = await res.json();
        setSimulacoes(Array.isArray(data) ? data : []); // garante que seja array
      } catch (err) {
        console.error('Erro ao buscar simulações:', err);
        setSimulacoes([]);
      }
    };
    fetchSimulacoes();
  }, []);

  const handleShowChart = () => {
    setShowChart(!showChart);
    if (!showChart) {
      setTimeout(() => {
        chartRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  };

  const chartData = simulacoes.map(sim => ({
    month: new Date(sim.data).toLocaleString('default', { month: 'short', year: '2-digit' }),
    consumo: sim.consumo ?? 0,
    gasto: sim.custo ?? 0
  }));

  const maxValue = Math.max(...chartData.map(d => Math.max(d.consumo, d.gasto)), 1);
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
            <span className={styles["valor-estatistica"]}>{simulacoes.length}</span>
          </div>
          <div className={styles["estatistica-direita"]}>
            <button className={styles["botao-ver-grafico"]} onClick={handleShowChart}>
              VISUALIZAR GRÁFICO
            </button>
          </div>
        </div>

        <div className={styles["card-estatistica"]}>
          <div className={styles["estatistica-esquerda"]}>
            <span className={styles["rotulo-estatistica"]}>MÉDIA DE CONSUMO TOTAL</span>
          </div>
          <div className={styles["estatistica-direita"]}>
            <span className={styles["valor-estatistica"]}>
              {simulacoes.length > 0
                ? `${(simulacoes.reduce((a, b) => a + (b.consumo ?? 0), 0) / simulacoes.length).toFixed(2)} kWh / Mês`
                : '0 kWh / Mês'}
            </span>
          </div>
        </div>

        <div className={styles["card-estatistica"]}>
          <div className={styles["estatistica-esquerda"]}>
            <span className={styles["rotulo-estatistica"]}>GASTO MÉDIO ESTIMADO</span>
          </div>
          <div className={styles["estatistica-direita"]}>
            <span className={styles["valor-estatistica"]}>
              {simulacoes.length > 0
                ? `R$ ${(simulacoes.reduce((a, b) => a + (b.custo ?? 0), 0) / simulacoes.length).toFixed(2)} / Mês`
                : 'R$ 0,00 / Mês'}
            </span>
          </div>
        </div>

        <div className={styles["card-estatistica"]}>
          <div className={styles["estatistica-esquerda"]}>
            <span className={styles["rotulo-estatistica"]}>TARIFA</span>
          </div>
          <div className={styles["estatistica-direita"]}>
            <span className={styles["valor-estatistica"]}>
              {simulacoes.length > 0
                ? `R$ ${(simulacoes.reduce((a, b) => a + (b.tarifa ?? 0), 0) / simulacoes.length).toFixed(4)} / kWh`
                : 'R$ 0,0000 / kWh'}
            </span>
          </div>
        </div>
      </div>

      {/* Tabela */}
      <div className={styles["container-tabela-simulacoes"]}>
        <h3 className={styles["titulo-tabela"]}>Tabela de Simulações</h3>
        <table className={styles["tabela-simulacoes"]}>
          <thead>
            <tr>
              <th>Nome Simulação</th>
              <th>Data</th>
              <th>Consumo Estimado (kWh)</th>
              <th>Tarifa</th>
              <th>Custo Estimado (R$)</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(simulacoes) && simulacoes.map((sim, idx) => (
              <tr key={idx}>
                <td>{sim.nomeSimulacao}</td>
                <td>{new Date(sim.data).toLocaleDateString()}</td>
                <td>{(sim.consumo ?? 0).toFixed(2)} kWh</td>
                <td>R$ {(sim.tarifa ?? 0).toFixed(4)}/kWh</td>
                <td>R$ {(sim.custo ?? 0).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gráfico */}
      {showChart && (
        <div ref={chartRef} className={styles["container-grafico"]}>
          <div className={styles["grafico-consumo"]}>
            <div className={styles["legenda-grafico"]}>
              <div className={styles["item-legenda"]}>
                <div className={`${styles["cor-legenda"]} ${styles.consumo}`}></div>
                <span>Consumo (kWh)</span>
              </div>
              <div className={styles["item-legenda"]}>
                <div className={`${styles["cor-legenda"]} ${styles.gasto}`}></div>
                <span>Gasto Estimado (R$)</span>
              </div>
            </div>

            <div className={styles["container-chart"]}>
              <div className={styles["eixo-y"]}>
                {[0, 50, 100, 150, 200].map(value => (
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
                          width: `${barWidth}px`,
                          animationDelay: `${index * 100}ms`
                        }}
                      ></div>
                      <div
                        className={`${styles.barra} ${styles["barra-gasto"]}`}
                        style={{
                          height: `${(item.gasto / maxValue) * chartHeight}px`,
                          width: `${barWidth}px`,
                          animationDelay: `${index * 100 + 50}ms`
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
