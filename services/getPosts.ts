import { API_URL, GET_POSTS_ENDPOINT, POSTS_ROUTE } from "../configs/api"

interface ITeacher {
    id: number;
    username?: string;
}
export interface IComment {
    id: number;
    name: string,
    comentary: string;
    created:string;
}
export interface IPost {
    id: number;
    thumb?: string
    title: string;
    created?: string;
    description: string;
    author: string;
    teacher: ITeacher;
    comments?:IComment[]
}
export const getPosts = async ()  => {
    return fetch(`${API_URL}/${POSTS_ROUTE}/${GET_POSTS_ENDPOINT}`)
}
