import React, { useState } from 'react';
import { auth } from '../../Firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
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
`;

export default function Cadastrar() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');

  let navigate = useNavigate();

  const Cadastrar = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const user = userCredential.user;

        updateProfile(user, { displayName: nome })
          .then(() => {
            console.log('Nome do usuário definido com sucesso:', nome);
          })
          .catch((error) => {
            console.error('Erro ao definir o nome do usuário:', error);
          });

        console.log(userCredential);
        navigate('/entrar');
      })
      .catch((error) => {
        console.error(error);
        alert("Usuário ja cadastrado")
      });
  };

  return (
    <FormContainer>
      <form onSubmit={Cadastrar}>
        <Title>Cadastro</Title>
        <InputField
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <InputField
          type="email"
          placeholder="Digite seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <SubmitButton type="submit">Cadastrar</SubmitButton>
      </form>
    </FormContainer>
  );
}