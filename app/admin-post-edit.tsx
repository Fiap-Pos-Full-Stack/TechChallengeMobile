import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updatePost } from '../services/updatePost'; // Make sure this works with React Native
import useAlert from '../hooks/useAlert'; // Assuming this hook is also compatible with React Native
import { AlertType } from '../context/alertContext';
import { IPost } from '../services/getPosts'; // Ensure this is available in React Native
import { getPost } from '@/services/getPost';

interface Values {
  title: string;
  content: string;
  author: string;
}



const AdminPostEdit = () => {
  const navigation = useNavigation();
  const { dispatchAlert } = useAlert();
  const route = useRoute();
  const [post, setPost] = useState<IPost>();

  useEffect(()=>{
    // Defina a função assíncrona dentro do useEffect
    const fetchPost = async () => {
      try {
        const response = await getPost(route.params.id || 0);  
        
        
        const postData = await response.json();  
        setPost(postData);  
      } catch (error) {
        console.error('Erro ao carregar o post:', error);
      }
    };

    fetchPost();  
  }, [route])
  console.log("post " , post?.title );
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Editar Post</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>Voltar</Text>
        </TouchableOpacity>
      </View>

      <Formik
        initialValues={{

          title: post?.title,
          content: post?.description,
          author: post?.author,
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            //await updatePost(post.id, values.title, values.author, values.content);
            setSubmitting(false);
            dispatchAlert("Atualizado com sucesso", AlertType.SUCCESS);
            navigation.navigate('AdminPosts'); // Navigate to the admin home or another screen
          } catch (error) {
            dispatchAlert("Erro ao atualizar post", AlertType.ERROR);
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formWrapper}>
            <Text style={styles.label}>Titulo</Text>
            <TextInput
             id='title'
              style={styles.input}
              placeholder="Titulo"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={post?.title}
            />

            <Text style={styles.label}>Autor</Text>
            <TextInput
              style={styles.input}
              placeholder="Autor"
              onChangeText={handleChange('author')}
              onBlur={handleBlur('author')}
              value={post?.author}
            />

            <Text style={styles.label}>Conteudo</Text>
            <TextInput
              style={styles.textarea}
              placeholder="Conteúdo"
              multiline
              numberOfLines={4}
              onChangeText={handleChange('content')}
              onBlur={handleBlur('content')}
              value={post?.description}
            />

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>Atualizar</Text>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  backLink: {
    fontSize: 16,
    color: 'blue',
    marginTop: 8,
  },
  formWrapper: {
    marginTop: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  textarea: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AdminPostEdit;
