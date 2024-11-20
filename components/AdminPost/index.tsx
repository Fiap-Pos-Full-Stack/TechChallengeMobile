import React, { useCallback } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { IPost } from "../../services/getPosts";
import { deletePost } from "../../services/deletePost";
import useAlert from "../../hooks/useAlert";
import { AlertType } from "../../context/alertContext";
import { useNavigation } from "@react-navigation/native"; // Para navegação no React Native




type AdminPostProps = {
  post: IPost | undefined;
};

const AdminPost = ({ post }: AdminPostProps) => {
  const { dispatchAlert } = useAlert();
  const navigation = useNavigation();

  const onDeletePost = useCallback(
    (postId: number) => {
      dispatchAlert(
        "Você deseja mesmo deletar o post?",
        AlertType.YES_NO,
        async () => {
          await deletePost(postId);
          navigation.navigate("AdminPosts"); // Navegação para a tela de admin após exclusão
        },
        () => {}
      );
    },
    [dispatchAlert, navigation]
  );

  return (
    <View style={styles.postWrapper} key={"post-" + post?.id}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Post", {id:post.id})}
      >
        <Text style={styles.postTitle}>{post?.title}</Text>
      </TouchableOpacity>
      <View style={styles.postOperations}>
        <TouchableOpacity
          onPress={() => onDeletePost(post?.id || 0)}
          style={styles.deleteButton}
        >
          <Text style={styles.buttonText}>Deletar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditPost", {id:post.id})
          }
          style={styles.editButton}
        >
          <Text style={styles.buttonText}>Editar</Text>
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
      borderBottomColor: "rgba(0, 0, 0, 0.3)", // Ajuste conforme sua preferência
    },
    postTitle: {
      fontSize: 18,
      color: "#000", // Cor do título do post
      fontWeight: "bold",
    },
    postOperations: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 10,
    },
    deleteButton: {
      backgroundColor: "#ff4d4d", // Cor de fundo para o botão deletar
      padding: 8,
      borderRadius: 5,
    },
    editButton: {
      backgroundColor: "#4d90fe", // Cor de fundo para o botão editar
      padding: 8,
      borderRadius: 5,
    },
    buttonText: {
      color: "#fff",
      fontSize: 16,
      textAlign: "center",
    },
  });