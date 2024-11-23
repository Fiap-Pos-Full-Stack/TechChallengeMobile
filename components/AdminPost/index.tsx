import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { IPost } from "../../services/getPosts";
import { deletePost } from "../../services/deletePost";
import useAlert from "../../hooks/useAlert";
import { AlertType } from "../../context/alertContext";
import { useNavigation } from "@react-navigation/native"; 
import useAuth from "@/hooks/useAuth";
import { StackNavigationProp } from "@react-navigation/stack";
import Icon from "react-native-vector-icons/MaterialIcons"; 

type AdminPostNavigationProp = StackNavigationProp<RootParamList, 'AdminPost'>;

type AdminPostProps = {
  post: IPost | undefined;
};

const AdminPost = ({ post }: AdminPostProps) => {
  const { dispatchAlert } = useAlert();
  const navigation = useNavigation<AdminPostNavigationProp>();
  const {token} = useAuth();
  
  const onDeletePost = useCallback(
    (postId: number) => {
      dispatchAlert(
        "Você deseja mesmo deletar o post?",
        AlertType.YES_NO,
        async () => {
          await deletePost(postId, token);
          navigation.replace("Admin_Post"); // Navegação para a tela de admin após exclusão
        },
        () => {}
      );
    },
    [dispatchAlert, navigation]
  );

  return (
    <View style={styles.postRow} key={"post-" + post?.id}>
      <Text style={styles.postTitle}>{post?.title}</Text>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Editar_Post", { id: post?.id })}
          style={styles.iconButton}
        >
          <Icon name="edit" size={30} color="#4d90fe" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onDeletePost(post?.id)}
          style={styles.iconButton}
        >
          <Icon name="delete" size={30} color="#ff4d4d" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminPost;

const styles = StyleSheet.create({
  postWrapper: {
    width: "100%",
    marginBottom: 20,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)", 
  },
  postTitle: {
    fontSize: 18,
    color: "#000", 
    fontWeight: "bold",
  },
  postRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between", 
    width: "100%",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)", 
  },
  buttonsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 8,
    marginLeft: 15,  // Espaçamento entre os botões
  },
});
