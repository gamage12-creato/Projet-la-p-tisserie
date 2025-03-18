import { Routes, Route } from 'react-router-dom';
import HomeForm from './pages/Home/HomeForm';
import JouerForm from './pages/Jouer/JouerForm';
import LoginForm from './pages/Login/LoginForm';
import ContactForm from './pages/Contact/ContactForm';
import Header from './components/Header/Herder';
import Footer from './components/Footer/Footer';
import AdminForm from './pages/Administration/AdminForm/AdminForm';
import AddForm from './pages/Administration/AddForm/AddForm';

import './styles/App.scss';

function App() {
  return (
    <div className="main-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomeForm />} />
          <Route path="/jeu" element={<JouerForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/admin" element={<AdminForm />} />
          <Route path="/add" element={<AddForm />} />
          <Route path="*" element={<div>404 not found</div>} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;