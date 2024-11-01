import { API_URL, UPDATE_POST_ENDPOINT, POSTS_ROUTE } from "../configs/api"
import { LOCAL_STORAGE_TOKEN } from "../configs/constraints"

export const createPost = async ( title:string, author:string, content:string)=> {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN)
    const response = await fetch(`${API_URL}/${POSTS_ROUTE}/`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token, 
        },
        body: JSON.stringify({title: title, author: author, description:content})
      })
      if(response.status != 201)
      {
        throw new Error()
      }
      return response.json()
}
