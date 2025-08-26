import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './meuscomodos.module.css';

function MeusComodos() {
    const [comodos, setComodos] = useState([]);
    const [comodoAtivo, setComodoAtivo] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // Buscar cômodos do usuário ao carregar a página
    useEffect(() => {
        const fetchComodos = async () => {
            try {
                const response = await fetch('http://localhost:3000/comodos', {
                    method: 'GET',
                    credentials: 'include'
                });
                
                if (!response.ok) {
                    if (response.status === 401) {
                        navigate('/login');
                        return;
                    }
                    throw new Error('Falha ao buscar cômodos');
                }
                
                const comodosData = await response.json();
                setComodos(comodosData);
                
                // Definir o primeiro cômodo como ativo se existir
                if (comodosData.length > 0) {
                    setComodoAtivo(comodosData[0].id);
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Erro ao buscar cômodos:', error);
                setLoading(false);
            }
        };

        fetchComodos();
    }, [navigate]);

    const navegarParaComodo = (direcao) => {
        if (isTransitioning || comodos.length === 0) return;
        
        const currentIndex = comodos.findIndex(c => c.id === comodoAtivo);
        if (currentIndex === -1) return;
        
        setIsTransitioning(true);
        
        if (direcao === 'proximo' && currentIndex < comodos.length - 1) {
            setComodoAtivo(comodos[currentIndex + 1].id);
        } else if (direcao === 'anterior' && currentIndex > 0) {
            setComodoAtivo(comodos[currentIndex - 1].id);
        }
        
        // Reset da transição após a animação
        setTimeout(() => setIsTransitioning(false), 300);
    };

    const selecionarComodo = async (comodoId) => {
        if (isTransitioning) return;
        
        if (comodoId === 'criar') {
            try {
                // valida sessão antes de criar
                const sessionResp = await fetch('http://localhost:3000/auth/session', {
                    method: 'GET',
                    credentials: 'include'
                });
                if (!sessionResp.ok) {
                    navigate('/login');
                    return;
                }
                const sessionData = await sessionResp.json();

                // cria no backend e redireciona
                const resp = await fetch('http://localhost:3000/comodos', {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ nomeComodo: 'Novo Cômodo', clienteId: sessionData?.user?.id })
                });
                if (!resp.ok) {
                    const errText = await resp.text();
                    throw new Error(`Falha ao criar cômodo: ${resp.status} ${errText}`);
                }
                const created = await resp.json();
                
                // Adiciona o novo cômodo à lista local
                setComodos(prev => [...prev, created]);
                
                // Redireciona para editar o novo cômodo
                navigate(`/novocomodo?id=${created.id}`);
            } catch (e) {
                console.error(e);
                alert('Não foi possível criar o cômodo. Tente novamente.');
            }
        } else {
            setIsTransitioning(true);
            setComodoAtivo(comodoId);
            setTimeout(() => setIsTransitioning(false), 300);
        }
    };

    const navegarComSeta = (direcao) => {
        if (isTransitioning || comodos.length === 0) return;
        
        const currentIndex = comodos.findIndex(c => c.id === comodoAtivo);
        if (currentIndex === -1) return;
        
        if (direcao === 'proximo' && currentIndex < comodos.length - 1) {
            navegarParaComodo('proximo');
        } else if (direcao === 'anterior' && currentIndex > 0) {
            navegarParaComodo('anterior');
        }
    };

    if (loading) {
        return (
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.titulo}>MEUS CÔMODOS</h1>
                </div>
                <div className={styles.loading}>
                    <p>Carregando cômodos...</p>
                </div>
            </div>
        );
    }

    const currentIndex = comodos.findIndex(c => c.id === comodoAtivo);
    const comodoAtual = comodos[currentIndex] || null;

    return (
        <div className={styles.container}>
            {/* Header com título */}
            <div className={styles.header}>
                <h1 className={styles.titulo}>MEUS CÔMODOS</h1>
            </div>

            {/* Conteúdo principal - painéis dinâmicos */}
            <div className={styles.conteudo}>
                {comodos.length === 0 ? (
                    // Se não há cômodos, mostra apenas o botão de criar
                    <div className={styles.semComodos}>
                        <p>Você ainda não tem cômodos cadastrados.</p>
                        <div 
                            className={`${styles.painelComodo} ${styles.criarComodo}`}
                            onClick={() => selecionarComodo('criar')}
                        >
                            <div className={styles.iconeCriar}>
                                <span className={styles.mais}>+</span>
                            </div>
                            <h2 className={styles.nomeComodo}>CRIAR CÔMODO</h2>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Cômodos existentes */}
                        {comodos.map((comodo, index) => (
                            <div key={comodo.id}>
                                {/* Painel do Cômodo */}
                                <div 
                                    className={`${styles.painelComodo} ${comodo.id === comodoAtivo ? styles.ativo : ''} ${isTransitioning ? styles.transitioning : ''}`}
                                    onClick={() => selecionarComodo(comodo.id)}
                                >
                                    <div className={styles.imagemComodo}>
                                        <div className={`${styles.cenarioVisual} ${styles.comodoGenerico}`}>
                                            {/* Ícones genéricos para representar o cômodo */}
                                            <div className={styles.iconeComodo}></div>
                                        </div>
                                    </div>
                                    <h2 className={styles.nomeComodo}>{comodo.nomeComodo.toUpperCase()}</h2>
                                </div>

                                {/* Setas de navegação entre cômodos */}
                                {index < comodos.length - 1 && (
                                    <div className={styles.setasNavegacao}>
                                        <div 
                                            className={`${styles.setas} ${comodo.id === comodoAtivo ? styles.desabilitado : ''}`}
                                            onClick={() => navegarComSeta('proximo')}
                                        >
                                            <span className={styles.seta}>&rarr;</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Botão de criar novo cômodo */}
                        <div 
                            className={`${styles.painelComodo} ${styles.criarComodo} ${isTransitioning ? styles.transitioning : ''}`}
                            onClick={() => selecionarComodo('criar')}
                        >
                            <div className={styles.iconeCriar}>
                                <span className={styles.mais}>+</span>
                            </div>
                            <h2 className={styles.nomeComodo}>CRIAR CÔMODO</h2>
                        </div>
                    </>
                )}
            </div>

            {/* Botões de navegação - só aparecem se há mais de um cômodo */}
            {comodos.length > 1 && (
                <div className={styles.botoesNavegacao}>
                    <button 
                        className={`${styles.btnNavegar} ${isTransitioning ? styles.desabilitado : ''}`}
                        onClick={() => navegarParaComodo('anterior')}
                        disabled={currentIndex === 0 || isTransitioning}
                    >
                        Anterior
                    </button>
                    <button 
                        className={`${styles.btnNavegar} ${isTransitioning ? styles.desabilitado : ''}`}
                        onClick={() => navegarParaComodo('proximo')}
                        disabled={currentIndex === comodos.length - 1 || isTransitioning}
                    >
                        Próximo
                    </button>
                </div>
            )}
        </div>
    );
}

export default MeusComodos;
