import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const LOCAL_STORAGE_TOKEN = 'token';
const LOCAL_STORAGE_USERID = 'userId';
const LOCAL_STORAGE_ROLE = 'role';
const LOCAL_STORAGE_USERNAME = 'username';

type UserToken = {
    exp?: number;
    iat?: number;
    username?: string;
    _id?: number;
    role?: string
}

export type AuthContextType = {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
    login: (token: string) => void;
    logout: () => void;
    authorId: number;
    authorName: string;
    role: string
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export type AuthProviderProps = {
    initial?: string;
    children: ReactNode;
}

function AuthProvider({ initial = "", children }: AuthProviderProps) {
    const [token, setToken] = useState<string>(initial);
    const [authorId, setAuthorId] = useState<number>(0);
    const [authorName, setAuthorName] = useState<string>("");
    const [role, setRole] = useState<string>("");

    useEffect(() => {
        const loadToken = async () => {
            if (token) {
                try {
                    const user = jwtDecode<UserToken>(token);
                    setAuthorId(user._id || 0);
                    setAuthorName(user.username || "");
                } catch { }
            }
        };
        loadToken();
    }, [token]);

    const login = useCallback(async (authToken: string) => {
        try {
            const user = jwtDecode<UserToken>(authToken);
            await AsyncStorage.setItem(LOCAL_STORAGE_TOKEN, authToken);
            await AsyncStorage.setItem(LOCAL_STORAGE_USERNAME, user.username?.toString() || "");
            await AsyncStorage.setItem(LOCAL_STORAGE_USERID, user._id?.toString() || "0");
            await AsyncStorage.setItem(LOCAL_STORAGE_ROLE, user.role?.toString() || "");
            setToken(authToken);
            setAuthorId(user._id || 0);
            setAuthorName(user.username || "");
            setRole(user.role?.toString() || "")
        } catch (error) {
            console.error("Error saving data: ", error);
        }
    }, []);

    const logout = useCallback(async () => {
        try {
            await AsyncStorage.removeItem(LOCAL_STORAGE_TOKEN);
            await AsyncStorage.removeItem(LOCAL_STORAGE_USERNAME);
            await AsyncStorage.removeItem(LOCAL_STORAGE_USERID);
            await AsyncStorage.removeItem(LOCAL_STORAGE_ROLE);
            setToken("");
            setAuthorId(0);
            setAuthorName("");
            setRole("")
        } catch (error) {
            console.error("Error removing data: ", error);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ token, setToken, login, logout, authorId, authorName,role }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;
