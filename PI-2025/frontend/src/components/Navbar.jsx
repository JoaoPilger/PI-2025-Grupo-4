import { Link } from 'react-router-dom'
import './Navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <img src="/neo_volt(1).png" className="logo-img" />
        </div>

        <div className="links">
          <Link to="/simulador">Simulador</Link>
          <Link to="#">Dúvidas</Link>
          <Link to="#">Sobre Nós</Link>
          <Link to="#">👤</Link>
        </div>
      </div>
    </nav>
  )
}
