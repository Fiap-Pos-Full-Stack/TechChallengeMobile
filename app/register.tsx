import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import { useNavigation, useRoute } from '@react-navigation/native';
import useAlert from '../hooks/useAlert';
import useAuth from '@/hooks/useAuth';
import { AlertType } from '../context/alertContext';
import { USER_ROUTE_TEACHER, USER_ROUTE_STUDENT } from "../configs/api";
import { StackNavigationProp } from '@react-navigation/stack';
import { IUserAdmin } from '@/services/getPosts';
import { updateUser } from '@/services/updateUser';
import { createUser } from '@/services/createUser';
import { getUser } from '@/services/getUser';
import GoBack from '@/components/navigation/GoBack';
import Icon from 'react-native-vector-icons/Ionicons'; 

type AdminTeacherNewNavigationProp = StackNavigationProp<RootParamList, 'Register'>;

interface Values {
  name: string;
  password: string;
  userName: string;
  userType: string;
}

const UserRegistration = () => {
  const navigation = useNavigation<AdminTeacherNewNavigationProp>();
  const { dispatchAlert } = useAlert();
  const route = useRoute();
  const [user   , setUser] = useState<IUserAdmin | null>(null);
  const { token } = useAuth();
  const paramIdDefined = route?.params?.id !== undefined;
  const routeName = route.params?.role === '1' ? 'Admin_Professor' : 'Admin_Estudante';

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: '',
    });
  }, [navigation]);

  if(paramIdDefined){
    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await getUser( route.params?.role === '1' ? USER_ROUTE_TEACHER : USER_ROUTE_STUDENT, token, route.params.id || 0);  
          const postData = await response.json();  
          setUser(postData);
        } catch (error) {
          console.error('Erro ao carregar o post:', error);
        }
      };
      fetchPost();  
    }, [route.params.id]);

    if (!user) {
      return <Text>Carregando...</Text>;
    }

  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
        style={styles.title}
        onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" style={styles.title} size={30} color="black" />
          <Text style={styles.title}>Cadastrar</Text>
        </TouchableOpacity>
        
      </View>

      <Formik
        initialValues={{ 
          name: user?.name || '',
          password: user?.password || '',   
          userName: user?.username || ''
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            if(paramIdDefined){
              await updateUser(route.params?.role === '1' ? USER_ROUTE_TEACHER : USER_ROUTE_STUDENT, token, route.params.id, values.name, values.password, values.userName);
            }
            else{
              await createUser(route.params?.role === '1' ? USER_ROUTE_TEACHER : USER_ROUTE_STUDENT, token, values.name, values.password, values.userName );
            }
            navigation.replace(routeName);
            setSubmitting(false);
            dispatchAlert('Usuário cadastrado com sucesso!', AlertType.SUCCESS);
          } catch (error) {
            dispatchAlert('Erro ao cadastrar usuário', AlertType.ERROR);
            setSubmitting(false);
          }
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
          <View style={styles.formWrapper}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o nome do usuário"
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

            <Text style={styles.label}>Usuário</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite o usuário"
              onChangeText={handleChange('userName')}
              onBlur={handleBlur('userName')}
              value={values.userName}
            />
            {touched.userName && errors.userName && <Text style={styles.errorText}>{errors.userName}</Text>}

            <Text style={styles.label}>Senha</Text>
            <TextInput
              style={styles.input}
              placeholder="Digite a senha"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {touched.userType && errors.userType && (
              <Text style={styles.errorText}>{errors.userType}</Text>
            )}

            <TouchableOpacity
              style={styles.button}
              onPress={() => handleSubmit()}
              disabled={isSubmitting}
            >
              <Text style={styles.buttonText}>
                {isSubmitting ? 'Cadastrando...' : 'Cadastro'}
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
  formWrapper: {
    marginTop: 16,
  },
  title: {
    fontSize: 34,
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
  userTypeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  userTypeButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 4,
  },
  activeUserTypeButton: {
    backgroundColor: '#007BFF',
    borderColor: '#007BFF',
  },
  userTypeText: {
    fontSize: 16,
  },
  activeUserTypeText: {
    color: 'white',
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
  errorText: {
    fontSize: 14,
    color: 'red',
    marginBottom: 8,
  },
});

export default UserRegistration;
