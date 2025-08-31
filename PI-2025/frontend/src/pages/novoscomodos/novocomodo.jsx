import { useState, useEffect} from 'react';
import styles from './novocomodo.module.css';
import axios from 'axios';

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
  const [tipoTempo, setTipoTempo] = useState('horas'); 
  const [tempoUso, setTempoUso] = useState('');
  const [potencia, setPotencia] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!tempoUso || !potencia) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    let horasPorMes;
    if (tipoTempo === 'horas') {
      horasPorMes = parseFloat(tempoUso) * 30;
    } else {
      horasPorMes = (parseFloat(tempoUso) / 60) * 30;
    }

    const dadosEletro = {
      nomeEletro: eletro.nome,
      quantidade: parseInt(quantidade),
      horasUso: horasPorMes,
      potencia: parseFloat(potencia)
    };

    onSave(dadosEletro);

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
  const comodoId = localStorage.getItem('comodoId');
  
  const aparelhos = [ { nome: "Geladeira", img: "/imagens/refrigerator.png", id: 1 }, { nome: "Freezer", img: "/imagens/mode_cool.png", id: 2 }, { nome: "Micro-ondas", img: "/imagens/microwave.png", id: 3 }, { nome: "Forno Elétrico", img: "/imagens/oven.png", id: 4 }, { nome: "Panela Elétrica", img: "/imagens/stockpot.png", id: 5 }, { nome: "Airfryer", img: "/imagens/multicooker.png", id: 6 }, { nome: "Liquidificador", img: "/imagens/blender.png", id: 7 }, { nome: "Batedeira", img: "/imagens/mixer-icon.png", id: 8 }, { nome: "Torradeira", img: "/imagens/toaster.png", id: 9 }, { nome: "Cafeteira", img: "/imagens/coffee.png", id: 10 }, { nome: "Exaustor", img: "/imagens/range_hood.png", id: 11 }, { nome: "Lava Louças", img: "/imagens/dishwasher.png", id: 12 }, { nome: "Lava Roupas", img: "/imagens/laundry.png", id: 13 }, { nome: "Secadora de Roupas", img: "/imagens/laundry.png", id: 14 }, { nome: "Ferro de Passar", img: "/imagens/iron.png", id: 15 }, { nome: "Aspirador de Pó", img: "/imagens/vacuum.png", id: 16 }, { nome: "Robô Aspirador", img: "/imagens/robot.png", id: 17 }, { nome: "Ventilador", img: "/imagens/fan.png", id: 18 }, { nome: "Ar Condicionado", img: "/imagens/climate.png", id: 19 }, { nome: "Aquecedor Elétrico", img: "/imagens/heat_pump.png", id: 20 }, { nome: "Televisão", img: "/imagens/tv.png", id: 21 }, { nome: "Videogame", img: "/imagens/videogame.png", id: 22 }, { nome: "Computador", img: "/imagens/desktop.png", id: 23 }, { nome: "Notebook", img: "/imagens/laptop.png", id: 24 }, { nome: "Impressora", img: "/imagens/printer.png", id: 25 }, { nome: "Modem / Roteador", img: "/imagens/router.png", id: 26 }, { nome: "Chuveiro Elétrico", img: "/imagens/shower.png", id: 27 }, { nome: "Secador de Cabelo", img: "/imagens/air.png", id: 28 }, { nome: "Barbeador Elétrico", img: "/imagens/shaver.png", id: 29 }, { nome: "Escova Secadora", img: "/imagens/heat.png", id: 30 }, { nome: "Aparelho de Som", img: "/imagens/speaker.png", id: 31 }, { nome: "Relógio Despertador", img: "/imagens/alarm.png", id: 32 }, { nome: "Lâmpada LED", img: "/imagens/lightbulb.png", id: 33 }, { nome: "Luminária Elétrica", img: "/imagens/floor_lamp.png", id: 34 }, ];

  const [selecionados, setSelecionados] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [eletroSelecionado, setEletroSelecionado] = useState(null);
  const [detalhesEletros, setDetalhesEletros] = useState({});
  const [tarifaUsuario, setTarifaUsuario] = useState(0);

  const handleSelecionar = (aparelho) => {
    if (selecionados.some((a) => a.nome === aparelho.nome)) {
      setSelecionados((prev) => prev.filter((a) => a.nome !== aparelho.nome));
      const novosDetalhes = { ...detalhesEletros };
      delete novosDetalhes[aparelho.nome];
      setDetalhesEletros(novosDetalhes);
    } else {
      setEletroSelecionado(aparelho);
      setModalAberto(true);
    }
  };

  const handleSalvarEletro = (dados) => {
    if (!eletroSelecionado) return;

    // Evita duplicar eletros selecionados
    setSelecionados((prev) => {
      if (prev.some(e => e.nome === eletroSelecionado.nome)) return prev;
      return [...prev, eletroSelecionado];
    });

    setDetalhesEletros((prev) => ({
      ...prev,
      [eletroSelecionado.nome]: dados
    }));

    setModalAberto(false);
    setEletroSelecionado(null);
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setEletroSelecionado(null);
  };

  const handleFinalizar = async () => {
    if (!comodoId) {
      alert("Erro: ID do cômodo não encontrado.");
      return;
    }

    try {
      // Gera o payload a partir dos detalhes preenchidos
      const payload = Object.entries(detalhesEletros)
        .filter(([nome, dados]) => dados && selecionados.some(e => e.nome === nome))
        .map(([nome, dados]) => ({
          comodoId,
          eletroId: String(aparelhos.find(a => a.nome === nome)?.id),
          nomeEletro: nome,
          quantidade: dados.quantidade,
          horasUso: dados.horasUso,
          potencia: dados.potencia
        }));

        console.log(payload);
        
      if (payload.length === 0) {
        alert("Nenhum eletrodoméstico selecionado para salvar.");
        return;
      }

      for (const item of payload) {
        const response = await fetch('http://localhost:3000/eletros/detalhes', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(item)
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Falha ao salvar: ${response.status} ${errText}`);
        }
      }

      alert("Edição finalizada e salva com sucesso!");
      window.location.href = "/meuscomodos";
    } catch (error) {
      console.error("Erro ao finalizar edição:", error);
      alert("Erro ao salvar os eletrodomésticos. Tente novamente.");
    }
  };

  useEffect(() => {
    axios.get("http://localhost:3000/auth/session", { withCredentials: true })
      .then((sessionRes) => {
        if (sessionRes.data.loggedIn) {
          const userId = sessionRes.data.user.id;
          return axios.get(`http://localhost:3000/clientes/${userId}`, { withCredentials: true });
        } else {
          throw new Error("Usuário não autenticado");
        }
      })
      .then((clienteRes) => {
        if (clienteRes.data?.distribuidora) {
          setTarifaUsuario(clienteRes.data.distribuidora.tarifa);
        }
      })
      .catch((err) => {
        console.error("Erro ao buscar usuário/distribuidora:", err);
      });
  }, []);

  const totalConsumo = selecionados.reduce((acc, cur) => acc + (detalhesEletros[cur.nome]?.potencia * detalhesEletros[cur.nome]?.horasUso || 0) / 1000, 0);
  const totalCusto = totalConsumo * tarifaUsuario;

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
          <p>TARIFA<br /><strong>R$ {tarifaUsuario}</strong></p>
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

      <button 
        className={styles["btn-finalizar"]}
        onClick={handleFinalizar}
      >
        FINALIZAR EDIÇÃO
      </button>

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
