import React, { useCallback, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StatusBar, StyleSheet } from 'react-native';
import { Formik, FormikHelpers } from 'formik';
import { doLogin } from '@/services/login';
import useAuth from '@/hooks/useAuth';
import useAlert from '@/hooks/useAlert';
import AlertProvider, { AlertType } from '@/context/alertContext';
import { useNavigation } from '@react-navigation/native';
import AuthProvider from '@/context/authContext';
import normalTheme from '@/styles/Normal.styled';
import { USER_ROUTE_TEACHER, USER_ROUTE_STUDENT} from "../configs/api"

interface LoginValues {
  user: string;
  password: string;
}

const Login = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const { dispatchAlert } = useAlert();
  const [userType, setUserType] = useState<'Professor' | 'Estudante'>('Professor'); // Estado para o tipo de usuário

  const doLoginCallback = useCallback(
    async (user: string, pass: string) => {
      try {
        const response = await doLogin(user, pass, userType === 'Estudante' ? USER_ROUTE_STUDENT : USER_ROUTE_TEACHER); // Define o tipo de usuário
        if (response.token) {
          login(response.token);
          navigation.navigate( 'Posts' ); // Ajuste o nome da tela conforme necessário
          dispatchAlert('Logado com sucesso', AlertType.SUCCESS);
        }
      } catch {
        dispatchAlert('Usuário ou senha inválidos', AlertType.ERROR);
      }
    },
    [login, navigation, dispatchAlert, userType]
  );

  const handleSubmit = (values: LoginValues, { setSubmitting }: FormikHelpers<LoginValues>) => {
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
              placeholder="Usuário"
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
              activeOpacity={0.8}
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
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  userTypeWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  userTypeButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    alignItems: 'center',
  },
  activeUserTypeButton: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  userTypeText: {
    fontSize: 16,
    color: 'black',
  },
  activeUserTypeText: {
    color: 'white',
  },
});

export default Login;
