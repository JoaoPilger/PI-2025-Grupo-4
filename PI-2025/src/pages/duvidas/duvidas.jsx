import './duvidas.css';

function Duvidas() {
    return (
        <div className="pagina_duvidas">
            <div id="titulo">
                <p>DÚVIDAS E PERGUNTAS <br />FREQUENTES</p>
            </div>

            <input className="barra-pesquisas" type="text" />

            <div className="perguntas">
                <p>pergunta 1</p>
                <p>pergunta 2</p>
                <p>pergunta 3</p>
                <p>pergunta 4</p>
            </div>

            <div id="texto-duvida"><strong>Não achou o que procurava?</strong></div>

            <input className="enviar-duvida" type="text" placeholder='Envie sua dúvida:' />
        </div>
    );
}

export default Duvidas