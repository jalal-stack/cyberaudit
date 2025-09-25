import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Scanner from './pages/Scanner';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Scanner />} />
        </Routes>
        <footer className="main-footer">
          <p>© 2025 CyberAudit. Все права защищены.</p>
        </footer>
      </div>
    </Router>
  );
}

const Navbar = () => {
  const { t, i18n } = useTranslation();
  return (
    <nav className="main-header">
      <div className="logo">CyberAudit</div>
      <div className="nav-links">
        <Link to="/">{t('nav.scanner')}</Link>
        <button onClick={() => i18n.changeLanguage('ru')}>🇷🇺 RU</button>
        <button onClick={() => i18n.changeLanguage('uz')}>🇺🇿 UZ</button>
      </div>
    </nav>
  );
};

export default App;