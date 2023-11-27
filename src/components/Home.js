import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { auth, db } from '../Firebase';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const PostContainer = styled.div`
  border: 1px solid #ccc;
  padding: 16px;
  margin-bottom: 16px;
`;

const EditableField = styled.input`
  width: 100%;
  margin-bottom: 8px;
  padding: 8px;
  box-sizing: border-box;
`;

const EditableTextArea = styled.textarea`
  width: 100%;
  height: 100px;
  margin-bottom: 8px;
  padding: 8px;
  box-sizing: border-box;
`;

const EditButton = styled.button`
  background-color: #4caf50;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
`;

const SaveButton = styled.button`
  background-color: #008CBA;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  padding: 8px 16px;
  border: none;
  cursor: pointer;
`;

export default function Home({ isAuth }) {
  const [postsList, setPostList] = useState([]);
  const [editingPost, setEditingPost] = useState(null);
  const [editedPost, setEditedPost] = useState('');
  const postsCollection = collection(db, 'posts');

  useEffect(() => {
    const getPosts = async () => {
      const data = await getDocs(postsCollection);
      setPostList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPosts();
  }, [postsCollection]);

  const deletePost = async (id) => {
    const postDoc = doc(db, 'posts', id);
    await deleteDoc(postDoc);
    setPostList((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  const onEdit = (id) => {
    setEditingPost(id);
    const postToEdit = postsList.find((post) => post.id === id);
    setEditedPost(postToEdit.post);
  };

  const saveEdit = async (id) => {
    setEditingPost(null);
    const postDoc = doc(db, 'posts', id);
    await updateDoc(postDoc, {

      post: editedPost,
    });
    const updatedPosts = postsList.map((post) =>
      post.id === id ? { ...post, post: editedPost } : post
    );
    setPostList(updatedPosts);
    setEditedPost('');
  };

  return (
    <Container>
          {postsList.map((post) => {
      const formattedDate = post.date
        ? new Date(post.date.seconds * 1000).toLocaleString()
        : 'Data não disponível';
      const isBeingEdited = editingPost === post.id;

      return (
        <PostContainer key={post.id}>
          {isBeingEdited ? (
            <>
              <EditableTextArea
                value={editedPost}
                onChange={(e) => setEditedPost(e.target.value)}
              />
              <SaveButton onClick={() => saveEdit(post?.id)}>Salvar Edição</SaveButton>
            </>
          ) : (
            <>
              
              <p>{post.post}</p>
          

            </>
          )}

          <h3>@{post.author?.name}</h3>
          <p>{formattedDate}</p>

          {isAuth && post.author?.id === auth.currentUser?.uid && (
            <>
              <DeleteButton onClick={() => deletePost(post?.id)}>Deletar</DeleteButton>
              <EditButton onClick={() => onEdit(post?.id)}>Editar</EditButton>
            </>
          )}
        </PostContainer>
      );
    })}
    </Container>
  );
}