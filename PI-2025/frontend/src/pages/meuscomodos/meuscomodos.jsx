import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './meuscomodos.module.css';

function MeusComodos() {
    const navigate = useNavigate();
    const [comodos, setComodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        carregarComodos();
    }, []);

    const carregarComodos = async () => {
        try {
            setError(null);
            const response = await axios.get('http://localhost:3000/comodos', {
                withCredentials: true
            });
            setComodos(response.data);
        } catch (error) {
            console.error('Erro ao carregar cômodos:', error);
            setError('Erro ao carregar cômodos');
            if (error.response?.status === 401) {
                navigate('/login');
            }
        } finally {
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
                    <button onClick={carregarComodos}>Tentar novamente</button>
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
                <h1 className={styles.titulo}>MEUS CÔMODOS</h1>
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
                                    className={`${styles.painelComodo} ${!isAtivo ? styles.comodoInativo : ''}`}
                                >
                                    <div className={styles.comodoHeader}>
                                        <h2 className={styles.nomeComodo}>{card.nomeComodo}</h2>
                                        <div className={styles.comodoActions}>
                                            <button 
                                                className={`${styles.toggleButton} ${isAtivo ? styles.ativo : styles.inativo}`}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleComodoStatus(card.id, isAtivo);
                                                }}
                                            >
                                                {isAtivo ? 'Ativo' : 'Inativo'}
                                            </button>
                                            <button 
                                                className={styles.editButton}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    editarComodo(card.id);
                                                }}
                                            >
                                                Editar
                                            </button>
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

export default MeusComodos;