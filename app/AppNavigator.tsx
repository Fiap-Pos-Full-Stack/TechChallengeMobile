import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '@/app/login'; // Update this path
import index from '@/app/index'; 
import posts from '@/app/posts'; 
import post from './post';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="index" component={index} />
        <Stack.Screen name="post" component={post} />
        <Stack.Screen name="posts" component={posts} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
