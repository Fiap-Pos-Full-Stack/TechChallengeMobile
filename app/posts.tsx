import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { getPosts, IPost } from '../services/getPosts';
import { searchPosts } from '../services/searchPosts';
import Post from '../components/Post'; // Personalize a exibição de cada post conforme necessário.
import useDebouncedInput from '../hooks/useDebouncedInput';

const Posts = () => {
  const [textInput, setTextInput, cancelAll] = useDebouncedInput("", 1000);  // Hook para debouncing
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    // Defina a função assíncrona dentro do useEffect
    const fetchPosts = async () => {
      try {
        const response = await getPosts();  // Faz a requisição para obter os posts
        const postsData = await response.json();  // Extrai o JSON da resposta
        setPosts(postsData);  // Atualiza o estado com os posts recuperados
      } catch (error) {
        console.error('Erro ao carregar os posts:', error);
      }
    };

    fetchPosts();  // Chama a função assíncrona
  }, []);


  // Função para buscar posts com base na pesquisa
  const searchPost = useCallback(async (searchTerm: string) => {
    const searchedPosts = await searchPosts(searchTerm) as IPost[];
    setPosts(searchedPosts);
  }, []);

  useEffect(() => {
    if (textInput) {
      searchPost(textInput);  // Se houver texto na pesquisa, realiza a busca
    } else {
      setPosts([]); // Caso contrário, limpa os posts
    }
  }, [textInput, searchPost]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Posts</Text>
        <View style={styles.inlineFormWrapper}>
          <Text style={styles.subTitle}>Pesquisar</Text>
          <TextInput
            style={styles.input}
            placeholder="Pesquisar post"
            value={textInput}
            onChangeText={setTextInput} // Atualiza o texto de pesquisa
          />
        </View>
      </View>

      {textInput && (
        <Text style={styles.results}>Resultados: {textInput}</Text>
      )}

      <View style={styles.cardsWrapper}>
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post key={post.id} post={post} />
          ))
        ) : (
          <Text style={styles.noPosts}>Não há nenhum post</Text>
        )}
      </View>
    </ScrollView>
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
    fontSize: 24,
    fontWeight: 'bold',
    display:'flex',
    flex:0.3
  },
  inlineFormWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  subTitle: {
    fontSize: 18,
    marginRight: 8,
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
  },
  results: {
    marginVertical: 16,
    fontSize: 18,
  },
  cardsWrapper: {
    marginTop: 16,
    width:'100%',
    
  },
  noPosts: {
    fontSize: 16,
    color: 'gray',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Posts;
