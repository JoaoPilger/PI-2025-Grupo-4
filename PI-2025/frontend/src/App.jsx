import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import Home from './pages/home/Home.jsx';
import MeusComodos from './pages/meuscomodos/meuscomodos.jsx';
import Historico from './pages/historico/historico.jsx';
import NovoComodo from './pages/novoscomodos/novocomodo.jsx';
import ScrollToHash from './components/ScrollToHash.jsx';
import Login from './pages/cadastroelogin/login.jsx';
import Cadastro from './pages/cadastroelogin/cadastro.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <Header />
          <ScrollToHash />
          
          {/* Rotas principais */}
          
          <main className="main-content">
            <Routes>
              <Route path="/meuscomodos" element={<MeusComodos />} />
              <Route path="/novocomodo" element={<NovoComodo />} />
              <Route path="/historico" element={<Historico />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;