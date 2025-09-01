import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import styles from './meuscomodos.module.css';

export default function MeusComodos() {
    const [comodos, setComodos] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isSimulacaoMode = searchParams.get('simulacao') === 'true';
    const nomeSimulacao = searchParams.get('nome') || 'Simulação com cômodos selecionados';
    const [comodosSelecionados, setComodosSelecionados] = useState([]);
    const [modalConfirmacao, setModalConfirmacao] = useState({
        aberto: false,
        comodoId: null,
        nomeComodo: ''
    });

    useEffect(() => {
        fetchComodos();
    }, []);

    const fetchComodos = async () => {
        try {
            setError(null);
            const response = await axios.get('http://localhost:3000/comodos', {
                withCredentials: true
            });
            
            // Filtrar apenas cômodos ativos se estiver em modo de simulação
            const comodosFiltrados = isSimulacaoMode 
                ? response.data.filter(comodo => comodo.ativo)
                : response.data;
                
            setComodos(comodosFiltrados);
            setTotalPages(Math.ceil(comodosFiltrados.length / 3));
            setLoading(false);
        } catch (error) {
            console.error('Erro ao buscar cômodos:', error);
            setError('Erro ao carregar cômodos');
            if (error.response?.status === 401) {
                navigate('/login');
            }
            setLoading(false);
        }
    };

    const criarNovoComodo = () => {
        navigate('/novocomodo');
    };

    const editarComodo = (comodoId) => {
        navigate(`/novocomodo?id=${comodoId}`);
    };

    const toggleComodoStatus = async (comodoId, ativoAtual) => {
        try {
            await axios.patch(`http://localhost:3000/comodos/${comodoId}/status`, 
                { ativo: !ativoAtual },
                { withCredentials: true }
            );
            
            // Atualiza a lista local
            setComodos(prev => prev.map(comodo => 
                comodo.id === comodoId 
                    ? { ...comodo, ativo: !ativoAtual }
                    : comodo
            ));
        } catch (error) {
            console.error('Erro ao alterar status do cômodo:', error);
            alert('Erro ao alterar status do cômodo');
        }
    };

    const abrirModalConfirmacao = (comodoId, nomeComodo) => {
        setModalConfirmacao({
            aberto: true,
            comodoId,
            nomeComodo
        });
    };

    const fecharModalConfirmacao = () => {
        setModalConfirmacao({
            aberto: false,
            comodoId: null,
            nomeComodo: ''
        });
    };

    const confirmarOcultarComodo = async () => {
        const { comodoId, nomeComodo } = modalConfirmacao;
        
        try {
            // Chama o backend para ocultar o cômodo
            await axios.patch(`http://localhost:3000/comodos/${comodoId}/visibilidade`, 
                { ativo: false },
                { withCredentials: true }
            );
            
            // Remove o cômodo da lista local
            setComodos(prev => prev.filter(comodo => comodo.id !== comodoId));
            
            // Atualiza o total de páginas
            const novosComodos = comodos.filter(comodo => comodo.id !== comodoId);
            setTotalPages(Math.ceil((novosComodos.length + 1) / 3)); // +1 para o card de criar
            
            // Fecha o modal
            fecharModalConfirmacao();
            
            alert('Cômodo ocultado com sucesso!');
        } catch (error) {
            console.error('Erro ao ocultar cômodo:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            } else {
                alert('Erro ao ocultar cômodo');
            }
        }
    };

    const toggleComodoSelecao = (comodoId) => {
        
        setComodosSelecionados(prev => {
            const novosSelecionados = prev.includes(comodoId) 
                ? prev.filter(id => id !== comodoId)
                : [...prev, comodoId];
            return novosSelecionados;
        });
    };

    const finalizarSimulacao = async () => {
        
        if (comodosSelecionados.length === 0) {
            alert('Selecione pelo menos um cômodo para a simulação.');
            return;
        }

        try {
            const dadosSimulacao = {
                nomeSimulacao: nomeSimulacao,
                comodosSelecionados: comodosSelecionados
            };

            
            // Enviar simulação com os cômodos selecionados
            const response = await axios.post('http://localhost:3000/simulacao', dadosSimulacao, {
                withCredentials: true
            });

            
            alert('Simulação criada com sucesso!');
            navigate('/historico');
        } catch (error) {
            console.error('Erro ao finalizar simulação:', error);
            if (error.response?.status === 400) {
                alert(error.response.data.error);
            } else {
                alert('Erro ao finalizar simulação');
            }
        }
    };

    const calcularConsumoTotal = (eletros) => {
        if (!eletros || !Array.isArray(eletros)) return 0;
        
        return eletros.reduce((total, eletro) => {
            if (!eletro || !eletro.quantidade || !eletro.horasUsoDia || !eletro.potencia) {
                return total;
            }
            const consumo = (eletro.quantidade * eletro.horasUsoDia * eletro.potencia) / 1000; // kWh
            return total + consumo;
        }, 0);
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.titulo}>MEUS CÔMODOS</h1>
                </div>
                <div className={styles.conteudoSimplificado}>
                    <p>Carregando...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.titulo}>MEUS CÔMODOS</h1>
                </div>
                <div className={styles.conteudoSimplificado}>
                    <p>Erro: {error}</p>
                    <button onClick={fetchComodos}>Tentar novamente</button>
                </div>
            </div>
        );
    }

    // Preparar todos os cards (incluindo o de criar)
    const allCards = [
        {
            id: 'criar',
            type: 'criar',
            nomeComodo: 'CRIAR CÔMODO',
            descricaoCriar: 'Clique para adicionar um novo cômodo'
        },
        ...comodos.map(comodo => ({
            ...comodo,
            type: 'comodo'
        }))
    ];

    // Pegar 8 cards por página (2 linhas de 4)
    const cardsPerPage = 8;
    const startIndex = currentPage * cardsPerPage;
    const visibleCards = allCards.slice(startIndex, startIndex + cardsPerPage);

    // Dividir em linhas de 4 cards
    const rows = [];
    for (let i = 0; i < visibleCards.length; i += 4) {
        rows.push(visibleCards.slice(i, i + 4));
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                {isSimulacaoMode ? (
                    <div style={{ textAlign: 'center' }}>
                        <h1 className={styles.titulo}>
                            Selecione os Cômodos para Simulação
                        </h1>
                        <p style={{ 
                            color: '#666', 
                            marginTop: '10px',
                            fontSize: '16px'
                        }}>
                            Clique nos cômodos que deseja incluir na simulação
                        </p>
                    </div>
                ) : (
                    <h1 className={styles.titulo}>
                        MEUS CÔMODOS
                    </h1>
                )}
            </div>

            <div className={styles.cardsContainer}>
                {rows.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.cardRow}>
                        {row.map((card, cardIndex) => {
                            if (card.type === 'criar') {
                                return (
                                    <div 
                                        key={card.id} 
                                        className={`${styles.painelComodo} ${styles.criarComodo}`}
                                        onClick={criarNovoComodo}
                                    >
                                        <div className={styles.iconeCriar}>
                                            <span className={styles.mais}>+</span>
                                        </div>
                                        <h2 className={styles.nomeComodo}>{card.nomeComodo}</h2>
                                        <p className={styles.descricaoCriar}>{card.descricaoCriar}</p>
                                    </div>
                                );
                            }

                            // Garantir que o campo ativo existe, padrão true se não existir
                            const isAtivo = card.ativo !== undefined ? card.ativo : true;
                            const eletros = card.eletros || [];
                            
                            return (
                                <div 
                                    key={card.id} 
                                    className={`${styles.painelComodo} ${!isAtivo ? styles.comodoInativo : ''} ${isSimulacaoMode && comodosSelecionados.includes(card.id) ? styles.comodoSelecionado : ''}`}
                                    onClick={() => {
                                        if (isSimulacaoMode) {
                                            toggleComodoSelecao(card.id);
                                        } else {
                                            editarComodo(card.id);
                                        }
                                    }}
                                >
                                    <div className={styles.comodoHeader}>
                                        <h2 className={styles.nomeComodo}>{card.nomeComodo}</h2>
                                        <div className={styles.comodoActions}>
                                            {isSimulacaoMode ? (
                                                <button 
                                                    className={`${styles.toggleButton} ${comodosSelecionados.includes(card.id) ? styles.ativo : styles.inativo}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleComodoSelecao(card.id);
                                                    }}
                                                >
                                                    {comodosSelecionados.includes(card.id) ? 'Selecionado' : 'Selecionar'}
                                                </button>
                                            ) : (
                                                <button 
                                                    className={styles.deleteButton}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        abrirModalConfirmacao(card.id, card.nomeComodo);
                                                    }}
                                                    title="Ocultar cômodo"
                                                >
                                                    🗑️
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                    
                                    <div className={styles.comodoInfo}>
                                        <p><strong>Eletrodomésticos:</strong> {eletros.length}</p>
                                        <p><strong>Consumo estimado:</strong> {calcularConsumoTotal(eletros).toFixed(2)} kWh/mês</p>
                                        <p><strong>Status:</strong> {isAtivo ? 'Ativo' : 'Inativo'}</p>
                                    </div>

                                    {eletros.length > 0 && (
                                        <div className={styles.eletrosList}>
                                            <h3>Eletrodomésticos:</h3>
                                            <ul>
                                                {eletros.map((eletro) => (
                                                    <li key={eletro.id}>
                                                        {eletro.eletrodomestico?.nomeEletro || 'Nome não disponível'} - 
                                                        Qtd: {eletro.quantidade || 0}, 
                                                        Potência: {eletro.potencia || 0}W
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* Modal de Confirmação */}
            {modalConfirmacao.aberto && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h3>Confirmar Ação</h3>
                        </div>
                        <div className={styles.modalBody}>
                            <p>
                                Tem certeza que deseja <strong>ocultar</strong> o cômodo 
                                <strong> "{modalConfirmacao.nomeComodo}"</strong>?
                            </p>
                            <p className={styles.modalWarning}>
                                ⚠️ Esta ação não pode ser desfeita. O cômodo não aparecerá mais na lista.
                            </p>
                        </div>
                        <div className={styles.modalActions}>
                            <button 
                                className={styles.modalButtonCancel}
                                onClick={fecharModalConfirmacao}
                            >
                                Cancelar
                            </button>
                            <button 
                                className={styles.modalButtonConfirm}
                                onClick={confirmarOcultarComodo}
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Botão de finalizar simulação */}
            {isSimulacaoMode && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button 
                        onClick={finalizarSimulacao}
                        style={{
                            backgroundColor: '#000',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            padding: '12px 25px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease'
                        }}
                    >
                        Finalizar Simulação ({comodosSelecionados.length} cômodos selecionados)
                    </button>
                </div>
            )}

            {/* Indicadores */}
            {allCards.length > 8 && (
                <div className={styles.carouselIndicators}>
                    {Array.from({ length: Math.ceil(allCards.length / 8) }, (_, i) => (
                        <button
                            key={i}
                            className={`${styles.indicator} ${currentPage === i ? styles.active : ''}`}
                            onClick={() => setCurrentPage(i)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}