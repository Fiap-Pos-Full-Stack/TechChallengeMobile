import { NativeStackScreenProps } from "react-native-screens/lib/typescript/native-stack/types"


export type PropsStackRoutes = {
    Login: undefined,
    Posts: undefined,
    AdminPost: undefined,
    AdminTeachers: undefined,
    AdminStudents: undefined,
    Register: undefined,
    NewPost: undefined,
    EditPost: { id: number },
    Post : { id:number }
}

export type PropsScreenRoutes = NativeStackScreenProps<PropsStackRoutes>