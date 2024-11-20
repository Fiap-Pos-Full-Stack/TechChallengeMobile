import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL, GET_ADMIN_POSTS_ENDPOINT, POSTS_ROUTE } from "../configs/api"
import { LOCAL_STORAGE_TOKEN } from "../configs/constraints"

export const getAdminPosts = async (token: string) => {
  
  console.log("teste" + token);
  return fetch(`${API_URL}/${POSTS_ROUTE}/${GET_ADMIN_POSTS_ENDPOINT}`, {

    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  })
}
