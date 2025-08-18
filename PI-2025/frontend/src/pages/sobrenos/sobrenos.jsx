import React, { useState, useEffect } from 'react';
import styles from './sobrenos.module.css';

const SobreNos = () => {
    const [membroAtivo, setMembroAtivo] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [hoveredMembro, setHoveredMembro] = useState(null);

    const membros = [
        { 
            id: 1, 
            nome: 'YURI GERMANO', 
            foto: null,
            cargo: 'Desenvolvedor',
            descricao: 'Membro do projeto integrador'
        },
        { 
            id: 2, 
            nome: 'JOÃO PILGER', 
            foto: null,
            cargo: 'Desenvolvedor',
            descricao: 'Membro do projeto integrador'
        },
        { 
            id: 3, 
            nome: 'BIANCA GOLFE', 
            foto: null,
            cargo: 'Desenvolvedor',
            descricao: 'Membro do projeto integrador'
        },
        { 
            id: 4, 
            nome: 'DAVI ULISSES', 
            foto: null,
            cargo: 'Desenvolvedor',
            descricao: 'Membro do projeto integrador'
        },
        { 
            id: 5, 
            nome: 'CEZAR BOVI', 
            foto: null,
            cargo: 'Desenvolvedor',
            descricao: 'Membro do projeto integrador'
        },
        { 
            id: 6, 
            nome: 'VICTOR BONISSONI', 
            foto: null,
            cargo: 'Desenvolvedor',
            descricao: 'Membro do projeto integrador'
        }
    ];

    // Função para obter os membros visíveis com rotação circular
    const getMembrosVisiveis = (posicao) => {
        const membrosVisiveis = [];
        
        for (let i = 0; i < 3; i++) {
            const index = (posicao + i) % membros.length;
            membrosVisiveis.push(membros[index]);
        }
        
        return membrosVisiveis;
    };

    // Função para obter a posição central (membro em destaque)
    const getPosicaoCentral = (posicao) => {
        return (posicao + 1) % membros.length;
    };

    const navegarMembro = (direcao) => {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        
        if (direcao === 'anterior') {
            setMembroAtivo(prev => prev === 0 ? membros.length - 1 : prev - 1);
        } else {
            setMembroAtivo(prev => prev === membros.length - 1 ? 0 : prev + 1);
        }
        
        setTimeout(() => setIsTransitioning(false), 400);
    };

    const selecionarMembro = (index) => {
        if (isTransitioning) return;
        
        setIsTransitioning(true);
        setMembroAtivo(index);
        setTimeout(() => setIsTransitioning(false), 400);
    };

    // Auto-play do carrossel
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isTransitioning) {
                setMembroAtivo(prev => prev === membros.length - 1 ? 0 : prev + 1);
            }
        }, 6000); // Muda a cada 6 segundos

        return () => clearInterval(interval);
    }, [isTransitioning, membros.length]);

    const membrosVisiveis = getMembrosVisiveis(membroAtivo);
    const posicaoCentral = getPosicaoCentral(membroAtivo);

    return (
        <div className={styles.container} id='sobrenos'>
            <div className={styles.sobreNos}>
                <h1 className={styles.titulo}>SOBRE NÓS</h1>
                
                {/* Indicadores do carrossel */}
                <div className={styles.indicadoresCarrossel}>
                    {membros.map((_, index) => (
                        <div 
                            key={index}
                            className={`${styles.indicador} ${membroAtivo === index ? styles.indicadorAtivo : ''}`}
                            onClick={() => selecionarMembro(index)}
                        />
                    ))}
                </div>
                
                <div className={styles.carrossel}>
                    <button 
                        className={`${styles.setaNavegacao} ${styles.setaEsquerda} ${isTransitioning ? styles.desabilitada : ''}`}
                        onClick={() => navegarMembro('anterior')}
                        disabled={isTransitioning}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                        </svg>
                    </button>
                    
                    <div className={styles.membrosContainer}>
                        {membrosVisiveis.map((membro, index) => (
                            <div 
                                key={`${membro.id}-${membroAtivo}`} 
                                className={`${styles.membro} ${index === 1 ? styles.ativo : ''} ${isTransitioning ? styles.transitioning : ''}`}
                                onMouseEnter={() => setHoveredMembro(membro.id)}
                                onMouseLeave={() => setHoveredMembro(null)}
                            >
                                <div className={styles.fotoContainer}>
                                    <div className={styles.circuloFundo}></div>
                                    <div className={styles.fotoPlaceholder}>
                                        {membro.foto ? (
                                            <img src={membro.foto} alt={membro.nome} />
                                        ) : (
                                            <span className={styles.placeholder}>
                                                {membro.nome.charAt(0)}
                                            </span>
                                        )}
                                    </div>
                                    {hoveredMembro === membro.id && (
                                        <div className={styles.overlayInfo}>
                                            <h4>{membro.cargo}</h4>
                                            <p>{membro.descricao}</p>
                                        </div>
                                    )}
                                </div>
                                <h3 className={styles.nomeMembro}>{membro.nome}</h3>
                                <div className={styles.redesSociais}>
                                    <div className={styles.iconeRede}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </div>
                                    <div className={styles.iconeRede}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <button 
                        className={`${styles.setaNavegacao} ${styles.setaDireita} ${isTransitioning ? styles.desabilitada : ''}`}
                        onClick={() => navegarMembro('proximo')}
                        disabled={isTransitioning}
                    >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                        </svg>
                    </button>
                </div>

                {/* Contador de membros */}
                <div className={styles.contadorMembros}>
                    <span className={styles.membroAtual}>{posicaoCentral}</span>
                    <span className={styles.separador}>/</span>
                    <span className={styles.totalMembros}>{membros.length}</span>
                </div>
            </div>
        </div>
    );
};

export default SobreNos;
