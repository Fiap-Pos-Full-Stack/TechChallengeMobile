import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { IPost } from '../services/getPosts';
import { searchPosts } from '../services/searchPosts';
//import Post from '@/components/Post';
import useDebouncedInput from '../hooks/useDebouncedInput';

interface Values {
  textField: string;
}

const Posts = () => {
  const [textInput, setTextInput, cancelAll] = useDebouncedInput("", 1000);
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const searchedPosts = await searchPosts(textInput) as unknown as IPost[];
      setPosts(searchedPosts);
    };
    
    if (textInput) {
      fetchPosts();
    } else {
      // Fetch initial posts if necessary
      setPosts([]); // Or set to initial data
    }
  }, [textInput]);

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
            onChangeText={setTextInput}
          />
        </View>
      </View>
      {textInput ? (
        <Text style={styles.results}>Resultados: {textInput}</Text>
      ) : null}

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    // Add styles for cards wrapper if needed
  },
});

export default Posts;
