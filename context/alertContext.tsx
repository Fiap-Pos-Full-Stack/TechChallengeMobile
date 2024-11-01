import React, { createContext, useState, ReactNode, useCallback } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export enum AlertType {
    ERROR,
    SUCCESS,
    YES_NO,
}

export type AlertContextType = {
    dispatchAlert: (
        alertText: string,
        alertType: AlertType,
        onYes?: () => void,
        onNo?: () => void
    ) => void;
};

export const AlertContext = createContext<AlertContextType | undefined>(undefined);

export type AlertProviderProps = {
    initial?: string;
    children: ReactNode;
};

function AlertProvider({ initial = "", children }: AlertProviderProps) {
    const [alertText, setAlertText] = useState<string>("");
    const [onYes, setOnYes] = useState<() => void>();
    const [onNo, setOnNo] = useState<() => void>();
    const [open, setOpen] = useState<boolean>(false);
    const [alertType, setAlertType] = useState<AlertType>(AlertType.YES_NO);

    const dispatchAlert = useCallback((alertText: string, alertType: AlertType, onYes?: () => void, onNo?: () => void) => {
        setAlertText(alertText);
        setAlertType(alertType);
        setOpen(true);
        setOnYes(() => () => { onYes && onYes(); });
        setOnNo(() => () => { onNo && onNo(); });
        
        if (alertType !== AlertType.YES_NO) {
            setTimeout(() => setOpen(false), 7000);
        }
    }, []);

    return (
        <AlertContext.Provider value={{ dispatchAlert }}>
            {children}
            <Modal transparent visible={open} animationType="fade">
                <View style={styles.overlay}>
                    <View style={styles.alertBox}>
                        <Text style={styles.alertText}>{alertText}</Text>
                        {alertType === AlertType.YES_NO ? (
                            <View style={styles.buttonContainer}>
                                <TouchableOpacity style={styles.buttonSuccess} onPress={() => { onYes && onYes(); setOpen(false); }}>
                                    <Text style={styles.buttonText}>Sim</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonError} onPress={() => { onNo && onNo(); setOpen(false); }}>
                                    <Text style={styles.buttonText}>Não</Text>
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity style={styles.button} onPress={() => setOpen(false)}>
                                <Text style={styles.buttonText}>Fechar</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>
            </Modal>
        </AlertContext.Provider>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    alertBox: {
        width: '80%',
        padding: 20,
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
    },
    alertText: {
        marginBottom: 20,
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: '100%',
        alignItems: 'center',
    },
    buttonSuccess: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
    },
    buttonError: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default AlertProvider;
