import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AdminPost from '../components/AdminPost';
import BigLink from '../components/ui/Links'; 
import { getAdminPosts } from '@/services/getAdminPosts';
import { IPost } from '@/services/getPosts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCAL_STORAGE_TOKEN } from '@/configs/constraints';
import useAuth from '@/hooks/useAuth';
import { Title } from './../components/ui/Typography';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import GoBack from '@/components/navigation/GoBack';

const AdminPosts = () => {
  const navigation = useNavigation();
  const [posts, setPosts] = useState<IPost[]>([]);
const {token} = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
    });
    const fetchPosts = async () => {
      //const token = await AsyncStorage.getItem(LOCAL_STORAGE_TOKEN) as string;
      const response = await getAdminPosts(token);
      const fetchedPosts: IPost[] = await response.json();
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoBack title="Admin Posts" navigation={navigation} routeName="Posts" />
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
    backgroundColor: 'green', 
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10, 
    justifyContent: 'center',
    alignItems: 'center',
  },
});