import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth.js';
import './header.css';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const menuRef = useRef(null);
    const hamburgerRef = useRef(null);
    const userDropdownRef = useRef(null);
    const { isAuthenticated, user, logout, loading } = useAuth();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleUserDropdown = () => {
        setIsUserDropdownOpen(!isUserDropdownOpen);
    };

    const handleLogout = async () => {
        try {
            await logout();
            setIsUserDropdownOpen(false);
            // Redirecionar para a página inicial após logout
            window.location.href = '/';
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            // Mesmo com erro, fechar dropdown e redirecionar
            setIsUserDropdownOpen(false);
            window.location.href = '/';
        }
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

    // Se ainda está carregando, mostrar loading
    if (loading) {
        return (
            <header className="header">
                <div className="header-container">
                    <a href='/' className="logo-section">
                        <img src="/imagens/neo_volt (1).png" alt="NeoVolt" className="logo-img" />
                    </a>
                    <div className="loading-spinner">
                        <div className="spinner"></div>
                    </div>
                </div>
            </header>
        );
    }

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
                    
                    {/* Links rápidos que aparecem apenas quando logado */}
                    {isAuthenticated && user && (
                        <>
                            <div className="nav-separator"></div>
                            <a 
                                href="/meuscomodos" 
                                className='nav-link nav-link-user' 
                                onClick={() => setIsMenuOpen(false)}
                                aria-label="Ir para meus cômodos"
                            >
                                🏠 Meus Comodos
                            </a>
                            <a 
                                href="/historico" 
                                className='nav-link nav-link-user' 
                                onClick={() => setIsMenuOpen(false)}
                                aria-label="Ir para histórico"
                            >
                                📊 Histórico
                            </a>
                        </>
                    )}
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
                    {isAuthenticated && user ? (
                        <>
                            <button 
                                className="user-avatar-button"
                                onClick={toggleUserDropdown}
                                aria-label="Menu do usuário"
                                aria-expanded={isUserDropdownOpen}
                            >
                                <img src="/imagens/user.svg" alt="Usuário" className="user-avatar" />
                                <div className="user-status-indicator"></div>
                            </button>
                            
                            {isUserDropdownOpen && (
                                <div className="user-dropdown">
                                    <div className="user-info">
                                        <div className="user-avatar-large">
                                            <img src="/imagens/user.svg" alt="Usuário" className="user-avatar-dropdown" />
                                        </div>
                                        <div className="user-details">
                                            <span className="user-name">{user.nome || 'Usuário'}</span>
                                            <span className="user-email">{user.email}</span>
                                        </div>
                                    </div>
                                    <div className="dropdown-divider"></div>
                                    <div className="dropdown-actions">
                                        <button 
                                            className="dropdown-item profile-button"
                                            onClick={() => {
                                                setIsUserDropdownOpen(false);
                                                // Aqui você pode adicionar navegação para perfil
                                            }}
                                        >
                                            <span className="action-icon">👤</span>
                                            Meu Perfil
                                        </button>
                                        <button 
                                            className="dropdown-item logout-button"
                                            onClick={handleLogout}
                                        >
                                            <span className="action-icon">🚪</span>
                                            Sair
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    ) : (
                        <a href="/login" className="user-avatar-link" aria-label="Ir para login">
                            <img src="/imagens/user.svg" alt="Usuário" className="user-avatar" />
                        </a>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
