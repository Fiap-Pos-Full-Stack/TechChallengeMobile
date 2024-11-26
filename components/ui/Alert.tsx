import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { AlertType } from '../../context/alertContext';

type AlertBoxProps = {
  alertType: AlertType;
  open: boolean;
  children: React.ReactNode;
};

export const AlertBox = ({ alertType, open, children }: AlertBoxProps) => {
  return (
    <View style={[styles.alertBox, { backgroundColor: getBackgroundColor(alertType), opacity: open ? 1 : 0 }]}>
      <Text style={styles.alertText}>{children}</Text>
    </View>
  );
};

const getBackgroundColor = (alertType: AlertType) => {
  switch (alertType) {
    case AlertType.ERROR:
      return 'red'; 
    case AlertType.SUCCESS:
      return 'green'; 
    default:
      return 'gray'; 
  }
};

type AlertBoxYesNoProps = {
  open: boolean;
  onYes?: () => void;
  onNo?: () => void;
  children: React.ReactNode;
};

export const AlertBoxYesNo = ({ open, onYes, onNo, children }: AlertBoxYesNoProps) => {
  return (
    <View style={[styles.alertBoxYesNo, { opacity: open ? 1 : 0 }]}>
      <Text style={styles.alertText}>{children}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onYes}>
          <Text style={styles.buttonText}>Sim</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onNo}>
          <Text style={styles.buttonText}>Não</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const BlackOpacity = ({ open, children }: { open: boolean; children: React.ReactNode }) => {
  return (
    <View style={[styles.blackOpacity, { opacity: open ? 0.1 : 0 }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  alertBox: {
    position: 'absolute',
    padding: 20,
    bottom: 20,
    right: 20,
    zIndex: 99999,
  },
  alertText: {
    color: 'white', 
  },
  alertBoxYesNo: {
    backgroundColor: 'gray', 
    position: 'relative',
    padding: 50,
    zIndex: 99999,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 8,
    borderRadius: 5,
    backgroundColor: 'blue', 
  },
  buttonText: {
    fontSize: 16,
    color: 'white', 
  },
  blackOpacity: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 99997,
  },
});
