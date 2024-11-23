import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Login from '@/app/login'; 
import Posts from '@/app/posts'; 
import Post from './post';
import AlertProvider from '@/context/alertContext';
import AuthProvider from '@/context/authContext';
import { PropsStackRoutes } from './interfaces';
import Admin_Professor from '@/app/admin-teachers';
import Admin_PostEdit from './admin-post-edit';
import Criar_Post from '@/app/admin-post-new';
import Registrar from '@/app/register';
import Admin_Estudante from '@/app/admin-students';
import Admin_Post from '@/app/admin-posts';

const Stack = createStackNavigator<PropsStackRoutes>();

const AppNavigator = () => {
  return (
  
    <AlertProvider>
      <AuthProvider initial={""}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Post" component={Post}  initialParams={{ id:0 }} />
          <Stack.Screen name="Posts" component={Posts} />
          <Stack.Screen name="Admin_Professor" component={Admin_Professor} />
          <Stack.Screen name="Admin_Estudante" component={Admin_Estudante} />
          <Stack.Screen name="Admin_Post" component={Admin_Post} />
          <Stack.Screen name="Editar_Post" component={Admin_PostEdit} />
          <Stack.Screen name="Criar_Post" component={Criar_Post} />
          <Stack.Screen name="Registrar" component={Registrar} />
        </Stack.Navigator>
      </AuthProvider>
    </AlertProvider>

  );
};

export default AppNavigator;
