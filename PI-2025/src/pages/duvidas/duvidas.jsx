import { useState } from 'react';
import './duvidas.css';

function Pergunta({ pergunta, resposta }) {
    const [aberta, setAberta] = useState(false);

    return (
        <div className='pergunta-item' onClick={() => setAberta(!aberta)}>
            <p>{pergunta}</p>
            {aberta && (
                <div className='resposta'>
                    {resposta}
                    </div>
            )}
        </div>
    )
}




function Duvidas() {
    return (
        <div className="pagina_duvidas">
            <div id="titulo">
                <p>DÚVIDAS E PERGUNTAS <br />FREQUENTES</p>
            </div>

            <input className=" barra-pesquisas" type="text" />

            <div className="perguntas">
                <Pergunta pergunta="Pergunta 1" resposta="Resposta." />
                <Pergunta pergunta="Pergunta 2" resposta="Resposta." />
                <Pergunta pergunta="Pergunta 3" resposta="Resposta." />
                <Pergunta pergunta="Pergunta 4" resposta="Resposta." />
                <Pergunta pergunta="Pergunta 5" resposta="Resposta." />
                <Pergunta pergunta="Pergunta 6" resposta="Resposta." />
                <Pergunta pergunta="Pergunta 7" resposta="Resposta." />
                <Pergunta pergunta="Pergunta 8" resposta="Resposta." />
            </div>

            <div id="texto-duvida"><strong>Não achou o que procurava?</strong></div>

            <input className="enviar-duvida" type="text" placeholder='Envie sua dúvida:' />
        </div>
    );
}

export default Duvidas