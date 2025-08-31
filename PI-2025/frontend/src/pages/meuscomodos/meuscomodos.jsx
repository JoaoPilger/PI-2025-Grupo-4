import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './meuscomodos.module.css';

function MeusComodos() {
    const navigate = useNavigate();

    const criarNovoComodo = async () => {
        try {
            const response = await fetch('http://localhost:3000/comodos', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nomeComodo: 'Novo Cômodo' }),
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Erro ao criar cômodo');
            }

            const comodo = await response.json();

            // Salva o ID no localStorage
            localStorage.setItem('comodoId', comodo.id);

            // Navega para a página de edição
            navigate("/novocomodo");
        } catch (error) {
            console.error('Erro ao criar cômodo:', error);
            alert('Não foi possível criar o cômodo.');
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.titulo}>MEUS CÔMODOS</h1>
            </div>

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
            </div>
        </div>
    );
}

export default MeusComodos;