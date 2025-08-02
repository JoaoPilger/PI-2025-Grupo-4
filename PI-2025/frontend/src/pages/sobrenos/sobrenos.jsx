import './sobrenos.css';

function SobreNos() {
    return (
        <div className="pagina_sobrenos">
            <div className="container">
                <div className="titulo-secao">
                    <h1>SOBRE NÓS</h1>
                </div>

                <div className="conteudo-principal">
                    <div className="secao-missao">
                        <h2>Nossa Missão</h2>
                        <p>
                            O NeoVolt nasceu da necessidade de democratizar o conhecimento sobre eficiência energética. 
                            Nosso objetivo é ajudar você a entender e otimizar o consumo de energia em sua casa, 
                            proporcionando economia e sustentabilidade.
                        </p>
                    </div>

                    <div className="secao-equipe">
                        <h2>Nossa Equipe</h2>
                        <p>
                            Somos um grupo de estudantes apaixonados por tecnologia e sustentabilidade, 
                            dedicados a criar soluções que fazem a diferença na vida das pessoas e no planeta.
                        </p>
                        <div className="membros-equipe">
                            <div className="membro">
                                <div className="avatar">👨‍💻</div>
                                <h4>Davi Ulisses M. Gusso</h4>
                            </div>
                            <div className="membro">
                                <div className="avatar">👨‍💻</div>
                                <h4>Cezar K. Bovi</h4>
                            </div>
                            <div className="membro">
                                <div className="avatar">👨‍💻</div>
                                <h4>Victor A. Bonissoni</h4>
                            </div>
                            <div className="membro">
                                <div className="avatar">👨‍💻</div>
                                <h4>Yuri T. Germano</h4>
                            </div>
                            <div className="membro">
                                <div className="avatar">👨‍💻</div>
                                <h4>João V. Pilger</h4>
                            </div>
                            <div className="membro">
                                <div className="avatar">👩‍💻</div>
                                <h4>Bianca G. Golfe</h4>
                            </div>
                        </div>
                    </div>

                    <div className="secao-contato">
                        <h2>Entre em Contato</h2>
                        <p>
                            Tem alguma sugestão ou dúvida sobre o NeoVolt? 
                            Estamos sempre abertos ao feedback da nossa comunidade.
                        </p>
                        <div className="contato-info">
                            <div className="contato-item">
                                <span className="contato-label">Email:</span>
                                <span className="contato-valor">contato@neovolt.com</span>
                            </div>
                            <div className="contato-item">
                                <span className="contato-label">Projeto:</span>
                                <span className="contato-valor">PI-2025 Grupo 4</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SobreNos;
