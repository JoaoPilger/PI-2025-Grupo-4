import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './novocomodo.module.css';

function EditableTitle({ defaultText = "Clique para editar", comodoId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(defaultText);

  const persistIfValid = async (newTitle) => {
    const trimmed = String(newTitle || '').trim();
    if (!comodoId || trimmed === '') return;
    try {
      await fetch(`http://localhost:3000/comodos/${comodoId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nomeComodo: trimmed })
      });
    } catch (err) {
      console.error('Erro ao atualizar cômodo:', err);
    }
  };

  const handleBlur = async () => {
    await persistIfValid(title);
    setIsEditing(false);
  };
  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      await persistIfValid(title);
      setIsEditing(false);
    }
  };

  // Mostra o texto padrão se o título estiver vazio
  const displayTitle = title.trim() === "" ? defaultText : title;

  return (
    <>
      {isEditing ? (
        <input
          className={styles["tituloEditavel"]}
          type="text"
          value={title}
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <h1
          className={styles["tituloEditavel"]}
          onClick={() => setIsEditing(true)}
          style={{ cursor: "pointer", minHeight: "1em" }}
        >
          <span>
            {displayTitle}
          </span>
        </h1>
      )}
    </>
  );
}

function EletroForm({ eletro, onSave, onCancel }) {
  const [quantidade, setQuantidade] = useState(1);
  const [tipoTempo, setTipoTempo] = useState('horas'); // 'horas' ou 'minutos'
  const [tempoUso, setTempoUso] = useState('');
  const [potencia, setPotencia] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!tempoUso || !potencia) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    // Converter para horas por mês
    let horasPorMes;
    if (tipoTempo === 'horas') {
      horasPorMes = parseFloat(tempoUso) * 30; // 30 dias por mês
    } else {
      // Converter minutos para horas e multiplicar por 30 dias
      horasPorMes = (parseFloat(tempoUso) / 60) * 30;
    }

    const dadosEletro = {
      nomeEletro: eletro.nome,
      quantidade: parseInt(quantidade),
      horasUso: horasPorMes,
      potencia: parseFloat(potencia)
    };

    onSave(dadosEletro);
    
    // Reset dos campos
    setQuantidade(1);
    setTempoUso('');
    setPotencia('');
  };

  return (
    <form onSubmit={handleSubmit} className={styles["modal-form"]}>
      <div className={styles["form-group"]}>
        <label htmlFor="quantidade">Quantidade:</label>
        <input
          type="number"
          id="quantidade"
          min="1"
          max="10"
          value={quantidade}
          onChange={(e) => setQuantidade(e.target.value)}
        />
      </div>

      <div className={styles["form-group"]}>
        <label htmlFor="tipoTempo">Tipo de tempo:</label>
        <div className={styles["radio-group"]}>
          <label className={styles["radio-option"]}>
            <input
              type="radio"
              name="tipoTempo"
              value="horas"
              checked={tipoTempo === 'horas'}
              onChange={(e) => setTipoTempo(e.target.value)}
            />
            <span>Horas/dia</span>
          </label>
          <label className={styles["radio-option"]}>
            <input
              type="radio"
              name="tipoTempo"
              value="minutos"
              checked={tipoTempo === 'minutos'}
              onChange={(e) => setTipoTempo(e.target.value)}
            />
            <span>Minutos/dia</span>
          </label>
        </div>
      </div>

      <div className={styles["form-group"]}>
        <label htmlFor="tempoUso">
          {tipoTempo === 'horas' ? 'Horas de uso por dia:' : 'Minutos de uso por dia:'}
        </label>
        <input
          type="number"
          id="tempoUso"
          step={tipoTempo === 'horas' ? "0.5" : "1"}
          min="0"
          placeholder={tipoTempo === 'horas' ? "Ex: 2" : "Ex: 30"}
          value={tempoUso}
          onChange={(e) => setTempoUso(e.target.value)}
        />
      </div>

      <div className={styles["form-group"]}>
        <label htmlFor="potencia">Potência (Watts):</label>
        <input
          type="number"
          id="potencia"
          step="1"
          min="1"
          placeholder="Ex: 1000"
          value={potencia}
          onChange={(e) => setPotencia(e.target.value)}
        />
      </div>

      <div className={styles["form-actions"]}>
        <button type="button" onClick={onCancel} className={styles["btn-cancel"]}>
          Cancelar
        </button>
        <button type="submit" className={styles["btn-save"]}>
          Salvar
        </button>
      </div>
    </form>
  );
}

function NovoComodo() {
  const [searchParams] = useSearchParams();
  const comodoId = searchParams.get('id');
  const aparelhos = [
    { nome: "Geladeira", img: "/imagens/refrigerator.png", consumo: 30, custo: 15, tarifa: 0.5 },
    { nome: "Freezer", img: "/imagens/mode_cool.png", consumo: 25, custo: 12, tarifa: 0.48 },
    { nome: "Micro-ondas", img: "/imagens/microwave.png", consumo: 10, custo: 5, tarifa: 0.5 },
    { nome: "Forno Elétrico", img: "/imagens/oven.png", consumo: 20, custo: 10, tarifa: 0.5 },
    { nome: "Panela Elétrica", img: "/imagens/stockpot.png", consumo: 8, custo: 4, tarifa: 0.5 },
    { nome: "Airfryer", img: "/imagens/multicooker.png", consumo: 12, custo: 6, tarifa: 0.5 },
    { nome: "Liquidificador", img: "/imagens/blender.png", consumo: 2, custo: 1, tarifa: 0.5 },
    { nome: "Batedeira", img: "/imagens/mixer-icon.png", consumo: 1, custo: 0.5, tarifa: 0.5 },
    { nome: "Torradeira", img: "/imagens/toaster.png", consumo: 3, custo: 1.5, tarifa: 0.5 },
    { nome: "Cafeteira", img: "/imagens/coffee.png", consumo: 2, custo: 1, tarifa: 0.5 },
    { nome: "Exaustor", img: "/imagens/range_hood.png", consumo: 5, custo: 2.5, tarifa: 0.5 },
    { nome: "Lava Louças", img: "/imagens/dishwasher.png", consumo: 18, custo: 9, tarifa: 0.5 },
    { nome: "Lava Roupas", img: "/imagens/laundry.png", consumo: 22, custo: 11, tarifa: 0.5 },
    { nome: "Secadora de Roupas", img: "/imagens/laundry.png", consumo: 20, custo: 10, tarifa: 0.5 },
    { nome: "Ferro de Passar", img: "/imagens/iron.png", consumo: 6, custo: 3, tarifa: 0.5 },
    { nome: "Aspirador de Pó", img: "/imagens/vacuum.png", consumo: 4, custo: 2, tarifa: 0.5 },
    { nome: "Robô Aspirador", img: "/imagens/robot.png", consumo: 3, custo: 1.5, tarifa: 0.5 },
    { nome: "Ventilador", img: "/imagens/fan.png", consumo: 7, custo: 3.5, tarifa: 0.5 },
    { nome: "Ar Condicionado", img: "/imagens/climate.png", consumo: 40, custo: 20, tarifa: 0.5 },
    { nome: "Aquecedor Elétrico", img: "/imagens/heat_pump.png", consumo: 15, custo: 7.5, tarifa: 0.5 },
    { nome: "Televisão", img: "/imagens/tv.png", consumo: 5, custo: 2.5, tarifa: 0.5 },
    { nome: "Videogame", img: "/imagens/videogame.png", consumo: 3, custo: 1.5, tarifa: 0.5 },
    { nome: "Computador", img: "/imagens/desktop.png", consumo: 8, custo: 4, tarifa: 0.5 },
    { nome: "Notebook", img: "/imagens/laptop.png", consumo: 4, custo: 2, tarifa: 0.5 },
    { nome: "Impressora", img: "/imagens/printer.png", consumo: 2, custo: 1, tarifa: 0.5 },
    { nome: "Modem / Roteador", img: "/imagens/router.png", consumo: 1, custo: 0.5, tarifa: 0.5 },
    { nome: "Chuveiro Elétrico", img: "/imagens/shower.png", consumo: 35, custo: 17.5, tarifa: 0.5 },
    { nome: "Secador de Cabelo", img: "/imagens/air.png", consumo: 5, custo: 2.5, tarifa: 0.5 },
    { nome: "Barbeador Elétrico", img: "/imagens/shaver.png", consumo: 1, custo: 0.5, tarifa: 0.5 },
    { nome: "Escova Secadora", img: "/imagens/heat.png", consumo: 2, custo: 1, tarifa: 0.5 },
    { nome: "Aparelho de Som", img: "/imagens/speaker.png", consumo: 3, custo: 1.5, tarifa: 0.5 },
    { nome: "Relógio Despertador", img: "/imagens/alarm.png", consumo: 0.5, custo: 0.25, tarifa: 0.5 },
    { nome: "Lâmpada LED", img: "/imagens/lightbulb.png", consumo: 0.2, custo: 0.1, tarifa: 0.5 },
    { nome: "Luminária Elétrica", img: "/imagens/floor_lamp.png", consumo: 0.5, custo: 0.25, tarifa: 0.5 }
  ];

  const [selecionados, setSelecionados] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [eletroSelecionado, setEletroSelecionado] = useState(null);
  const [detalhesEletros, setDetalhesEletros] = useState({});

  const handleSelecionar = (aparelho) => {
    // Se já está selecionado, remove
    if (selecionados.some((a) => a.nome === aparelho.nome)) {
      setSelecionados((prev) => prev.filter((a) => a.nome !== aparelho.nome));
      // Remove também os detalhes
      const novosDetalhes = { ...detalhesEletros };
      delete novosDetalhes[aparelho.nome];
      setDetalhesEletros(novosDetalhes);
    } else {
      // Se não está selecionado, abre o modal para configurar
      setEletroSelecionado(aparelho);
      setModalAberto(true);
    }
  };

  const handleSalvarEletro = (dados) => {
    // Adiciona o eletrodoméstico à lista de selecionados
    setSelecionados((prev) => [...prev, eletroSelecionado]);
    
    // Salva os detalhes do eletrodoméstico
    setDetalhesEletros((prev) => ({
      ...prev,
      [eletroSelecionado.nome]: dados
    }));

    // Fecha o modal
    setModalAberto(false);
    setEletroSelecionado(null);

    // Salva no banco de dados
    fetch('http://localhost:4000/api/eletros/detalhes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dados)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Salvo no banco:', data);
      // Aqui você pode adicionar uma notificação de sucesso se quiser
    })
    .catch(error => {
      console.error('Erro ao salvar:', error);
      // Aqui você pode adicionar uma notificação de erro se quiser
    });
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setEletroSelecionado(null);
  };

  const totalConsumo = selecionados.reduce((acc, cur) => acc + cur.consumo, 0);
  const totalCusto = selecionados.reduce((acc, cur) => acc + cur.custo, 0);
  const tarifaMedia =
    selecionados.length > 0
      ? (selecionados.reduce((acc, cur) => acc + cur.tarifa, 0) / selecionados.length).toFixed(2)
      : 0;

  return (
    <div className={styles["novo-comodo-container"]}>
      <div className={styles["titulo"]}>
        <EditableTitle defaultText="Novo Cômodo" comodoId={comodoId} />
        <img src="/imagens/edit_text.png" alt="Editar texto" />
      </div>
      <div className={styles["painel"]}>
        <div className={styles["info-box"]}>
          <p><strong>TOTAL ESTIMADO:</strong></p>
          <p>CONSUMO<br /><strong>{totalConsumo.toFixed(2)} kWh</strong></p>
          <p>CUSTO<br /><strong>R$ {totalCusto.toFixed(2)}</strong></p>
          <p>TARIFA MÉDIA<br /><strong>R$ {tarifaMedia}</strong></p>
        </div>

        <div className={styles["scroll-container"]}>
          <div className={styles["aparelhos-scroll"]}>
            {aparelhos.map((item) => (
              <div className={styles["aparelho"]} key={item.nome}>
                <div>
                  <img src={item.img} alt={item.nome} />
                  <p>{item.nome.toUpperCase()}</p>
                </div>
                <input
                  type="checkbox"
                  checked={selecionados.some((a) => a.nome === item.nome)}
                  onChange={() => handleSelecionar(item)}
                  name="eletro"
                  id={item.nome}
                />
                <span className={styles["custom-checkbox"]}></span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles["info-box"]}>
          <p><strong>APARELHOS<br />SELECIONADOS:</strong></p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {selecionados.length === 0 ? (
              <li>Nenhum aparelho selecionado</li>
            ) : (
              selecionados.map((a) => {
                const detalhes = detalhesEletros[a.nome];
                return (
                  <li key={a.nome} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                      <img
                        src={a.img}
                        alt={a.nome}
                        style={{
                          width: 24,
                          height: 24,
                          verticalAlign: "middle",
                          marginRight: 8
                        }}
                      />
                      <strong>{a.nome}</strong>
                    </div>
                    {detalhes && (
                      <div style={{ fontSize: '12px', color: '#666', marginLeft: '32px' }}>
                        <div>Qtd: {detalhes.quantidade}</div>
                        <div>Uso: {detalhes.horasUso.toFixed(1)}h/mês</div>
                        <div>Potência: {detalhes.potencia}W</div>
                      </div>
                    )}
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>

      <button className={styles["btn-finalizar"]}>FINALIZAR EDIÇÃO</button>

      {/* Modal para configurar eletrodoméstico */}
      {modalAberto && eletroSelecionado && (
        <div className={styles["modal-overlay"]} onClick={handleFecharModal}>
          <div className={styles["modal-content"]} onClick={(e) => e.stopPropagation()}>
            <div className={styles["modal-header"]}>
              <h3>Configurar {eletroSelecionado.nome}</h3>
              <button className={styles["close-button"]} onClick={handleFecharModal}>×</button>
            </div>
            
            <EletroForm 
              eletro={eletroSelecionado}
              onSave={handleSalvarEletro}
              onCancel={handleFecharModal}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default NovoComodo;
