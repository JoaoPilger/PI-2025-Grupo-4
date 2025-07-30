import { useState } from 'react';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Duvidas from './pages/duvidas/duvidas.jsx';
import SobreNos from './pages/sobrenos/sobrenos.jsx';
import MeusComodos from './pages/meuscomodos/meuscomodos.jsx';
import Historico from "./pages/historico/historico.jsx";
//import Login from './pages/cadastroelogin/login.jsx';
//import Cadastro from "./pages/cadastroelogin/cadastro.jsx";

function App() {
  const [paginaAtual, setPaginaAtual] = useState('duvidas');

  const renderizarPagina = () => {
    switch (paginaAtual) {
      case 'duvidas':
        return <Duvidas />;
      case 'sobrenos':
        return <SobreNos />;
      case 'meuscomodos':
        return <MeusComodos />;
      case 'historico':
        return <Historico />;
      default:
        return <Duvidas />;
    }
  };

  return (
    <div className="app">
      <Header paginaAtual={paginaAtual} setPaginaAtual={setPaginaAtual} />
      
      <main className="main-content">
        {renderizarPagina()}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
