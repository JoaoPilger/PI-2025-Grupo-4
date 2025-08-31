import { useNavigate } from 'react-router-dom';
import styles from './meuscomodos.module.css';

function MeusComodos() {
    const navigate = useNavigate();

    const criarNovoComodo = () => {
        navigate('/novocomodo');
    };

    return (
        <div className={styles.container}>
            {/* Header com título */}
            <div className={styles.header}>
                <h1 className={styles.titulo}>MEUS CÔMODOS</h1>
            </div>

            {/* Conteúdo principal - apenas o card de criar novo cômodo */}
            <div className={styles.conteudoSimplificado}>
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
