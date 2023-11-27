import React, { useState } from 'react';
import { auth } from '../../Firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
`;

const InputField = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #008CBA;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 1em;
`;

const ErrorMessage = styled.p`
  color: #d9534f;
  text-align: center;
`;

export default function Entrar({ setIsAuth }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');

  let navigate = useNavigate();

  const Entrar = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/');
        localStorage.setItem('isAuth', true);
        setIsAuth(true);
      })
      .catch((error) => {
        console.error(error.message);
        setError('Credenciais inválidas. Por favor, tente novamente.');
      });
  };

  return (
    <FormContainer>
      <form onSubmit={Entrar}>
        <Title>Login</Title>
        <InputField
          type='email'
          placeholder='Digite seu email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type='password'
          placeholder='Digite sua senha'
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <SubmitButton type='submit'>Entrar</SubmitButton>
        <SubmitButton type='submit' onClick={()=>{navigate("/cadastrar")}}>Cadastrar</SubmitButton>
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </form>
    </FormContainer>
  );
}