import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Login from '@/app/login'; // Update this path
import index from '@/app/indexe'; 
import Posts from '@/app/posts'; 
import Post from './post';
import AlertProvider from '@/context/alertContext';
import AuthProvider from '@/context/authContext';
import { PropsStackRoutes } from './interfaces';
import AdminPost from '@/app/admin-posts';
import AdminPostEdit from './admin-post-edit';

const Stack = createStackNavigator<PropsStackRoutes>();

const AppNavigator = () => {
  return (
  
          <AlertProvider>
          <AuthProvider initial={""}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Post" component={Post}  initialParams={{ id:0 }} />
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="AdminPost" component={AdminPost} />
        <Stack.Screen name="EditPost" component={AdminPostEdit} />
      </Stack.Navigator>
      </AuthProvider>
      </AlertProvider>

  );
};

export default AppNavigator;
