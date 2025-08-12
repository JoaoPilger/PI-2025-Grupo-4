import './Hero.css'

export default function Hero() {
  return (
    <div className="hero">
      <video autoPlay muted loop className="background-video">
        <source src="/placas.mp4" type="video/mp4" />
      </video>
      <div className="hero-content">
        <h1>ENERGIA NA PALMA DA MÃO</h1>
        <p>Descubra o consumo da sua casa e economize com sustentabilidade e inteligência.</p>
      </div>
    </div>
  )
}
