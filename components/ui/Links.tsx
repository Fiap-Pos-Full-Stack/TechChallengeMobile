import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';


interface LinkProps extends TouchableOpacityProps {
  children: React.ReactNode; 
  onPress?: () => void; 
}

export const Link: React.FC<LinkProps> = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.link, style]} onPress={onPress}>
      <Text style={styles.linkText}>{children}</Text>
    </TouchableOpacity>
  );
};



interface SmallLinkProps extends TouchableOpacityProps {
  children: React.ReactNode;
  onPress?: () => void;
}

export const SmallLink: React.FC<SmallLinkProps> = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.smallLink, style]} onPress={onPress}>
      <Text style={styles.smallLinkText}>{children}</Text>
    </TouchableOpacity>
  );
};

interface SmallLinkDelProps extends TouchableOpacityProps {
  children: React.ReactNode;
  onPress?: () => void;
}

export const SmallLinkDel: React.FC<SmallLinkDelProps> = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.smallLinkDel, style]} onPress={onPress}>
      <Text style={styles.smallLinkDelText}>{children}</Text>
    </TouchableOpacity>
  );
};

interface SmallLinkEditProps extends TouchableOpacityProps {
  children: React.ReactNode;
  onPress?: () => void;
}

export const SmallLinkEdit: React.FC<SmallLinkEditProps> = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.smallLinkEdit, style]} onPress={onPress}>
      <Text style={styles.smallLinkEditText}>{children}</Text>
    </TouchableOpacity>
  );
};

interface BigLinkProps extends TouchableOpacityProps {
  children: React.ReactNode;
  onPress?: () => void;
}

export const BigLink: React.FC<BigLinkProps> = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.bigLink, style]} onPress={onPress}>
      <Text style={styles.bigLinkText}>{children}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  link: {
    padding: 9,
    paddingHorizontal: 8,
    borderRadius: 5,
    backgroundColor: 'yourTheme.linkBg', 
  },
  linkText: {
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.1,
    textAlign: 'center',
    color: 'yourTheme.linkColor', 
  },
  smallLink: {
    backgroundColor: 'yourTheme.colors.primary', 
    padding: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  smallLinkText: {
    fontSize: 12, 
    color: 'white',
  },
  smallLinkDel: {
    backgroundColor: 'yourTheme.colors.error', 
    padding: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  smallLinkDelText: {
    fontSize: 12,
    color: 'white',
  },
  smallLinkEdit: {
    backgroundColor: '#1873D3',
    padding: 5,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  smallLinkEditText: {
    fontSize: 12,
    color: 'white',
  },
  bigLink: {
    backgroundColor: 'yourTheme.colors.success', 
    padding: 8,
    borderRadius: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 170,
  },
  bigLinkText: {
    fontSize: 16,
    color: 'white',
  },
});

export default BigLink;
