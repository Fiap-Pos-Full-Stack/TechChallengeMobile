import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; 
import { deleteUser } from "../../services/deleteUser";
import useAlert from "../../hooks/useAlert";
import { AlertType } from "../../context/alertContext";
import { useNavigation } from "@react-navigation/native"; 
import useAuth from "@/hooks/useAuth";
import { StackNavigationProp } from "@react-navigation/stack";
import { IStudentAdmin } from "@/services/getPosts";
import { USER_ROUTE_STUDENT } from "@/configs/api";



type AdminStudentNavigationProp = StackNavigationProp<RootParamList, 'AdminStudent'>;

type AdminStudentProps = {
  Student: IStudentAdmin | undefined;
};

const AdminStudent = ({ Student }: AdminStudentProps) => {
  const { dispatchAlert } = useAlert();
  const navigation = useNavigation<AdminStudentNavigationProp>();
  const { token } = useAuth();

  const onDeleteStudent = useCallback(
    (StudentId: number) => {
      dispatchAlert(
        "Você deseja mesmo deletar o Student?",
        AlertType.YES_NO,
        async () => {
          await deleteUser( USER_ROUTE_STUDENT, token, StudentId );
          navigation.replace("Admin_Estudante"); 
        },
        () => {}
      );
    },
    [dispatchAlert, navigation]
  );

  return (
    <View style={styles.StudentRow} key={"Student-" + Student?.id}>
      
      <Text style={styles.StudentTitle}>{Student?.name}</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Registrar", { id:Student?.id, role: "2" })}
        style={styles.iconButton}
      >
        <Icon name="edit" size={30} color="#4d90fe" />
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onDeleteStudent(Student?.id || 0)}
        style={styles.iconButton}
      >
        <Icon name="delete" size={30} color="#ff4d4d" />
      </TouchableOpacity>
    </View>
  );
};

export default AdminStudent;

const styles = StyleSheet.create({
  StudentRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", 
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)", 
  },
  StudentTitle: {
    flex: 1, 
    fontSize: 18,
    color: "#000", 
    fontWeight: "bold",
    textAlign: "left", 
  },
  iconButton: {
    padding: 8,
  },
});
