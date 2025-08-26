import { useState, useEffect, useRef } from 'react';
import './header.css';

function Header({ paginaAtual, setPaginaAtual }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);

    const navegarPara = (pagina) => {
        setPaginaAtual(pagina);
        setIsMenuOpen(false); // Fecha o menu ao navegar
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Fechar menu ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && 
                hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        // Fechar menu ao pressionar ESC
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isMenuOpen]);

    // Fechar menu ao redimensionar a tela
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className="header">
            <div className="header-container">
                <div className="logo-section">
                    <img src="/imagens/neo_volt (1).png" alt="NeoVolt" className="logo-img" />
                </div>
                
                <nav 
                    ref={menuRef}
                    id="nav-menu"
                    className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
                    aria-label="Menu de navegação principal"
                >
                    <a 
                        href="#simulador" 
                        className='nav-link' 
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Ir para simulador"
                    >
                        Simulador
                    </a>
                    <a 
                        href="#duvidas" 
                        className='nav-link' 
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Ir para dúvidas"
                    >
                        Dúvidas
                    </a>
                    <a 
                        href="/#sobrenos" 
                        className='nav-link' 
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Ir para sobre nós"
                    >
                        Sobre Nós
                    </a>
                </nav>
                
                {/* Menu hambúrguer para mobile */}
                <button 
                    ref={hamburgerRef}
                    className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label={isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
                    aria-expanded={isMenuOpen}
                    aria-controls="nav-menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                
                <a href="/login" className="user-section" aria-label="Ir para login">
                    <img src="/imagens/user.svg" alt="Usuário" className="user-avatar" />
                </a>
            </div>
        </header>
    );
}

export default Header;
