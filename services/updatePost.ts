import { API_URL, UPDATE_POST_ENDPOINT, POSTS_ROUTE } from "../configs/api"
import { LOCAL_STORAGE_TOKEN } from "../configs/constraints"

export const updatePost = async (postId : number, title:string, author:string, content:string, token:string) => {
  //const token = localStorage.getItem(LOCAL_STORAGE_TOKEN)
  console.log("token " + token) 
    const response = await fetch(`${API_URL}/${POSTS_ROUTE}/${UPDATE_POST_ENDPOINT}${postId}`,{
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token, 
        },
        body: JSON.stringify({title: title, author: author, description:content})
      })
      if(response.status != 200)
        {
          throw new Error()
        }
        return response
}
