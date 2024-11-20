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
      <View style={styles.postWrapper} key={"post-" + post?.id}>
        <View style={styles.postOperations}>
     
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
                    <View style={styles.postImage}>
                    </View>
                    <Text style={styles.time}>{parserDate(post?.created)}</Text>
                </View>
        <View style={styles.postInfo}>
          <Text>Postado por: {post?.teacher?.username }</Text>
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
    height: 150,
    position: "relative",
    marginBottom: 10,

    backgroundColor:'rgb(173, 202, 216)' 
  },
  postImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover', 
// Esse é o equivalente ao "object-fit: cover"
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
    fontSize: 12,
    fontWeight: '400',
    width:'100%',
    marginVertical: 8,
    color: '#000000', 
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection:'row',// Altere conforme o tema
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