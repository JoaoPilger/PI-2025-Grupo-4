import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './meuscomodos.module.css';

function MeusComodos() {
    const navigate = useNavigate();
    const [comodos, setComodos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarComodos();
    }, []);

    const carregarComodos = async () => {
        try {
            const response = await axios.get('http://localhost:3000/comodos', {
                withCredentials: true
            });
            setComodos(response.data);
        } catch (error) {
            console.error('Erro ao carregar cômodos:', error);
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
        return eletros.reduce((total, eletro) => {
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

    return (
        <div className={styles.container}>
            {/* Header com título */}
            <div className={styles.header}>
                <h1 className={styles.titulo}>MEUS CÔMODOS</h1>
            </div>

            {/* Conteúdo principal */}
            <div className={styles.conteudoSimplificado}>
                {/* Card de criar novo cômodo */}
                <div 
                    className={`${styles.painelComodo} ${styles.criarComodo}`}
                    onClick={criarNovoComodo}
                >
                    <div className={styles.iconeCriar}>
                        <span className={styles.mais}>+</span>
                    </div>
                    <h2 className={styles.nomeComodo}>CRIAR CÔMODO</h2>
                    <p className={styles.descricaoCriar}>Clique para adicionar um novo cômodo</p>
                </div>

                {/* Lista de cômodos existentes */}
                {comodos.map((comodo) => (
                    <div 
                        key={comodo.id} 
                        className={`${styles.painelComodo} ${!comodo.ativo ? styles.comodoInativo : ''}`}
                    >
                        <div className={styles.comodoHeader}>
                            <h2 className={styles.nomeComodo}>{comodo.nomeComodo}</h2>
                            <div className={styles.comodoActions}>
                                <button 
                                    className={`${styles.toggleButton} ${comodo.ativo ? styles.ativo : styles.inativo}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleComodoStatus(comodo.id, comodo.ativo);
                                    }}
                                >
                                    {comodo.ativo ? 'Ativo' : 'Inativo'}
                                </button>
                                <button 
                                    className={styles.editButton}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        editarComodo(comodo.id);
                                    }}
                                >
                                    Editar
                                </button>
                            </div>
                        </div>
                        
                        <div className={styles.comodoInfo}>
                            <p><strong>Eletrodomésticos:</strong> {comodo.eletros.length}</p>
                            <p><strong>Consumo estimado:</strong> {calcularConsumoTotal(comodo.eletros).toFixed(2)} kWh/mês</p>
                            <p><strong>Status:</strong> {comodo.ativo ? 'Ativo' : 'Inativo'}</p>
                        </div>

                        {comodo.eletros.length > 0 && (
                            <div className={styles.eletrosList}>
                                <h3>Eletrodomésticos:</h3>
                                <ul>
                                    {comodo.eletros.map((eletro) => (
                                        <li key={eletro.id}>
                                            {eletro.eletrodomestico.nomeEletro} - 
                                            Qtd: {eletro.quantidade}, 
                                            Potência: {eletro.potencia}W
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MeusComodos;
