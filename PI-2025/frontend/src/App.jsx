
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header.jsx';
import Footer from './components/footer.jsx';

import Duvidas from './pages/duvidas/duvidas.jsx';
import SobreNos from './pages/sobrenos/sobrenos.jsx';
import MeusComodos from './pages/meuscomodos/meuscomodos.jsx';
import Historico from './pages/historico/historico.jsx';
import NovoComodo from './pages/novoscomodos/novocomodo.jsx';
// import Login from './pages/cadastroelogin/login.jsx';
// import Cadastro from './pages/cadastroelogin/cadastro.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header /> {/* Você pode manter o Header fixo */}
        
        <main className="main-content">
          <Routes>
            <Route path="/sobrenos" element={<SobreNos />} />
            <Route path="/meuscomodos" element={<MeusComodos />} />
            <Route path="/novocomodo" element={<NovoComodo />} />
            <Route path="/historico" element={<Historico />} />
            <Route path="/" element={<Duvidas />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;