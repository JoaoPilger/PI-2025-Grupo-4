import { useState } from 'react';
import styles from './meuscomodos.module.css';

function MeusComodos() {
    const [comodos, setComodos] = useState([
        {
            id: 1,
            nome: 'Sala de Estar',
            eletrodomesticos: [
                { id: 1, nome: 'TV LED 55"', potencia: 120, horasUso: 4 },
                { id: 2, nome: 'Ar Condicionado', potencia: 1500, horasUso: 6 },
                { id: 3, nome: 'Lâmpadas LED', potencia: 15, horasUso: 8 }
            ]
        },
        {
            id: 2,
            nome: 'Cozinha',
            eletrodomesticos: [
                { id: 4, nome: 'Geladeira', potencia: 350, horasUso: 24 },
                { id: 5, nome: 'Microondas', potencia: 1200, horasUso: 0.5 },
                { id: 6, nome: 'Fogão Elétrico', potencia: 2000, horasUso: 1 }
            ]
        },
        {
            id: 3,
            nome: 'Quarto',
            eletrodomesticos: [
                { id: 7, nome: 'Lâmpadas LED', potencia: 12, horasUso: 6 },
                { id: 8, nome: 'Ventilador', potencia: 80, horasUso: 8 }
            ]
        }
    ]);

    const [novoComodo, setNovoComodo] = useState('');
    const [novoEletrodomestico, setNovoEletrodomestico] = useState({ nome: '', potencia: '', horasUso: '' });
    const [comodoSelecionado, setComodoSelecionado] = useState(null);
    const [mostrarFormEletrodomestico, setMostrarFormEletrodomestico] = useState(false);

    const calcularConsumoTotal = (eletrodomesticos) => {
        return eletrodomesticos.reduce((total, eletro) => {
            return total + (eletro.potencia * eletro.horasUso / 1000);
        }, 0);
    };

    const adicionarComodo = () => {
        if (novoComodo.trim() === '') return;
        
        const novoComodoObj = {
            id: Date.now(),
            nome: novoComodo,
            eletrodomesticos: []
        };
        
        setComodos([...comodos, novoComodoObj]);
        setNovoComodo('');
    };

    const adicionarEletrodomestico = () => {
        if (novoEletrodomestico.nome.trim() === '' || 
            novoEletrodomestico.potencia === '' || 
            novoEletrodomestico.horasUso === '') return;

        const eletrodomestico = {
            id: Date.now(),
            nome: novoEletrodomestico.nome,
            potencia: parseFloat(novoEletrodomestico.potencia),
            horasUso: parseFloat(novoEletrodomestico.horasUso)
        };

        const comodosAtualizados = comodos.map(comodo => {
            if (comodo.id === comodoSelecionado.id) {
                return {
                    ...comodo,
                    eletrodomesticos: [...comodo.eletrodomesticos, eletrodomestico]
                };
            }
            return comodo;
        });

        setComodos(comodosAtualizados);
        setNovoEletrodomestico({ nome: '', potencia: '', horasUso: '' });
        setMostrarFormEletrodomestico(false);
    };

    const removerEletrodomestico = (comodoId, eletroId) => {
        const comodosAtualizados = comodos.map(comodo => {
            if (comodo.id === comodoId) {
                return {
                    ...comodo,
                    eletrodomesticos: comodo.eletrodomesticos.filter(eletro => eletro.id !== eletroId)
                };
            }
            return comodo;
        });
        setComodos(comodosAtualizados);
    };

    const removerComodo = (comodoId) => {
        setComodos(comodos.filter(comodo => comodo.id !== comodoId));
        if (comodoSelecionado && comodoSelecionado.id === comodoId) {
            setComodoSelecionado(null);
        }
    };

    const consumoTotalGeral = comodos.reduce((total, comodo) => {
        return total + calcularConsumoTotal(comodo.eletrodomesticos);
    }, 0);

    return (
        <div className={styles["pagina_meus_comodos"]}>
            <div className={styles["container"]}>
                <div className={styles["titulo-secao"]}>
                    <h1>MEUS CÔMODOS</h1>
                </div>

                <div className={styles["resumo-consumo"]}>
                    <div className={styles["card-consumo"]}>
                        <h3>Consumo Total Diário</h3>
                        <div className={styles["valor-consumo"]}>
                            <span className={styles["numero"]}>{consumoTotalGeral.toFixed(2)}</span>
                            <span className={styles["unidade"]}>kWh</span>
                        </div>
                    </div>
                </div>

                <div className={styles["secao-adicionar-comodo"]}>
                    <h2>Adicionar Novo Cômodo</h2>
                    <div className={styles["form-adicionar-comodo"]}>
                        <input
                            type="text"
                            placeholder="Nome do cômodo"
                            value={novoComodo}
                            onChange={(e) => setNovoComodo(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    adicionarComodo();
                                }
                            }}
                        />
                        <button onClick={adicionarComodo}>Adicionar Cômodo</button>
                    </div>
                </div>

                <div className={styles["lista-comodos"]}>
                    {comodos.map((comodo) => (
                        <div key={comodo.id} className={styles["comodo-card"]}>
                            <div className={styles["comodo-header"]}>
                                <h3>{comodo.nome}</h3>
                                <div className={styles["acoes-comodo"]}>
                                    <button 
                                        className={styles["btn-adicionar-eletro"]}
                                        onClick={() => {
                                            setComodoSelecionado(comodo);
                                            setMostrarFormEletrodomestico(true);
                                        }}
                                    >
                                        + Eletrodoméstico
                                    </button>
                                    <button 
                                        className={styles["btn-remover-comodo"]}
                                        onClick={() => removerComodo(comodo.id)}
                                    >
                                        Remover
                                    </button>
                                </div>
                            </div>

                            <div className={styles["consumo-comodo"]}>
                                <span>Consumo: {calcularConsumoTotal(comodo.eletrodomesticos).toFixed(2)} kWh/dia</span>
                            </div>

                            <div className={styles["lista-eletrodomesticos"]}>
                                {comodo.eletrodomesticos.length === 0 ? (
                                    <p className={styles["sem-eletrodomesticos"]}>Nenhum eletrodoméstico cadastrado</p>
                                ) : (
                                    comodo.eletrodomesticos.map((eletro) => (
                                        <div key={eletro.id} className={styles["eletrodomestico-item"]}>
                                            <div className={styles["info-eletro"]}>
                                                <span className={styles["nome-eletro"]}>{eletro.nome}</span>
                                                <span className={styles["potencia-eletro"]}>{eletro.potencia}W</span>
                                                <span className={styles["horas-eletro"]}>{eletro.horasUso}h/dia</span>
                                                <span className={styles["consumo-eletro"]}>
                                                    {(eletro.potencia * eletro.horasUso / 1000).toFixed(2)} kWh/dia
                                                </span>
                                            </div>
                                            <button 
                                                className={styles["btn-remover-eletro"]}
                                                onClick={() => removerEletrodomestico(comodo.id, eletro.id)}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {mostrarFormEletrodomestico && comodoSelecionado && (
                    <div className={styles["modal-overlay"]}>
                        <div className={styles["modal-eletrodomestico"]}>
                            <h3>Adicionar Eletrodoméstico - {comodoSelecionado.nome}</h3>
                            <div className={styles["form-eletrodomestico"]}>
                                <input
                                    type="text"
                                    placeholder="Nome do eletrodoméstico"
                                    value={novoEletrodomestico.nome}
                                    onChange={(e) => setNovoEletrodomestico({...novoEletrodomestico, nome: e.target.value})}
                                />
                                <input
                                    type="number"
                                    placeholder="Potência (W)"
                                    value={novoEletrodomestico.potencia}
                                    onChange={(e) => setNovoEletrodomestico({...novoEletrodomestico, potencia: e.target.value})}
                                />
                                <input
                                    type="number"
                                    step="0.1"
                                    placeholder="Horas de uso por dia"
                                    value={novoEletrodomestico.horasUso}
                                    onChange={(e) => setNovoEletrodomestico({...novoEletrodomestico, horasUso: e.target.value})}
                                />
                                <div className={styles["botoes-modal"]}>
                                    <button onClick={adicionarEletrodomestico}>Adicionar</button>
                                    <button onClick={() => {
                                        setMostrarFormEletrodomestico(false);
                                        setNovoEletrodomestico({ nome: '', potencia: '', horasUso: '' });
                                    }}>Cancelar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MeusComodos;
