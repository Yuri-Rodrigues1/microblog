import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import atlas from '../images/Atlas.JPG'


const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Arial', sans-serif;
  }
`;

const SplashScreenContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #3498db; /* Cor de fundo da SplashScreen */
  color: #ffffff; /* Cor do texto */
`;


const SplashScreenImage = styled.img`
  width: 80px; /* Largura desejada para a imagem */
  height: auto; /* Altura automática para manter a proporção */
`;

const SplashScreen = () => {
  return (
    <>
      <GlobalStyle />
      <SplashScreenContainer>
        <SplashScreenImage src={atlas} alt="Atlas Image" />
      </SplashScreenContainer>
    </>
  );
};

export default SplashScreen;