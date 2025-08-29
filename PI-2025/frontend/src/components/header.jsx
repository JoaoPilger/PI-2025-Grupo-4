import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import './header.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);
    const userDropdownRef = useRef(null);
    const { isAuthenticated, user, logout } = useAuth();

    // Log para debug
    console.log('Header - Estado de autenticação:', { isAuthenticated, user });

    // Estado temporário para teste - remover depois
    const [testAuth, setTestAuth] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const handleLogout = () => {
        logout();
        setIsUserDropdownOpen(false);
        // Redirecionar para a página inicial após logout
        window.location.href = '/';
    };

    // Função temporária para testar o logout
    const handleTestLogout = () => {
        setTestAuth(false);
        setIsUserDropdownOpen(false);
        console.log('Teste de logout realizado');
    };

    // Fechar menu ao clicar fora
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target) && 
                hamburgerRef.current && !hamburgerRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
            
            if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
                setIsUserDropdownOpen(false);
            }
        };

        // Fechar menu ao pressionar ESC
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setIsMenuOpen(false);
                setIsUserDropdownOpen(false);
            }
        };

        if (isMenuOpen || isUserDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isMenuOpen, isUserDropdownOpen]);

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

    // Estado final de autenticação (combinando contexto + teste)
    const finalAuthState = isAuthenticated || testAuth;

    return (
        <header className="header">
            <div className="header-container">
                <a href='/' className="logo-section">
                    <img src="/imagens/neo_volt (1).png" alt="NeoVolt" className="logo-img" />
                </a>
                
                <nav 
                    ref={menuRef}
                    id="nav-menu"
                    className={`nav-menu ${isMenuOpen ? 'active' : ''}`}
                    aria-label="Menu de navegação principal"
                >
                    <a 
                        href="/#simulador" 
                        className='nav-link' 
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Ir para simulador"
                    >
                        Simulador
                    </a>
                    <a 
                        href="/#duvidas" 
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
                
                {/* Seção do usuário com dropdown */}
                <div className="user-section" ref={userDropdownRef}>
                    {finalAuthState ? (
                        <>
                            <button 
                                className="user-avatar-button"
                                onClick={toggleUserDropdown}
                                aria-label="Menu do usuário"
                                aria-expanded={isUserDropdownOpen}
                            >
                                <img src="/imagens/user.svg" alt="Usuário" className="user-avatar" />
                            </button>
                            
                            {isUserDropdownOpen && (
                                <div className="user-dropdown">
                                    <div className="user-info">
                                        <span className="user-name">{user?.nome || user?.email || 'Usuário Teste'}</span>
                                        <span className="user-email">{user?.email || 'teste@exemplo.com'}</span>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                    <button 
                                        className="dropdown-item logout-button"
                                        onClick={testAuth ? handleTestLogout : handleLogout}
                                    >
                                        <span className="logout-icon">🚪</span>
                                        Sair
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="user-avatar-container">
                            <a href="/login" className="user-avatar-link" aria-label="Ir para login">
                                <img src="/imagens/user.svg" alt="Usuário" className="user-avatar" />
                            </a>
                            {/* Botão temporário para testar */}
                            <button 
                                className="test-login-btn"
                                onClick={() => setTestAuth(true)}
                                style={{
                                    position: 'absolute',
                                    top: '50px',
                                    right: '0',
                                    background: '#4CAF50',
                                    color: 'white',
                                    border: 'none',
                                    padding: '5px 10px',
                                    borderRadius: '4px',
                                    fontSize: '12px',
                                    cursor: 'pointer'
                                }}
                            >
                                Testar Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
