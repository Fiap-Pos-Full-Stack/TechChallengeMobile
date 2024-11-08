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
import Login from '@/app/login';
import { Paragraph } from './../components/ui/Typography';

type Props = {postid:string}
type Props2 = {route:Props}


const Post = ({ route }: Props2) => {
  const postid  = route.postid; // Agora 'route.params' tem o tipo correto
  return (
    <View>
      <Text>Post ID: {postid}</Text>
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

export default Post;
