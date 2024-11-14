import React, { useCallback } from "react";
import { Alert, Image, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IPost } from "../../services/getPosts";
import { parserDate } from "../../utils/parser";
import { deletePost } from "../../services/deletePost";
import useAlert from "../../hooks/useAlert";

type PostProps = {
  post: IPost | undefined;
  isTeacherPublishier?: boolean;
};

const SinglePost = ({ post, isTeacherPublishier = false }: PostProps) => {
  const { dispatchAlert } = useAlert();
  const navigation = useNavigation();

  const onDeletePost = useCallback((postId: number) => {
    Alert.alert(
      "Confirmação",
      "Você deseja mesmo deletar o post?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: async () => {
            await deletePost(postId);
            //navigation.navigate("Admin");
          },
        },
      ]
    );
  }, []);

  return (
    <View style={styles.postWrapper}>
      <View key={"post-" + post?.id}>
        <View style={styles.postOperations}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.smallLinkEdit}>Voltar</Text>
          </TouchableOpacity>
          {isTeacherPublishier && (
            <View style={styles.adminOperations}>
              <TouchableOpacity onPress={() => onDeletePost(post?.id || 0)}>
                <Text style={styles.smallLinkDel}>Deletar</Text>
              </TouchableOpacity>
              <TouchableOpacity
              >
                <Text style={styles.smallLinkEdit}>Editar</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text style={styles.postTitle}>{post?.title}</Text>
        <View style={styles.postThumb}>
          <Text style={styles.time}>{parserDate(post?.created)}</Text>
          <Image
            source={{
              uri:
                post?.thumb ||
                "https://blog.megajogos.com.br/wp-content/uploads/2018/07/no-image.jpg",
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.postInfo}>
          <Text>Postado por: {post?.teacher?.username}</Text>
          <Text>Autor: {post?.author}</Text>
        </View>
        <Text style={styles.postContent}>{post?.description}</Text>
      </View>
    </View>
  );
};

export default SinglePost;

const styles = StyleSheet.create({
  postWrapper: {
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
  postThumb: {
    width: "100%",
    height: 350,
    position: "relative",
    marginBottom: 10,
  },
  time: {
    fontSize: 12,
    color: "#666",
    backgroundColor: "#ddd",
    padding: 5,
    position: "absolute",
    top: 10,
    right: 10,
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  postTitle: {
    fontSize: 24,
    color: "#333",
    marginVertical: 10,
  },
  postInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  postContent: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
    marginBottom: 20,
  },
  postOperations: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  adminOperations: {
    flexDirection: "row",
    gap: 10,
  },
  smallLinkEdit: {
    color: "#007AFF",
  },
  smallLinkDel: {
    color: "#FF3B30",
  },
});