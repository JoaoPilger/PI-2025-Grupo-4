import { useState } from 'react';
import styles from './novocomodo.module.css';

function NovoComodo() {
    const [aparelhosSelecionados, setAparelhosSelecionados] = useState([]);
    const [nomeComodo, setNomeComodo] = useState('');

    // Lista de aparelhos disponíveis com suas imagens
    const aparelhosDisponiveis = [
        { id: 1, nome: 'GELADEIRA', imagem: '/imagens/refrigerator.png', potencia: 350, horasUso: 24 },
        { id: 2, nome: 'LIQUIDIFICADOR', imagem: '/imagens/blender.png', potencia: 300, horasUso: 0.5 },
        { id: 3, nome: 'CAFEITEIRA', imagem: '/imagens/coffee.png', potencia: 1000, horasUso: 0.2 },
        { id: 4, nome: 'FOGÃO', imagem: '/imagens/oven.png', potencia: 2000, horasUso: 1 },
        { id: 5, nome: 'AR CONDICIONADO', imagem: '/imagens/air.png', potencia: 1500, horasUso: 6 },
        { id: 6, nome: 'LAVA LOUÇAS', imagem: '/imagens/dishwasher.png', potencia: 1800, horasUso: 1.5 },
        { id: 7, nome: 'MICROONDAS', imagem: '/imagens/microwave.png', potencia: 1200, horasUso: 0.5 },
        { id: 8, nome: 'TV', imagem: '/imagens/tv.png', potencia: 120, horasUso: 4 },
        { id: 9, nome: 'LÂMPADA', imagem: '/imagens/lightbulb.png', potencia: 15, horasUso: 8 },
        { id: 10, nome: 'VENTILADOR', imagem: '/imagens/fan.png', potencia: 80, horasUso: 8 },
        { id: 11, nome: 'LAVADORA', imagem: '/imagens/laundry.png', potencia: 500, horasUso: 1 },
        { id: 12, nome: 'COMPUTADOR', imagem: '/imagens/desktop.png', potencia: 200, horasUso: 6 }
    ];

    const selecionarAparelho = (aparelho) => {
        if (!aparelhosSelecionados.find(a => a.id === aparelho.id)) {
            setAparelhosSelecionados([...aparelhosSelecionados, aparelho]);
        }
    };

    const removerAparelho = (aparelhoId) => {
        setAparelhosSelecionados(aparelhosSelecionados.filter(a => a.id !== aparelhoId));
    };

    const calcularConsumoTotal = () => {
        return aparelhosSelecionados.reduce((total, aparelho) => {
            return total + (aparelho.potencia * aparelho.horasUso / 1000);
        }, 0);
    };

    const calcularCustoTotal = () => {
        const consumoTotal = calcularConsumoTotal();
        const tarifaKwh = 0.75; // R$ 0,75 por kWh (valor exemplo)
        return consumoTotal * tarifaKwh;
    };

    const finalizarEdicao = () => {
        if (nomeComodo.trim() === '') {
            alert('Por favor, insira um nome para o cômodo');
            return;
        }
        if (aparelhosSelecionados.length === 0) {
            alert('Por favor, selecione pelo menos um aparelho');
            return;
        }
        
        // Aqui você pode implementar a lógica para salvar o cômodo
        console.log('Cômodo criado:', {
            nome: nomeComodo,
            aparelhos: aparelhosSelecionados,
            consumoTotal: calcularConsumoTotal(),
            custoTotal: calcularCustoTotal()
        });
        
        alert('Cômodo criado com sucesso!');
        setNomeComodo('');
        setAparelhosSelecionados([]);
    };

    return (
        <div className={styles.container}>
            {/* Header com título e ícone de edição */}
            <div className={styles.header}>
                <h1 className={styles.titulo}>NOVO CÔMODO</h1>
                <img src="/imagens/edit_text.png" alt="Editar" className={styles.iconeEditar} />
            </div>
            
            {/* Campo para nome do cômodo */}
            <div className={styles.campoNome}>
                <input
                    type="text"
                    placeholder="Digite o nome do cômodo"
                    value={nomeComodo}
                    onChange={(e) => setNomeComodo(e.target.value)}
                    className={styles.inputNome}
                />
            </div>

            <div className={styles.conteudo}>
                {/* Painel Esquerdo - Total Estimado */}
                <div className={styles.painelEsquerdo}>
                    <h2 className={styles.tituloPainel}>TOTAL ESTIMADO</h2>
                    <div className={styles.valores}>
                        <div className={styles.valor}>
                            <span className={styles.label}>CONSUMO</span>
                            <span className={styles.numero}>{calcularConsumoTotal().toFixed(2)}</span>
                            <span className={styles.unidade}>kwh</span>
                        </div>
                        <div className={styles.valor}>
                            <span className={styles.label}>CUSTO</span>
                            <span className={styles.numero}>R$ {calcularCustoTotal().toFixed(2)}</span>
                        </div>
                        <div className={styles.valor}>
                            <span className={styles.label}>TARIFA</span>
                            <span className={styles.numero}>R$ 0,75</span>
                        </div>
                    </div>
                </div>

                {/* Painel Central - Seleção de Aparelhos */}
                <div className={styles.painelCentral}>
                    <div className={styles.gridAparelhos}>
                        {aparelhosDisponiveis.map((aparelho) => (
                            <div 
                                key={aparelho.id} 
                                className={styles.aparelhoItem}
                                onClick={() => selecionarAparelho(aparelho)}
                            >
                                <div className={styles.radioButton}>
                                    <input 
                                        type="radio" 
                                        name="aparelho" 
                                        checked={aparelhosSelecionados.some(a => a.id === aparelho.id)}
                                        readOnly
                                    />
                                </div>
                                <img 
                                    src={aparelho.imagem} 
                                    alt={aparelho.nome} 
                                    className={styles.iconeAparelho}
                                />
                                <span className={styles.nomeAparelho}>{aparelho.nome}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Painel Direito - Aparelhos Selecionados */}
                <div className={styles.painelDireito}>
                    <h2 className={styles.tituloPainel}>APARELHOS SELECIONADOS:</h2>
                    <div className={styles.listaSelecionados}>
                        {aparelhosSelecionados.length === 0 ? (
                            <p className={styles.semSelecao}>Nenhum aparelho selecionado</p>
                        ) : (
                            aparelhosSelecionados.map((aparelho) => (
                                <div key={aparelho.id} className={styles.itemSelecionado}>
                                    <img 
                                        src={aparelho.imagem} 
                                        alt={aparelho.nome} 
                                        className={styles.iconePequeno}
                                    />
                                    <span className={styles.nomePequeno}>{aparelho.nome}</span>
                                    <button 
                                        className={styles.btnRemover}
                                        onClick={() => removerAparelho(aparelho.id)}
                                    >
                                        ×
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>

            {/* Botão Finalizar */}
            <div className={styles.botaoContainer}>
                <button className={styles.botaoFinalizar} onClick={finalizarEdicao}>
                    FINALIZAR EDIÇÃO
                </button>
            </div>
        </div>
    );
}

export default NovoComodo;
