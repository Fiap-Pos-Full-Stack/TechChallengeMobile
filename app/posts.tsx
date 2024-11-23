import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { getPosts, IPost } from '../services/getPosts';
import { searchPosts } from '../services/searchPosts';
import Post from '../components/Post'; 
import { useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import useAuth from '@/hooks/useAuth'; 
import { useFocusEffect } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import GoBack from '@/components/navigation/GoBack';


const Posts = () => {
  const [textInput, setTextInput] = useState<string>(""); 
  const [textSearch, setTextSearch] = useState<string>(""); 
  const [posts, setPosts] = useState<IPost[]>([]);
  const navigation = useNavigation();
  const { role } = useAuth(); 

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      title: '',
    });
  }, [navigation]);

  useFocusEffect(
    useCallback(() => {
      const fetchPosts = async () => {
        try {
          const response = await getPosts();
          const postsData = await response.json();
          setPosts(postsData);
        } catch (error) { 
          console.error('Erro ao buscar posts', error);
        } 
      };
      fetchPosts();
    }, []) 
  );

  const searchPost = useCallback(async (searchTerm: string) => {
    const searchedPosts = await searchPosts(searchTerm) as unknown as IPost[];
    setPosts(searchedPosts[0]);
    setTextSearch(searchTerm);
  }, [textInput]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <GoBack title="Posts   " navigation={navigation} routeName="Login"/>
          <View style={styles.inlineFormWrapper}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                placeholder="Pesquisar post"
                value={textInput}
                onChangeText={setTextInput} 
              />
              <TouchableOpacity
                style={styles.searchButton}
                onPress={() => searchPost(textInput)} 
              >
                <Icon name="search" size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {role === '1' && (
          <View style={styles.buttonWrapper}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Admin_Post')} 
            >
              <Icon name="checklist-rtl" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Admin_Professor')} 
            >
              <Icon name="engineering" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Admin_Estudante')} 
            >
              <Icon name="person-search" size={24} color="white" />
            </TouchableOpacity>

          </View>
        )}
      
        {textSearch && <Text style={styles.results}>Resultados: {textSearch}</Text>}

        <View style={styles.cardsWrapper}>
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <TouchableOpacity
                key={post.id}
                onPress={() => {
                  navigation.navigate("post", { id: post.id });
                }}
              >
                <Post key={post.id} post={post} />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noPosts}>Não há nenhum post</Text>
          )}
        </View>
      
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    //flex: 0.12,
    alignItems: 'center',
    fontSize: 34,
    textAlign: 'left',
  },
  inlineFormWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  input: {
    flex: 1,
    padding: 8,
    fontSize: 16,
  },
  searchButton: {
    padding: 8,
  },
  results: {
    marginVertical: 16,
    fontSize: 18,
  },
  cardsWrapper: {
    marginTop: 16,
    width: '100%',
  },
  noPosts: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
  buttonWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  iconButton: {
    backgroundColor: '#007AFF', // Azul para destacar
    padding: 10,
    borderRadius: 10, // Circular
    marginHorizontal: 10, // Espaço entre os botões
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Posts;
