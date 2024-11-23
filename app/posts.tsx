import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { getPosts, IPost } from '../services/getPosts';
import { searchPosts } from '../services/searchPosts';
import Post from '../components/Post'; // Personalize a exibição de cada post conforme necessário.
import useDebouncedInput from '../hooks/useDebouncedInput';
import { useNavigation } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Ícones do MaterialIcons
import useAuth from '@/hooks/useAuth'; // Importa o contexto de autenticação

const Posts = () => {
  const [textInput, setTextInput] = useState<string>(""); // Hook para debouncing
  const [textSearch, setTextSearch] = useState<string>(""); // Hook para debouncing
  const [posts, setPosts] = useState<IPost[]>([]);
  const navigation = useNavigation();
  const { role } = useAuth(); // Obtém o token do contexto de autenticação


  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Remove o botão de voltar nativo
    });
    const fetchPosts = async () => {
      try {
        const response = await getPosts(); // Faz a requisição para obter os posts
        const postsData = await response.json(); // Extrai o JSON da resposta
        setPosts(postsData); // Atualiza o estado com os posts recuperados
      } catch (error) {
        console.error('Erro ao carregar os posts:', error);
      }
    };

    fetchPosts(); // Chama a função assíncrona
  }, []);

  const searchPost = useCallback(async (searchTerm: string) => {
    const searchedPosts = await searchPosts(searchTerm) as unknown as IPost[];
    setPosts(searchedPosts);
    setTextSearch(searchTerm);
  }, [textInput]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity
          style={styles.title}
          onPress={() => navigation.goBack()} // Volta para a tela anterior
        >
          <Icon name="arrow-back" size={30} color="black" />
        </TouchableOpacity>
        <View style={styles.inlineFormWrapper}>
          <Text style={styles.subTitle}>Pesquisar</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="Pesquisar post"
              value={textInput}
              onChangeText={setTextInput} // Atualiza o texto de pesquisa
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => searchPost(textInput)} // Realiza a busca quando o botão é pressionado
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
            onPress={() => navigation.navigate('Admin_Post')} // Navega para a página "AdminPosts"
          >
            <Icon name="checklist-rtl" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Admin_Professor')} // Navega para a página "Cadastro"
          >
            <Icon name="engineering" size={24} color="white" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => navigation.navigate('Admin_Estudante')} // Navega para a página "Cadastro"
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
    flex: 0.3,
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
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
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
