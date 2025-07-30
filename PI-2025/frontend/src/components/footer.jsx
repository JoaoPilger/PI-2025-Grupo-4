import './footer.css';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <div className="footer-logo">
                        <img src="/imagens/neo_volt.png" alt="NeoVolt" className="footer-logo-img" />
                        <span className="footer-logo-text">NeoVolt</span>
                    </div>
                    <p className="footer-description">
                        Transformando o consumo de energia em conhecimento sustentável.
                    </p>
                </div>
                
                <div className="footer-section">
                    <h3 className="footer-title">Links Rápidos</h3>
                    <ul className="footer-links">
                        <li><a href="#simulador">Simulador</a></li>
                        <li><a href="#comodos">Meus Cômodos</a></li>
                        <li><a href="#historico">Histórico</a></li>
                        <li><a href="#duvidas">Dúvidas</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h3 className="footer-title">Suporte</h3>
                    <ul className="footer-links">
                        <li><a href="/ajuda">Central de Ajuda</a></li>
                        <li><a href="/contato">Contato</a></li>
                        <li><a href="/sobrenos">Sobre Nós</a></li>
                        <li><a href="/privacidade">Privacidade</a></li>
                    </ul>
                </div>
                
                <div className="footer-section">
                    <h3 className="footer-title">Contato</h3>
                    <div className="footer-contact">
                        <p>📧 contato@neovolt.com</p>
                        <p>📱 (11) 99999-9999</p>
                        <p>📍 São Paulo, SP</p>
                    </div>
                </div>
            </div>
            
            <div className="footer-bottom">
                <div className="footer-bottom-container">
                    <p>&copy; 2025 NeoVolt. Todos os direitos reservados.</p>
                    <p>PI-2025 Grupo 4</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
