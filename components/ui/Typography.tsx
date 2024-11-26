import React, { ReactNode } from 'react';
import { Text, StyleSheet } from 'react-native';

interface TitleProps {
    children: ReactNode;
}

export const Title: React.FC<TitleProps> = ({ children }) => (
    <Text style={styles.title}>{children}</Text>
);

export const SubTitle: React.FC<TitleProps> = ({ children }) => (
    <Text style={styles.subTitle}>{children}</Text>
);

export const SubSubTitle: React.FC<TitleProps> = ({ children }) => (
    <Text style={styles.subSubTitle}>{children}</Text>
);

export const SubSubSubTitle: React.FC<TitleProps> = ({ children }) => (
    <Text style={styles.subSubSubTitle}>{children}</Text>
);

export const Paragraph: React.FC<TitleProps> = ({ children }) => (
    <Text style={styles.paragraph}>{children}</Text>
);

const styles = StyleSheet.create({
    title: {
        fontWeight: '400',
        lineHeight: 40,
        fontSize: 48, 
        marginVertical: 10,
        letterSpacing: 0.1,
        textAlign: 'left',
    },
    subTitle: {
        fontWeight: '400',
        lineHeight: 40,
        fontSize: 32, 
        marginVertical: 8,
        letterSpacing: 0.1,
        textAlign: 'left',
    },
    subSubTitle: {
        fontWeight: '400',
        lineHeight: 40,
        fontSize: 22, 
        marginVertical: 4,
        letterSpacing: 0.1,
        textAlign: 'left',
    },
    subSubSubTitle: {
        fontWeight: '400',
        lineHeight: 40,
        fontSize: 16, 
        marginVertical: 4,
        letterSpacing: 0.1,
        textAlign: 'left',
    },
    paragraph: {
        fontSize: 16, 
        color: 'rgba(0, 0, 0, 0.7)', 
        lineHeight: 28, 
    },
});
