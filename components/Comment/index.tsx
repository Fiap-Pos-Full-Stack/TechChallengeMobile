import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { IComment } from "../../services/getPosts";
import { parserDateWithHours } from "../../utils/parser";

type CommentProps = {
  comment: IComment | undefined;
};

const Comment = ({ comment }: CommentProps) => {
  return (
    <View style={styles.commentWrapper}>
      <View style={styles.commentHeader}>
        <Text style={styles.commentTitle}>{comment?.name}</Text>
        <Text style={styles.commentDate}>{parserDateWithHours(comment?.created)}</Text>
      </View>
      <Text style={styles.commentContent}>{comment?.comentary}</Text>
    </View>
  );
};

export default Comment;


const styles = StyleSheet.create({
    commentWrapper: {
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-start',
      borderBottomWidth: 1,
      borderBottomColor: 'rgba(0, 0, 0, 0.7)', 
      marginBottom: 20,
    },
    commentHeader: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    commentTitle: {
      fontSize: 18,
      color: '#000',  
    },
    commentDate: {
      fontSize: 14,
      opacity: 0.5,
    },
    commentContent: {
      fontSize: 16,
      fontWeight: '400',
      marginVertical: 8,
      color: 'rgba(0, 0, 0, 0.5)',  
      lineHeight: 24,
    },
  });