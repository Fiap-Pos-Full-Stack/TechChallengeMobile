import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';
import Login from '@/app/login'; 
import Posts from '@/app/posts'; 
import Post from './post';
import AlertProvider from '@/context/alertContext';
import AuthProvider from '@/context/authContext';
import { PropsStackRoutes } from './interfaces';
import AdminTeachers from '@/app/admin-teachers';
import AdminPostEdit from './admin-post-edit';
import NewPost from '@/app/admin-post-new';
import Register from '@/app/register';
import AdminStudents from '@/app/admin-students';
import AdminPost from '@/app/admin-posts';

const Stack = createStackNavigator<PropsStackRoutes>();

const AppNavigator = () => {
  return (
  
    <AlertProvider>
      <AuthProvider initial={""}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Post" component={Post}  initialParams={{ id:0 }} />
          <Stack.Screen name="Posts" component={Posts} />
          <Stack.Screen name="AdminTeachers" component={AdminTeachers} />
          <Stack.Screen name="AdminStudents" component={AdminStudents} />
          <Stack.Screen name="AdminPost" component={AdminPost} />
          <Stack.Screen name="EditPost" component={AdminPostEdit} />
          <Stack.Screen name="NewPost" component={NewPost} />
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      </AuthProvider>
    </AlertProvider>

  );
};

export default AppNavigator;
