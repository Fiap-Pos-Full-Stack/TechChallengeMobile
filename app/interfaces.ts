import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types"


export type PropsStackRoutes = {
    Login: undefined,
    Posts: undefined,
    Admin_Post: undefined,
    Admin_Professor: undefined,
    Admin_Estudante: undefined,
    Registrar: undefined,
    Criar_Post: undefined,
    Editar_Post: { id: number },
    Post : { id:number }
}

export type PropsScreenRoutes = NativeStackScreenProps<PropsStackRoutes>