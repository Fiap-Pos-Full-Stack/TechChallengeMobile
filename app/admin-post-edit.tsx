import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import { updatePost } from '../services/updatePost'; 
import useAlert from '../hooks/useAlert'; 
import { AlertType } from '../context/alertContext';
import { IPost } from '../services/getPosts'; 
import { getPost } from '@/services/getPost';
import useAuth from '@/hooks/useAuth';
import { StackNavigationProp } from '@react-navigation/stack';
import GoBack from '@/components/navigation/GoBack';


type AdminPostEditNavigationProp = StackNavigationProp<RootParamList, 'AdminPostEdit'>;

interface Values {
  title: string;
  content: string;
  author: string;
}

const AdminPostEdit = () => {
  const navigation = useNavigation<AdminPostEditNavigationProp>();
  const { dispatchAlert } = useAlert();
  const route = useRoute();
  const [post, setPost] = useState<IPost | null>(null);
  const {token} = useAuth();
  useEffect(() => {    
    
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
  }, [route.params.id]);

  // Garantir que o formulário só seja renderizado quando o post estiver carregado
  if (!post) {
    return <Text>Carregando...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <GoBack title="Editar Post" navigation={navigation} routeName="Admin_Post"/>
      </View>

      <Formik
        initialValues={{
          title: post?.title || '', // Inicializa com string vazia
          content: post?.description || '', // Inicializa com string vazia
          author: post?.author || '', // Inicializa com string vazia
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            // Atualizar o post com os novos valores
            await updatePost(post.id, values.title, values.author, values.content, token);
            setSubmitting(false);
            dispatchAlert("Atualizado com sucesso", AlertType.SUCCESS);
            navigation.replace('Admin_Post');
          } catch (error) {
            dispatchAlert("Erro ao atualizar post", AlertType.ERROR);
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, isSubmitting }) => (
          <View style={styles.formWrapper}>
            <Text style={styles.label}>Titulo</Text>
            <TextInput
              style={styles.input}
              placeholder="Titulo"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title} // Usando valores do Formik
            />

            <Text style={styles.label}>Autor</Text>
            <TextInput
              style={styles.input}
              placeholder="Autor"
              onChangeText={handleChange('author')}
              onBlur={handleBlur('author')}
              value={values.author} // Usando valores do Formik
            />

            <Text style={styles.label}>Conteudo</Text>
            <TextInput
              style={styles.textarea}
              placeholder="Conteúdo"
              multiline
              numberOfLines={4}
              onChangeText={handleChange('content')}
              onBlur={handleBlur('content')}
              value={values.content} // Usando valores do Formik
            />

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
              disabled={isSubmitting} // Desabilitar o botão enquanto o formulário está sendo enviado
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? 'Atualizando...' : 'Atualizar'}
              </Text>
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
    textAlignVertical: 'top', // Para texto ficar no topo do TextInput
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
