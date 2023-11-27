import React, { useEffect, useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../Firebase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const FormContainer = styled.div`
  max-width: 600px;
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


const TextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  height: 10em;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #008cba;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default function Criar({ isAuth }) {
  
  const [post, setPost] = useState("");

  const postsCollection = collection(db, "posts");
  let navigate = useNavigate();

  const criarPost = async () => {
    await addDoc(postsCollection, {
     
      post,
      author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
      date: serverTimestamp(),
    });
    navigate("/");
  };

  useEffect(() => {
    if (!isAuth) {
      navigate("/entrar");
    }
  }, []);

  return (
    <FormContainer>
      <div>
        <Title>Criar Post</Title>
        <div>
          <TextArea
            placeholder="Digite suas ideias"
            maxLength={280}
            onChange={(e) => {
              setPost(e.target.value);
            }}
          />
        </div>
        <SubmitButton onClick={criarPost}>Enviar</SubmitButton>
      </div>
    </FormContainer>
  );
}