import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LangProvider } from './context/LangContext';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Projects from './pages/Projects';
import './index.css';

function App() {
  return (
    <LangProvider>
      <BrowserRouter>
        <Cursor />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
        <ScrollToTop />
      </BrowserRouter>
    </LangProvider>
  );
}

export default App;
