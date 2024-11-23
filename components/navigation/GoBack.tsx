import React, { useLayoutEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

const GoBack = ({ title, navigation, routeName }) => {
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: '',
    });
  }, [navigation]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(routeName)}
    >
      <Icon name="arrow-back" size={30} color="black" />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 34,
    marginLeft: 10,
  },
});

export default GoBack;