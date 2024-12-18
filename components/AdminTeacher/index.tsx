import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons"; 
import { deleteUser } from "../../services/deleteUser";
import useAlert from "../../hooks/useAlert";
import { AlertType } from "../../context/alertContext";
import { useNavigation } from "@react-navigation/native"; 
import useAuth from "@/hooks/useAuth";
import { StackNavigationProp } from "@react-navigation/stack";
import { ITeacherAdmin } from "@/services/getPosts";
import { USER_ROUTE_STUDENT, USER_ROUTE_TEACHER, } from "@/configs/api";

type AdminTeacherNavigationProp = StackNavigationProp<RootParamList, 'AdminTeachers'>;

type AdminTeacherProps = {
  Teacher: ITeacherAdmin | undefined;
};

const AdminTeacher = ({ Teacher }: AdminTeacherProps) => {
  const { dispatchAlert } = useAlert();
  const navigation = useNavigation<AdminTeacherNavigationProp>();
  const { token, role } = useAuth();

  const onDeleteTeacher = useCallback(
    (TeacherId: number) => {
      dispatchAlert(
        "Você deseja mesmo deletar o Teacher?",
        AlertType.YES_NO,
        async () => {
          await deleteUser( role === '1' ? USER_ROUTE_TEACHER : USER_ROUTE_STUDENT, token, TeacherId );
          navigation.replace("Admin_Professor"); 
        },
        () => {}
      );
    },
    [dispatchAlert, navigation]
  );

  return (
    <View style={styles.TeacherRow} key={"Teacher-" + Teacher?.id}>

      <Text style={styles.TeacherTitle}>{Teacher?.name}</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Registrar", { id:Teacher?.id, role: "1" })}
        style={styles.iconButton}
      >
        <Icon name="edit" size={30} color="#4d90fe" />
      </TouchableOpacity>
      
      
      <TouchableOpacity
        onPress={() => onDeleteTeacher(Teacher?.id || 0)}
        style={styles.iconButton}
      >
        <Icon name="delete" size={30} color="#ff4d4d" />
      </TouchableOpacity>


    </View>
  );
};

export default AdminTeacher;

const styles = StyleSheet.create({
  TeacherRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", 
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)", 
  },
  TeacherTitle: {
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
