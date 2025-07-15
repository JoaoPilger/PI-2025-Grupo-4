import './duvidas.css';

function Duvidas() {
    return (
        <div className="pagina_duvidas">
            <div id="titulo">
                <p>DÚVIDAS E PERGUNTAS FREQUENTES</p>
            </div>

            <div className="barra_pesquisas"></div>

            <div className="Perguntas">
                <p>pergunta 1</p>
                <p>pergunta 2</p>
                <p>pergunta 3</p>
                <p>pergunta 4</p>
            </div>

            <div id="texto">Não achou o que procurava?</div>

            <div className="enviar_duvida">Envie sua dúvida:</div>
        </div>
    );
}

export default Duvidas