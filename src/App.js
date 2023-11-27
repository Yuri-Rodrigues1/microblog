import React, { useEffect, useState } from 'react';
import Entrar from './components/auth/Entrar';
import Cadastrar from './components/auth/Cadastrar';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Criar from './components/Criar';
import { signOut } from 'firebase/auth';
import { auth } from './Firebase';
import Home from './components/Home';
import styled from 'styled-components';
import "./App.css"
import SplashScreen from './components/SplashScreen';

const AppContainer = styled.div`
  font-family: 'Arial', sans-serif;
`;

const Navigation = styled.nav`
  background-color: #333;
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 3em
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #555;
  }
`;

const LogoutButton = styled.button`
  color: white;
  background-color: #d9534f;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c9302c;
  }
`;

function App() {
  const [isAuth, setIsAuth] = useState(localStorage.getItem('isAuth'));
  const [loading, setLoading] = useState(true); // Adicione o estado para controlar o carregamento inicial

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 2000); 
  }, []);

  const sair = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = '/entrar';
    });
  };

  return (
    <AppContainer>
      <BrowserRouter>
        {loading ? (
          <SplashScreen />
        ) : (
          <>
            <Navigation>
              <NavLink to="/">Home</NavLink>

              {!isAuth ? (
                <NavLink to="/entrar">Login</NavLink>
              ) : (
                <>
                  <NavLink to="/criar">Criar Post</NavLink>
                  <LogoutButton onClick={sair}>Sair</LogoutButton>
                </>
              )}
            </Navigation>
            <Routes>
              <Route path="/" element={<Home isAuth={isAuth} />} />
              <Route path="/entrar" element={<Entrar setIsAuth={setIsAuth} />} />
              <Route path="/cadastrar" element={<Cadastrar />} />
              <Route path="/criar" element={<Criar isAuth={isAuth} />} />
            </Routes>
          </>
        )}
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;