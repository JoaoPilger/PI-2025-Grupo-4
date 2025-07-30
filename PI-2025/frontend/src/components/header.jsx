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
                    <a href="/" className='nav-link'>Home</a>
                    <a href="/meuscomodos" className='nav-link'>Meus Cômodos</a>
                    <a href="/historico" className='nav-link'>Histórico</a>
                    <a href="/sobrenos" className='nav-link'>Sobre Nós</a>
                </nav>
                
                <a href="\login" className="user-section">
                    <img src="/imagens/usuario.webp" alt="Usuário" className="user-avatar" />
                </a>
            </div>
        </header>
    );
}

export default Header;
