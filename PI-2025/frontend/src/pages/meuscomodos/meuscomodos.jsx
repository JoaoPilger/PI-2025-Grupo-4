import { useState, useEffect } from 'react';
import styles from './meuscomodos.module.css';

function MeusComodos() {
    const [comodoAtivo, setComodoAtivo] = useState(2); // 1 = Sala de Estar, 2 = Cozinha (ativo por padrão)
    const [isTransitioning, setIsTransitioning] = useState(false);

    // Dados dos cômodos existentes com representações visuais realistas
    const comodos = [
        {
            id: 1,
            nome: 'SALA DE ESTAR',
            tipo: 'sala',
            ativo: comodoAtivo === 1
        },
        {
            id: 2,
            nome: 'COZINHA',
            tipo: 'cozinha',
            ativo: comodoAtivo === 2
        },
        {
            id: 3,
            nome: 'CRIAR CÔMODO',
            tipo: 'criar',
            ativo: false,
            isCreate: true
        }
    ];

    const navegarParaComodo = (direcao) => {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        
        if (direcao === 'proximo' && comodoAtivo < 2) {
            setComodoAtivo(comodoAtivo + 1);
        } else if (direcao === 'anterior' && comodoAtivo > 1) {
            setComodoAtivo(comodoAtivo - 1);
        }
        
        // Reset da transição após a animação
        setTimeout(() => setIsTransitioning(false), 300);
    };

    const selecionarComodo = (comodoId) => {
        if (isTransitioning) return;
        
        if (comodoId === 3) {
            // Navegar para página de criar cômodo
            console.log('Navegar para criar novo cômodo');
            // Aqui você pode implementar a navegação
        } else {
            setIsTransitioning(true);
            setComodoAtivo(comodoId);
            setTimeout(() => setIsTransitioning(false), 300);
        }
    };

    // Auto-play do carrossel
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isTransitioning) {
                setComodoAtivo(prev => prev === 1 ? 2 : 1);
            }
        }, 5000); // Muda a cada 5 segundos

        return () => clearInterval(interval);
    }, [isTransitioning]);

    return (
        <div className={styles.container}>
            {/* Header com título */}
            <div className={styles.header}>
                <h1 className={styles.titulo}>MEUS CÔMODOS</h1>
            </div>

            {/* Conteúdo principal - três painéis lado a lado */}
            <div className={styles.conteudo}>
                {/* Painel Esquerdo - Sala de Estar */}
                <div 
                    className={`${styles.painelComodo} ${comodos[0].ativo ? styles.ativo : ''} ${isTransitioning ? styles.transitioning : ''}`}
                    onClick={() => selecionarComodo(1)}
                >
                    <div className={styles.imagemComodo}>
                        <div className={`${styles.cenarioVisual} ${styles.salaEstar}`}>
                            {/* TV */}
                            <div className={styles.tv}></div>
                            {/* Sofá */}
                            <div className={styles.sofa}></div>
                            {/* Mesa de centro */}
                            <div className={styles.mesaCentro}></div>
                            {/* Ventilador */}
                            <div className={styles.ventilador}></div>
                            {/* Lâmpada */}
                            <div className={styles.lampada}></div>
                            {/* Ar condicionado */}
                            <div className={styles.arCondicionado}></div>
                        </div>
                    </div>
                    <h2 className={styles.nomeComodo}>{comodos[0].nome}</h2>
                </div>

                {/* Setas de navegação - Esquerda para Centro */}
                <div className={styles.setasNavegacao}>
                    <div className={styles.setas}>
                        <span className={styles.seta}>&gt;&gt;</span>
                    </div>
                </div>

                {/* Painel Central - Cozinha (Ativo) */}
                <div 
                    className={`${styles.painelComodo} ${comodos[1].ativo ? styles.ativo : ''} ${isTransitioning ? styles.transitioning : ''}`}
                    onClick={() => selecionarComodo(2)}
                >
                    <div className={styles.imagemComodo}>
                        <div className={`${styles.cenarioVisual} ${styles.cozinha}`}>
                            {/* Geladeira */}
                            <div className={styles.geladeira}></div>
                            {/* Fogão */}
                            <div className={styles.fogao}></div>
                            {/* Pia */}
                            <div className={styles.pia}></div>
                            {/* Microondas */}
                            <div className={styles.microondas}></div>
                            {/* Cafeteira */}
                            <div className={styles.cafeteira}></div>
                            {/* Liquidificador */}
                            <div className={styles.liquidificador}></div>
                            {/* Exaustor */}
                            <div className={styles.exaustor}></div>
                            {/* Armários */}
                            <div className={styles.armarios}></div>
                        </div>
                    </div>
                    <h2 className={styles.nomeComodo}>{comodos[1].nome}</h2>
                </div>

                {/* Setas de navegação - Centro para Direita */}
                <div className={styles.setasNavegacao}>
                    <div className={styles.setas}>
                        <span className={styles.seta}>&gt;&gt;</span>
                    </div>
                </div>

                {/* Painel Direito - Criar Cômodo */}
                <a href="/novocomodo">
                    <div 
                        className={`${styles.painelComodo} ${styles.criarComodo} ${isTransitioning ? styles.transitioning : ''}`}
                        onClick={() => selecionarComodo(3)}
                    >
                        <div className={styles.iconeCriar}>
                            <span className={styles.mais}>+</span>
                        </div>
                        <h2 className={styles.nomeComodo}>{comodos[2].nome}</h2>
                    </div>
                </a>
            </div>

            {/* Botões de navegação */}
            <div className={styles.botoesNavegacao}>
                <button 
                    className={`${styles.btnNavegar} ${isTransitioning ? styles.desabilitado : ''}`}
                    onClick={() => navegarParaComodo('anterior')}
                    disabled={comodoAtivo === 1 || isTransitioning}
                >
                    Anterior
                </button>
                <button 
                    className={`${styles.btnNavegar} ${isTransitioning ? styles.desabilitado : ''}`}
                    onClick={() => navegarParaComodo('proximo')}
                    disabled={comodoAtivo === 2 || isTransitioning}
                >
                    Próximo
                </button>
            </div>
        </div>
    );
}

export default MeusComodos;
