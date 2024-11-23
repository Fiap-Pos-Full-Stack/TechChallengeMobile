import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

import useAuth from '@/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import AdminStudent from '@/components/AdminStudent';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'; // Importando os ícones do Ionicons
import { getAdminUsers } from '@/services/getAdminUsers';
import { USER_ROUTE_STUDENT, USER_ROUTE_TEACHER } from '@/configs/api';
import BigLink from '@/components/ui/Links';
import { IStudentAdmin } from '@/services/getPosts';
import GoBack from '@/components/navigation/GoBack';

// Simulação da interface do Istudent
type AdminStudentNewNavigationProp = StackNavigationProp<RootParamList, 'AdminStudents'>;

const AdminStudents = () => {
  const navigation = useNavigation<AdminStudentNewNavigationProp>();
  const [students, setstudents] = useState<IStudentAdmin[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const { token } = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Remove o botão de voltar nativo
    });
    fetchStudents(page)
  }, []);

  const fetchStudents = useCallback((actualPage:number)=>{
    setPage(actualPage-1)
    const fetchData = async (actualPage:number) => {
      const response = await getAdminUsers( USER_ROUTE_STUDENT, token,actualPage);
      setTotalPage(parseInt(response.headers.get("X-Total-Pages") || "1"))
      console.log("totalPage",totalPage)
      const fetchedstudents: IStudentAdmin[] = await response.json();
      setstudents(fetchedstudents);
    };
    fetchData(actualPage);
  },[])
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <GoBack title="Admin Estudante" navigation={navigation} routeName="Posts"/>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.replace('Registrar', {role:"2"})} 
        >
          <Icon name="person-add" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {students.length > 0 ? (
        <FlatList
          data={students}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <AdminStudent Student={item} />}
        />
      ) : (
        <Text>Nenhum estudante encontrado</Text>
      )}
            <View style={styles.pagination}>
        {Array.apply(0, Array(totalPage)).map(function (x, i) {
          return      <BigLink key={i} style={page == i ? styles.pageDisabled : styles.page} onPress={() => page != i && fetchStudents(i+1)}>
            {i+1}
        </BigLink>
        })}
      </View>
    </View>
  );
};

export default AdminStudents;

const styles = StyleSheet.create({
  pagination:{
    flexDirection: 'row', // Alinha os botões de paginação na horizontal
    justifyContent: 'center', // Centraliza os botões
    gap: 1, // Diminui o espaço entre os botões
    alignItems: 'center',
    flexWrap: 'wrap', // Permite que os botões que não cabem na linha se movam para a próxima linha
    paddingHorizontal: 1, // Ad// Adiciona um pequeno espaço lateral
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 0.3,
  },
  page: {
    backgroundColor: '#1e6e2f',
    padding: 1, // Diminui o padding para um tamanho mais compacto
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 1,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: 40,
  },
  pageDisabled: {
    backgroundColor: '#1e6e2f',
    opacity: 0.5,
    padding: 1, // Diminui o padding para um tamanho mais compacto
    borderRadius: 5,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 1,
    marginBottom: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: 40,
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
  iconButton: {
    backgroundColor: 'green', // Azul para destacar
    padding: 10,
    borderRadius: 10, // Circular
    marginHorizontal: 10, // Espaço entre os botões
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',

  },
});

