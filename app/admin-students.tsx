import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import { IStudentAdmin } from '@/services/getstudents';
import useAuth from '@/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import AdminStudent from '@/components/AdminStudent';
import { StackNavigationProp } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'; // Importando os ícones do Ionicons
import { getAdminUsers } from '@/services/getAdminUsers';
import { USER_ROUTE_STUDENT, USER_ROUTE_TEACHER } from '@/configs/api';

// Simulação da interface do Istudent
type AdminStudentNewNavigationProp = StackNavigationProp<RootParamList, 'AdminStudents'>;

const AdminStudents = () => {
  const navigation = useNavigation<AdminStudentNewNavigationProp>();
  const [students, setstudents] = useState<IStudentAdmin[]>([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchstudents = async () => {
      const response = await getAdminUsers( USER_ROUTE_STUDENT, token);
      const fetchedstudents: IStudentAdmin[] = await response.json();
      setstudents(fetchedstudents);
    };
    fetchstudents();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Students Admin</Text>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('Register')} // Navega para a página "Adminstudents"
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
        <Text>Nenhum student encontrado</Text>
      )}
    </View>
  );
};

export default AdminStudents;

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
  iconButton: {
    backgroundColor: 'green', // Azul para destacar
    padding: 10,
    borderRadius: 10, // Circular
    marginHorizontal: 10, // Espaço entre os botões
    justifyContent: 'center',
    alignItems: 'center',
  },
});
