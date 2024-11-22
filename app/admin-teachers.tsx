import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import BigLink from '../components/ui/Links'; // Usar como componente para links
import { ITeacherAdmin } from '@/services/getPosts';
import useAuth from '@/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import AdminTeacher from '@/components/AdminTeacher';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'; // Importando os ícones do Ionicons
import { getAdminUsers } from '@/services/getAdminUsers';
import {  USER_ROUTE_TEACHER } from '@/configs/api';

// Simulação da interface do IPost
type AdminTeacherNewNavigationProp = StackNavigationProp<RootParamList, 'AdminTeachers'>;

const AdminTeachers = () => {
  const navigation = useNavigation<AdminTeacherNewNavigationProp>();
  const [posts, setPosts] = useState<ITeacherAdmin[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await getAdminUsers( USER_ROUTE_TEACHER, token);
      const fetchedPosts: ITeacherAdmin[] = await response.json();
      setPosts(fetchedPosts);
    };
    fetchPosts();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Teachers Admin</Text>
        
        {/* Botão com ícone de adicionar */}
        <BigLink style={styles.button} onPress={() => navigation.navigate("Register", { role: "1" } )}>
          <Icon name="add-circle" size={24} color="#fff" style={styles.addIcon} />
          Criar novo
        </BigLink>
      </View>

      {posts.length > 0 ? (
        <FlatList
          data={posts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <AdminTeacher Teacher={item} />}
        />
      ) : (
        <Text>Nenhum post encontrado</Text>
      )}
    </View>
  );
};

export default AdminTeachers;

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
    flexDirection: 'row',
    alignItems: 'center',
  },
  addIcon: {
    marginRight: 10, // Espaço entre o ícone e o texto
  },
});
