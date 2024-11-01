import React, { useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import { doLogin } from '@/services/login';
import useAuth from '@/hooks/useAuth';
import useAlert from '@/hooks/useAlert';
import AlertProvider, { AlertType } from '@/context/alertContext';
import { useNavigation } from '@react-navigation/native';
import AuthProvider from '@/context/authContext';
import normalTheme from '@/styles/Normal.styled';

interface LoginValues {
  user: string;
  password: string;
}

const Login = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const { dispatchAlert } = useAlert();

  const doLoginCallback = useCallback(async (user: string, pass: string) => {
    try {
      const response = await doLogin(user, pass);
      if (response.token) {
        login(response.token);
        navigation.navigate('posts'); // Ajuste o nome da tela conforme necessário
        dispatchAlert("Logado com sucesso", AlertType.SUCCESS);
      }
    } catch {
      dispatchAlert("Usuário ou senha inválidos", AlertType.ERROR);
    }
  }, [login, navigation, dispatchAlert]);

  const handleSubmit = (values: LoginValues, { setSubmitting }: FormikHelpers<LoginValues>) => {
    console.log("user senha!" + values.user + values.password + "user senha!");
    if (!values.user || !values.password) {
      alert('Todos os campos são obrigatórios!');
      setSubmitting(false);
      return;
    }
    doLoginCallback(values.user, values.password);
    setSubmitting(false);
  };

  return (
 
    <View style={styles.container}>

      <Text style={styles.title}>Login</Text>
      <Formik
        initialValues={{ user: '', password: '' }}
        onSubmit={handleSubmit}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <>
            <TextInput
              style={styles.input}
              placeholder="Usuário te"
              onChangeText={handleChange('user')}
              onBlur={handleBlur('user')}
              value={values.user}
            />
            <TextInput
              style={styles.input}
              placeholder="Senha"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => handleSubmit()} // Chamada correta da função de envio
              activeOpacity={0.1}
            >
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>
          </>
        )}
      </Formik>

    </View>
 
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

export default Login;
