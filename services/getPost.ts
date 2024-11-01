import { API_URL, GET_POSTS_ENDPOINT, POSTS_ROUTE } from "../configs/api"

export const getPost = async (postId : string)=> {
    return fetch(`${API_URL}/${POSTS_ROUTE}/${GET_POSTS_ENDPOINT}${postId}`)
}
