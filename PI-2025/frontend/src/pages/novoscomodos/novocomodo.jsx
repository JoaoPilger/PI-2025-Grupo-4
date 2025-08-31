import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './novocomodo.module.css';

// Array de aparelhos disponíveis
const aparelhos = [
  { nome: 'ar condicionado', img: '/imagens/air.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'alarme', img: '/imagens/alarm.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'blender', img: '/imagens/blender.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'cafeteira', img: '/imagens/coffee.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'computador', img: '/imagens/desktop.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'lava louças', img: '/imagens/dishwasher.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'ventilador', img: '/imagens/fan.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'luminária', img: '/imagens/floor_lamp.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'bomba de calor', img: '/imagens/heat_pump.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'aquecedor', img: '/imagens/heat.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'ferro de passar', img: '/imagens/iron.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'laptop', img: '/imagens/laptop.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'máquina de lavar', img: '/imagens/laundry.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'lâmpada', img: '/imagens/lightbulb.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'microondas', img: '/imagens/microwave.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'liquidificador', img: '/imagens/mixer-icon.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'modo frio', img: '/imagens/mode_cool.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'panela elétrica', img: '/imagens/multicooker.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'forno', img: '/imagens/oven.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'impressora', img: '/imagens/printer.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'exaustor', img: '/imagens/range_hood.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'geladeira', img: '/imagens/refrigerator.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'robô aspirador', img: '/imagens/robot.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'roteador', img: '/imagens/router.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'barbeador', img: '/imagens/shaver.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'chuveiro', img: '/imagens/shower.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'alto falante', img: '/imagens/speaker.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'panela', img: '/imagens/stockpot.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'torradeira', img: '/imagens/toaster.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'tv', img: '/imagens/tv.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'aspirador', img: '/imagens/vacuum.png', consumo: 0, custo: 0, tarifa: 0 },
  { nome: 'videogame', img: '/imagens/videogame.png', consumo: 0, custo: 0, tarifa: 0 }
];

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
  const navigate = useNavigate();

  const [selecionados, setSelecionados] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [eletroSelecionado, setEletroSelecionado] = useState(null);
  const [detalhesEletros, setDetalhesEletros] = useState({});

  useEffect(() => {
    const fetchComodo = async () => {
      if (!comodoId) {
        // Se não houver ID, cria um novo cômodo
        try {
          const response = await fetch('http://localhost:3000/comodos', {
            method: 'POST',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nomeComodo: "Novo Cômodo" })
          });
          if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Falha ao criar cômodo: ${response.status} ${errText}`);
          }
          const data = await response.json();
          // Redireciona para a página com o ID do cômodo criado
          navigate(`/novocomodo?id=${data.id}`);
        } catch (error) {
          console.error('Erro ao criar cômodo:', error);
          alert('Não foi possível criar o cômodo. Tente novamente.');
        }
      } else {
        // Se houver ID, carrega os eletrodomésticos existentes do cômodo
        try {
          const response = await fetch(`http://localhost:3000/comodos/${comodoId}/eletros`, {
            credentials: 'include'
          });
          if (response.ok) {
            const eletros = await response.json();
            setSelecionados(eletros);
            const detalhes = {};
            eletros.forEach(eletro => {
              detalhes[eletro.eletrodomestico.nomeEletro] = {
                nomeEletro: eletro.eletrodomestico.nomeEletro,
                quantidade: eletro.quantidade,
                horasUso: eletro.horasUsoDia * 30, // Converter para horas por mês
                potencia: eletro.potencia
              };
            });
            setDetalhesEletros(detalhes);
          }
        } catch (error) {
          console.error('Erro ao carregar eletrodomésticos:', error);
        }
      }
    };

    fetchComodo();
  }, [comodoId, navigate]);

  const handleSelecionar = async (aparelho) => {
    // Se já está selecionado, remove
    if (selecionados.some((a) => a.eletrodomestico?.nomeEletro === aparelho.nome)) {
      const eletroParaRemover = selecionados.find((a) => a.eletrodomestico?.nomeEletro === aparelho.nome);
      
      // Remove do banco de dados
      if (eletroParaRemover && eletroParaRemover.id) {
        try {
          await fetch(`http://localhost:3000/eletros/comodo/${eletroParaRemover.id}`, {
            method: 'DELETE',
            credentials: 'include'
          });
        } catch (error) {
          console.error('Erro ao remover eletrodoméstico:', error);
        }
      }
      
      setSelecionados((prev) => prev.filter((a) => a.eletrodomestico?.nomeEletro !== aparelho.nome));
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

  const handleSalvarEletro = async (dados) => {
    try {
      // Salva no banco de dados primeiro
      const response = await fetch('http://localhost:3000/eletros/detalhes', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...dados, comodoId })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Falha ao salvar: ${response.status} ${errText}`);
      }

      const savedData = await response.json();
      
      // Adiciona o eletrodoméstico à lista de selecionados com os dados do banco
      setSelecionados((prev) => [...prev, savedData]);
      
      // Salva os detalhes do eletrodoméstico
      setDetalhesEletros((prev) => ({
        ...prev,
        [dados.nomeEletro]: dados
      }));

      // Fecha o modal
      setModalAberto(false);
      setEletroSelecionado(null);

      console.log('Salvo no banco:', savedData);
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Não foi possível salvar o eletrodoméstico. Tente novamente.');
    }
  };

  const handleFecharModal = () => {
    setModalAberto(false);
    setEletroSelecionado(null);
  };

  const totalConsumo = selecionados.reduce((acc, cur) => {
    const potencia = cur.potencia || 0;
    const horasUso = cur.horasUsoDia || 0;
    const quantidade = cur.quantidade || 1;
    return acc + ((potencia * horasUso * quantidade * 30) / 1000); // kWh por mês
  }, 0);
  
  const totalCusto = totalConsumo * 0.5; // Tarifa média estimada
  const tarifaMedia = "0.50"; // Tarifa média fixa para simplificar

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
                  checked={selecionados.some((a) => a.eletrodomestico?.nomeEletro === item.nome)}
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
                const nomeEletro = a.eletrodomestico?.nomeEletro || a.nomeEletro;
                const detalhes = detalhesEletros[nomeEletro];
                const aparelho = aparelhos.find(ap => ap.nome === nomeEletro);
                
                return (
                  <li key={nomeEletro} style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '5px' }}>
                      <img
                        src={aparelho?.img || '/imagens/lightbulb.png'}
                        alt={nomeEletro}
                        style={{
                          width: 24,
                          height: 24,
                          verticalAlign: "middle",
                          marginRight: 8
                        }}
                      />
                      <strong>{nomeEletro}</strong>
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
        onClick={() => {
          // Redireciona para meus cômodos após finalizar
          navigate("/meuscomodos");
        }}
      >
        FINALIZAR EDIÇÃO
      </button>

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
