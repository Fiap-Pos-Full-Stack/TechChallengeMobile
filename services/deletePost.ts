import { API_URL, UPDATE_POST_ENDPOINT, POSTS_ROUTE } from "../configs/api"
import { LOCAL_STORAGE_TOKEN } from "../configs/constraints"

export const deletePost = async (postId : number, token: string) => {
  //const token = localStorage.getItem(LOCAL_STORAGE_TOKEN)
  console.log("token " + token)
    return fetch(`${API_URL}/${POSTS_ROUTE}/${UPDATE_POST_ENDPOINT}${postId}`,{
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token, 
        },
      })
}
