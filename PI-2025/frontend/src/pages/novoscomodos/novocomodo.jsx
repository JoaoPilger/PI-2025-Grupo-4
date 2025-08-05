import { useState } from 'react';
import styles from './novocomodo.module.css';

function EditableTitle({ defaultText = "Clique para editar" }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(defaultText);

  const handleBlur = () => setIsEditing(false);
  const handleKeyDown = (e) => { if (e.key === "Enter") setIsEditing(false); };

  return (
    <>
      {isEditing ? (
        <input
          type="text"
          value={title}
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <h1 onClick={() => setIsEditing(true)}>{title}</h1>
      )}
    </>
  );
}

function NovoComodo() {
  const aparelhos = [
    { nome: "Geladeira", img: "/imagens/refrigerator.png", consumo: 30, custo: 15, tarifa: 0.5 },
    { nome: "Freezer", img: "/imagens/mode_cool.png", consumo: 25, custo: 12, tarifa: 0.48 },
    { nome: "Micro-ondas", img: "/imagens/microwave.png", consumo: 10, custo: 5, tarifa: 0.5 },
    { nome: "Forno Elétrico", img: "/imagens/oven.png", consumo: 20, custo: 10, tarifa: 0.5 },
    { nome: "Panela Elétrica", img: "/imagens/stockpot.png", consumo: 8, custo: 4, tarifa: 0.5 },
    { nome: "Airfryer", img: "/imagens/multicooker.png", consumo: 12, custo: 6, tarifa: 0.5 },
    { nome: "Liquidificador", img: "/imagens/blender.png", consumo: 2, custo: 1, tarifa: 0.5 },
    { nome: "Batedeira", img: "/imagens/mixer-icon.png", consumo: 1, custo: 0.5, tarifa: 0.5 },
    { nome: "Torradeira", img: "/imagens/toaster.png", consumo: 3, custo: 1.5, tarifa: 0.5 },
    { nome: "Cafeteira", img: "/imagens/coffee.png", consumo: 2, custo: 1, tarifa: 0.5 },
    { nome: "Exaustor", img: "/imagens/range_hood.png", consumo: 5, custo: 2.5, tarifa: 0.5 },
    { nome: "Lava Louças", img: "/imagens/dishwasher.png", consumo: 18, custo: 9, tarifa: 0.5 },
    { nome: "Lava Roupas", img: "/imagens/laundry.png", consumo: 22, custo: 11, tarifa: 0.5 },
    { nome: "Secadora de Roupas", img: "/imagens/laundry.png", consumo: 20, custo: 10, tarifa: 0.5 },
    { nome: "Ferro de Passar", img: "/imagens/iron.png", consumo: 6, custo: 3, tarifa: 0.5 },
    { nome: "Aspirador de Pó", img: "/imagens/vacuum.png", consumo: 4, custo: 2, tarifa: 0.5 },
    { nome: "Robô Aspirador", img: "/imagens/robot.png", consumo: 3, custo: 1.5, tarifa: 0.5 },
    { nome: "Ventilador", img: "/imagens/fan.png", consumo: 7, custo: 3.5, tarifa: 0.5 },
    { nome: "Ar Condicionado", img: "/imagens/climate.png", consumo: 40, custo: 20, tarifa: 0.5 },
    { nome: "Aquecedor Elétrico", img: "/imagens/heat_pump.png", consumo: 15, custo: 7.5, tarifa: 0.5 },
    { nome: "Televisão", img: "/imagens/tv.png", consumo: 5, custo: 2.5, tarifa: 0.5 },
    { nome: "Videogame", img: "/imagens/videogame.png", consumo: 3, custo: 1.5, tarifa: 0.5 },
    { nome: "Computador", img: "/imagens/desktop.png", consumo: 8, custo: 4, tarifa: 0.5 },
    { nome: "Notebook", img: "/imagens/laptop.png", consumo: 4, custo: 2, tarifa: 0.5 },
    { nome: "Impressora", img: "/imagens/printer.png", consumo: 2, custo: 1, tarifa: 0.5 },
    { nome: "Modem / Roteador", img: "/imagens/router.png", consumo: 1, custo: 0.5, tarifa: 0.5 },
    { nome: "Chuveiro Elétrico", img: "/imagens/shower.png", consumo: 35, custo: 17.5, tarifa: 0.5 },
    { nome: "Secador de Cabelo", img: "/imagens/air.png", consumo: 5, custo: 2.5, tarifa: 0.5 },
    { nome: "Barbeador Elétrico", img: "/imagens/shaver.png", consumo: 1, custo: 0.5, tarifa: 0.5 },
    { nome: "Escova Secadora", img: "/imagens/heat.png", consumo: 2, custo: 1, tarifa: 0.5 },
    { nome: "Aparelho de Som", img: "/imagens/speaker.png", consumo: 3, custo: 1.5, tarifa: 0.5 },
    { nome: "Relógio Despertador", img: "/imagens/alarm.png", consumo: 0.5, custo: 0.25, tarifa: 0.5 },
    { nome: "Lâmpada LED", img: "/imagens/lightbulb.png", consumo: 0.2, custo: 0.1, tarifa: 0.5 },
    { nome: "Luminária Elétrica", img: "/imagens/floor_lamp.png", consumo: 0.5, custo: 0.25, tarifa: 0.5 }
  ];

  const [selecionados, setSelecionados] = useState([]);

  const handleSelecionar = (aparelho) => {
    setSelecionados((prev) =>
      prev.some((a) => a.nome === aparelho.nome)
        ? prev.filter((a) => a.nome !== aparelho.nome)
        : [...prev, aparelho]
    );
  };

  const totalConsumo = selecionados.reduce((acc, cur) => acc + cur.consumo, 0);
  const totalCusto = selecionados.reduce((acc, cur) => acc + cur.custo, 0);
  const tarifaMedia =
    selecionados.length > 0
      ? (selecionados.reduce((acc, cur) => acc + cur.tarifa, 0) / selecionados.length).toFixed(2)
      : 0;

  return (
    <div className={styles["novo-comodo-container"]}>
      <div className={styles["titulo"]}>
        <EditableTitle defaultText="Novo Cômodo" />
        <img src="/imagens/edit_text.png" alt="Editar texto" />
      </div>
      <div className={styles["painel"]}>
        <div className={styles["info-box"]}>
          <p><strong>TOTAL ESTIMADO:</strong></p>
          <p>CONSUMO<br /><strong>{totalConsumo.toFixed(2)} kWh</strong></p>
          <p>CUSTO<br /><strong>R$ {totalCusto.toFixed(2)}</strong></p>
          <p>TARIFA MÉDIA<br /><strong>R$ {tarifaMedia}</strong></p>
        </div>

        <div className={styles["scroll-container"]}>
          <div className={styles["aparelhos-scroll"]}>
            {aparelhos.map((item) => (
              <div className={styles["aparelho"]} key={item.nome}>
                <div>
                  <img src={item.img} alt={item.nome} />
                  <p>{item.nome.toUpperCase()}</p>
                </div>
                <input
                  type="checkbox"
                  checked={selecionados.some((a) => a.nome === item.nome)}
                  onChange={() => handleSelecionar(item)}
                  name="eletro"
                  id={item.nome}
                />
                <span className={styles["custom-checkbox"]}></span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles["info-box"]}>
          <p><strong>APARELHOS<br />SELECIONADOS:</strong></p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {selecionados.length === 0 ? (
              <li>Nenhum aparelho selecionado</li>
            ) : (
              selecionados.map((a) => (
                <li key={a.nome}>
                  <img
                    src={a.img}
                    alt={a.nome}
                    style={{
                      width: 24,
                      height: 24,
                      verticalAlign: "middle",
                      marginRight: 8
                    }}
                  />
                  {a.nome}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <button className={styles["btn-finalizar"]}>FINALIZAR EDIÇÃO</button>
    </div>
  );
}

export default NovoComodo;
