import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import AdminPost from '../components/AdminPost'; // Importar o componente AdminPost
import BigLink from '../components/ui/Links'; // Usar como componente para links
import { getAdminPosts } from '@/services/getAdminPosts';
import { IPost } from '@/services/getPosts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_STORAGE_TOKEN } from '@/configs/constraints';
import useAuth from '@/hooks/useAuth';
import { Title } from './../components/ui/Typography';
import { useNavigation } from '@react-navigation/native';
// Simulação da interface do IPost

const AdminPosts = () => {
  const navigation = useNavigation();
  // Estado para armazenar os posts
  const [posts, setPosts] = useState<IPost[]>([]);
const {token} = useAuth();

  // Simulando o carregamento dos dados (substitua isso com sua lógica de API)
  useEffect(() => {
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
        <Text style={styles.subtitle}>Posts admin</Text>
        <BigLink style={styles.button} onPress={() => navigation.navigate("NewPost")}>Criar novo</BigLink>          

      </View>

      {posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <AdminPost post={item} />}
        />
      ) : (
        <Text>Nenhum post encontrado</Text>
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
  button: {
    backgroundColor: '#1e6e2f',
    padding: 10,
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 10,
  }
});