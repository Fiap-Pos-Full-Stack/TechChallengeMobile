import { API_URL, SEARCH_POSTS_ENDPOINT, POSTS_ROUTE } from "../configs/api"
import { IPost } from "./getPosts"


export const searchPosts = async (searchTerm:string) => {
   const response = await fetch(`${API_URL}/${POSTS_ROUTE}/${SEARCH_POSTS_ENDPOINT}${searchTerm}`)
   return await response.json()
}
