import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import BigLink from '../components/ui/Links'; // Usar como componente para links
import { ITeacherAdmin } from '@/services/getPosts';
import useAuth from '@/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import AdminTeacher from '@/components/AdminTeacher';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'; // Importando os ícones do Ionicons
import { getAdminUsers } from '@/services/getAdminUsers';
import { USER_ROUTE_TEACHER } from '@/configs/api';

// Simulação da interface do IPost
type AdminTeacherNewNavigationProp = StackNavigationProp<RootParamList, 'AdminTeachers'>;

const AdminTeachers = () => {
  const navigation = useNavigation<AdminTeacherNewNavigationProp>();
  const [posts, setPosts] = useState<ITeacherAdmin[]>([]);
  const [page, setPage] = useState<number>(0);
  const [totalPage, setTotalPage] = useState<number>(1);
  const { token } = useAuth();

  useEffect(() => {
    fetchPosts(1)
  }, []);

  const fetchPosts = useCallback((actualPage:number)=>{
    setPage(actualPage-1)
    const fetchData = async (actualPage:number) => {
      const response = await getAdminUsers(USER_ROUTE_TEACHER, token, actualPage);
      setTotalPage(parseInt(response.headers.get("X-Total-Pages") || "1"))
      const fetchedPosts: ITeacherAdmin[] = await response.json();
      setPosts(fetchedPosts);
    };
    fetchData(actualPage);
  },[])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Teachers Admin</Text>

        {/* Botão com ícone de adicionar */}
        <BigLink style={styles.button} onPress={() => navigation.navigate("Register", { role: "1" })}>
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
      <View style={styles.pagination}>
        {Array.apply(0, Array(totalPage)).map(function (x, i) {
          return      <BigLink key={i} style={page == i ? styles.pageDisabled : styles.page} onPress={() => page != i && fetchPosts(i+1)}>
            {i+1}
        </BigLink>
        })}
      </View>
    </View>
  );
};

export default AdminTeachers;

const styles = StyleSheet.create({
  pagination:{
    flexDirection: 'row',
    justifyContent: 'center',
    gap:10,
    alignItems: 'center',
  },
  page: {
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
  pageDisabled: {
    backgroundColor: '#1e6e2f',
    opacity:0.5,
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
