import './header.css';

function Header({ paginaAtual, setPaginaAtual }) {
    const navegarPara = (pagina) => {
        setPaginaAtual(pagina);
    };

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo-section">
                    <img src="/imagens/neo_volt.png" alt="NeoVolt" className="logo-img" />
                    <span className="logo-text">NeoVolt</span>
                </div>
                
                <nav className="nav-menu">
                    <button 
                        className={`nav-link ${paginaAtual === 'duvidas' ? 'ativo' : ''}`}
                        onClick={() => navegarPara('duvidas')}
                    >
                        Dúvidas
                    </button>
                    <button 
                        className={`nav-link ${paginaAtual === 'meuscomodos' ? 'ativo' : ''}`}
                        onClick={() => navegarPara('meuscomodos')}
                    >
                        Meus Cômodos
                    </button>
                    <button 
                        className={`nav-link ${paginaAtual === 'historico' ? 'ativo' : ''}`}
                        onClick={() => navegarPara('historico')}
                    >
                        Histórico
                    </button>
                    <button 
                        className={`nav-link ${paginaAtual === 'sobrenos' ? 'ativo' : ''}`}
                        onClick={() => navegarPara('sobrenos')}
                    >
                        Sobre Nós
                    </button>
                </nav>
                
                <div className="user-section">
                    <img src="/imagens/usuario.webp" alt="Usuário" className="user-avatar" />
                    <span className="user-name">Usuário</span>
                </div>
            </div>
        </header>
    );
}

export default Header;
