import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@/app/login'; // Update this path
import index from '@/app/index'; 
import Posts from '@/app/posts'; 
import Post from './post';
import AlertProvider from '@/context/alertContext';
import AuthProvider from '@/context/authContext';
import { PropsStackRoutes } from './interfaces';

const Stack = createStackNavigator<PropsStackRoutes>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
          <AlertProvider>
          <AuthProvider initial={""}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Post" component={Post}  initialParams={{ id:0 }} />
        <Stack.Screen name="Posts" component={Posts} />
      </Stack.Navigator>
      </AuthProvider>
      </AlertProvider>
    </NavigationContainer>

  );
};

export default AppNavigator;
