import { useState } from 'react';
import styles from './duvidas.module.css';

function Pergunta({ pergunta, resposta }) {
    const [aberta, setAberta] = useState(false);

    return (
        <div className={styles["pergunta-item"]} onClick={() => setAberta(!aberta)}>
            <p>{pergunta}</p>
            {aberta && (
                <div className={styles["resposta"]}>
                    {resposta}
                </div>
            )}
        </div>
    );
}

function Duvidas() {
    const [pesquisa, setPesquisa] = useState('');
    const [duvida, setDuvida] = useState('');

    function enviarDuvida() {
        if (duvida.trim() === '') return;
        console.log('Dúvida enviada:', duvida); // futuramente enviar para API ou lista
        setDuvida('');
    }

    const listaPerguntas = [
        { pergunta: "Qual norma reguladora da energia elétrica no Brasil?", resposta: "A principal norma é a NR-10, que trata da segurança em instalações e serviços com eletricidade. Além dela, a ANEEL (Agência Nacional de Energia Elétrica) é o órgão responsável pela regulamentação do setor elétrico no país." },
        { pergunta: "Como é medido o consumo de energia em kWh?", resposta: "O consumo é medido em quilowatt-hora (kWh), que representa o uso de 1.000 watts durante uma hora. O medidor instalado pela concessionária registra a quantidade de energia consumida ao longo do mês." },
        { pergunta: "O que afeta o valor da minha conta de luz?", resposta: "O valor da conta depende da quantidade de energia consumida (em kWh), das bandeiras tarifárias (verde, amarela ou vermelha), da tarifa cobrada pela distribuidora local, do uso de aparelhos antigos ou ineficientes, e do horário de consumo, no caso de usuários da tarifa branca." },
        { pergunta: "Como posso reduzir meu consumo de energia?", resposta: "Utilize lâmpadas de LED, evite deixar aparelhos em modo standby, desligue luzes quando não estiverem em uso, prefira equipamentos com selo Procel A de eficiência energética e faça manutenção regular da instalação elétrica." },
        { pergunta: "Como identificar um eletrodoméstico que consome muita energia?", resposta: "Observe a potência do aparelho (em watts), que costuma constar na etiqueta. Equipamentos antigos ou que geram calor (como chuveiro elétrico, ferro de passar e ar-condicionado) geralmente consomem mais. O selo Procel ajuda a identificar os mais econômicos." },
        { pergunta: "Painéis solares podem zerar minha conta de luz?", resposta: "Sim. Com um sistema fotovoltaico corretamente dimensionado, é possível gerar energia suficiente para suprir todo o consumo da residência. Assim, a conta de luz pode ser reduzida ao valor mínimo cobrado pela concessionária (referente à taxa de disponibilidade)." },
        { pergunta: "Quais aparelhos consomem energia mesmo desligados?", resposta: "Aparelhos como TVs, micro-ondas, computadores e carregadores continuam consumindo energia em modo standby ou apenas conectados na tomada. Por isso, retirá-los da tomada quando não usados pode ajudar a economizar." },
        { pergunta: "Como saber se a instalação elétrica da minha casa está adequada?", resposta: "É importante observar se há quedas de energia, disjuntores desarmando frequentemente, ou aquecimento em tomadas e fios. Em caso de dúvidas, o ideal é solicitar a avaliação de um eletricista qualificado, que pode verificar se a instalação atende às normas técnicas atuais." },
    ];

    const perguntasFiltradas = listaPerguntas.filter(item =>
        item.pergunta.toLowerCase().includes(pesquisa.toLowerCase())
    );

    return (
        <div className={styles["pagina_duvidas"]}>
            <div>
                <h1 className={styles["titulo"]} >DÚVIDAS E PERGUNTAS <br />FREQUENTES</h1>
            </div>

            <input 
                className={`${styles["barra-pesquisas"]} ${pesquisa ? styles["sem-lupa"] : ''}`} 
                type="text" 
                value={pesquisa} 
                onChange={e => setPesquisa(e.target.value)} 
            />

            <div className={styles["perguntas"]}>
                {perguntasFiltradas.length > 0 ? (
                    perguntasFiltradas.map((item, index) => (
                        <Pergunta key={index} pergunta={item.pergunta} resposta={item.resposta} />
                    ))
                ) : (
                    <p>Nenhuma pergunta encontrada.</p>
                )}
            </div>

            <div id="texto-duvida"><strong>Não achou o que procurava?</strong></div>

            <input 
                className={styles["enviar-duvida"]} 
                type="text" 
                placeholder='Envie sua dúvida:' 
                value={duvida} 
                onChange={e => setDuvida(e.target.value)} 
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        enviarDuvida();
                    }
                }} 
            />
        </div>
    );
}

export default Duvidas;
