import Hero from '../../components/Hero.jsx'
import Duvidas from '../duvidas/duvidas'
import Simulator from '../simulador/Simulator'
import SobreNos from '../sobrenos/sobrenos.jsx'

export default function Home() {
  return (
    <>
      <Hero />
      <Duvidas />
      <Simulator />
      <SobreNos />
    </>
  )
}
