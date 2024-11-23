import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { useNavigation } from '@react-navigation/native';
import { createPost } from '../services/createPost';
import useAlert from '../hooks/useAlert';
import { AlertType } from '../context/alertContext';
import useAuth from '@/hooks/useAuth';
import login from './login';
import { StackNavigationProp } from '@react-navigation/stack';

type AdminPostNewNavigationProp = StackNavigationProp<RootParamList, 'AdminPostNew'>;
interface Values {
  title: string;
  content: string;
  author: string;
}

const AdminPostNew = () => {
  const navigation = useNavigation<AdminPostNewNavigationProp>();
  const { dispatchAlert } = useAlert();
  const {token} = useAuth();
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        

      </View>

      <Formik
        initialValues={{
          title: '',
          content: '',
          author: '',
        }}
        onSubmit={async (values: Values, { setSubmitting }) => {
          try {
            console.log("values " + values.title, values.author, values.content, token);
            const response = await createPost(values.title, values.author, values.content, token);
            navigation.replace('Admin_Post');
            console.log("response " + response);
            setSubmitting(false);
            dispatchAlert('Criado com sucesso', AlertType.SUCCESS);

          } catch (error) {
            dispatchAlert('Erro ao criar post', AlertType.ERROR);
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.formWrapper}>
            <Text style={styles.label}>Titulo</Text>
            <TextInput
              style={styles.input}
              id="title"
              name="title"
              placeholder="Titulo"
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
            />

            <Text style={styles.label}>Autor</Text>
            <TextInput
              style={styles.input}
              id="author"
              name="author"
              placeholder="Autor"
              onChangeText={handleChange('author')}
              onBlur={handleBlur('author')}
              value={values.author}
            />

            <Text style={styles.label}>Conteudo</Text>
            <TextInput
              style={styles.textarea}
              id="content"
              name="content"
              placeholder="Conteudo"
              multiline
              numberOfLines={4}
              onChangeText={handleChange('content')}
              onBlur={handleBlur('content')}
              value={values.content}
            />

            <TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
              <Text style={styles.buttonText}>

                Criar</Text>
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
  subtitle: {
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
    borderColor: '#5e0e0e',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  textarea: {
    height: 100,
    borderColor: '#970c0c',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    textAlignVertical: 'top', // Ensures text starts from the top of the textarea
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#dddddd',
    backgroundColor: '#007BFF',
    fontSize: 20,
  },
});

export default AdminPostNew;
