import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { IPost } from "../../services/getPosts";
import { SmallLink } from "../ui/Links";
import { parserDate } from "../../utils/parser";
import LinearGradient from 'react-native-linear-gradient';


type PostProps = {
    post: IPost | undefined;
}

const Post = ({ post }: PostProps) => {
    return (
        <View style={styles.postWrapper}>
            <View style={styles.article}>
                <View style={styles.postThumb}>
                    <Image
                        source={{ uri: post?.thumb || "https://blog.megajogos.com.br/wp-content/uploads/2018/07/no-image.jpg" }}
                        style={styles.postImage}
                    />

                    <Text style={styles.time}>{parserDate(post?.created)}</Text>
                </View>
                <View style={styles.postInfo}>
                    <Text>Postado por: {post?.teacher?.username}</Text>
                    <Text>Autor: {post?.author}</Text>
                </View>
                <Text style={styles.postTitle}>{post?.title}</Text>
                <Text style={styles.postDescription}>
                    {post?.description?.substring(0, 80)} [...]
                </Text>
                <View style={styles.postReadMore}>
                    <SmallLink>Leia mais</SmallLink>
                </View>
            </View>
        </View>
    );
}

export default Post;




const styles = StyleSheet.create({
    postWrapper: {
        width: '100%',
        marginBottom: 20,
        alignItems: 'center',
        height: 'auto',
        
    },
    article: {
        width: '100%',
        flexDirection: 'column',
        height: 'auto',
        
    },
    postThumb: {
        width: '100%',
        height: 150,
        position: 'relative',
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
        position: 'absolute',
        top: 10,
        left: 10,
        fontSize: 12,
        color: '#ffffff', // Exemplo de cor, use cores do seu tema
        backgroundColor: '#000000', // Exemplo de cor
        padding: 5,
        borderRadius: 5,
    },
    postInfo: {
        fontSize: 12,
        fontWeight: '400',
        marginVertical: 8,
        color: '#000000', 
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection:'row',// Altere conforme o tema
    },
    postTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginVertical: 5,
        color: '#333333', // Exemplo de cor, use cores do seu tema
    },
    postDescription: {
        fontSize: 14,
        color: '#555555', // Exemplo de cor, use cores do seu tema
        lineHeight: 22,
    },
    postReadMore: {
        marginTop: 'auto',
    },
});
