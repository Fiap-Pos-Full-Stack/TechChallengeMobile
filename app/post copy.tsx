import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import { doLogin } from '@/services/login';
import useAuth from '@/hooks/useAuth';
import useAlert from '@/hooks/useAlert';
import AlertProvider, { AlertType } from '@/context/alertContext';
import { useNavigation, useRoute } from '@react-navigation/native';
import AuthProvider from '@/context/authContext';
import normalTheme from '@/styles/Normal.styled';
import Login from '@/app/login';
import { PropsScreenRoutes } from './interfaces';
import { getPosts, IPost } from '@/services/getPosts';
import { getPost } from '@/services/getPost';
import SinglePost from '@/components/SinglePost';

const Post = () => {
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
  return (
    <AlertProvider>
  <AuthProvider initial={""}>
    <View style={styles.container}>
      <SinglePost post={post}></SinglePost>
    </View>
    </AuthProvider>
    </AlertProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: `rgb(${normalTheme.colors.primary})`, // Cor do botão
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white', // Cor do texto do botão
    fontSize: 16,
  },
});

export default Post;
