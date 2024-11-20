import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { postComment } from '../services/postComment';
import SinglePost from '../components/SinglePost';
import Comment from '../components/Comment';

import { IPost, IComment } from '../services/getPosts';

import { useRoute } from '@react-navigation/native';
import { getPost } from '@/services/getPost';

interface Values {
  name: string;
  comentary: string;
}

function Post() {
  

  const [comments, setComments] = useState<IComment[]>([]);
  const route = useRoute();
  const [post, setPost] = useState<IPost>();

  useEffect(()=>{
    // Defina a função assíncrona dentro do useEffect
    const fetchPost = async () => {
      try {
        const response = await getPost(route.params.id || 0);  
        const postData = await response.json();  
        setPost(postData);  
        setComments(postData.comments)
      } catch (error) {
        console.error('Erro ao carregar o post:', error);
      }
    };

    fetchPost();  
  }, [route])


  return (
    <ScrollView style={styles.container}>
      <SinglePost post={post} />
      <Text style={styles.subTitle}>Adicione um novo comentário</Text>
      
        <Formik
          initialValues={{ name: '', comentary: '' }}
          onSubmit={async (values: Values, { setSubmitting }) => {
            try {
              const newComment = await (await postComment(post?.id || 0, values.name, values.comentary)).json();
              if (comments) {
                setComments([{ id: newComment.id, name: newComment.name, comentary: newComment.comentary, created: new Date().toISOString() }, ...comments]);
              }
              setSubmitting(false);
              
            } catch {
              
            }
          }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => (
            <View>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                value={values.name}
                placeholder="Digite seu nome"
              />

              <Text style={styles.label}>Comentário</Text>
              <TextInput
                style={[styles.input, styles.textarea]}
                onChangeText={handleChange('comentary')}
                onBlur={handleBlur('comentary')}
                value={values.comentary}
                placeholder="Digite seu comentário"
                multiline
              />

              <Button onPress={() => handleSubmit()} title="Enviar" />
            </View>
          )}
        </Formik>
 
      
      <Text style={styles.subTitle}>Comentários ({comments?.length || 0})</Text>
      {comments && comments.length > 0 ? (
        comments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      ) : (
        <Text>Não há nenhum comentário</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  label: {
    fontSize: 14,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 4,
    marginBottom: 12,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default Post;
