import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AdminPost from '../components/AdminPost'; // Importar o componente AdminPost
import BigLink from '../components/ui/Links'; // Usar como componente para links
import { getAdminPosts } from '@/services/getAdminPosts';
import { IPost } from '@/services/getPosts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_STORAGE_TOKEN } from '@/configs/constraints';
import useAuth from '@/hooks/useAuth';
import { Title } from './../components/ui/Typography';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
// Simulação da interface do IPost

const AdminPosts = () => {
  const navigation = useNavigation();
  // Estado para armazenar os posts
  const [posts, setPosts] = useState<IPost[]>([]);
const {token} = useAuth();

  // Simulando o carregamento dos dados (substitua isso com sua lógica de API)
  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Remove o botão de voltar nativo
    });
    const fetchPosts = async () => {
      // Simulando a obtenção dos posts, substitua com sua lógica real
      //const token = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN) as string;
      const response = await getAdminPosts(token);
      const fetchedPosts: IPost[] = await response.json();
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  // Função simulada de API para obter posts (substitua com sua API real)


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        
        <TouchableOpacity
          style={styles.title} onPress={() => navigation.navigate("Posts")} >
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate("Criar_Post")} 
        >
          <Icon name="duplicate-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <AdminPost post={item} />}
        />
      ) : (
        <Text>No post found</Text>
      )}
    </View>
  );
};

export default AdminPosts;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 0.3,
  },
  button: {
    backgroundColor: '#1e6e2f',
    padding: 10,
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  iconButton: {
    backgroundColor: 'green', // Azul para destacar
    padding: 10,
    borderRadius: 10, // Circular
    marginHorizontal: 10, // Espaço entre os botões
    justifyContent: 'center',
    alignItems: 'center',
  },
});