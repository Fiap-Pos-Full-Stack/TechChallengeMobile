import { API_URL } from "../configs/api"

export const getUser = async ( userRoute: string, token: string, tearchId : string)=> {
  return fetch(`${API_URL}/${userRoute}/${tearchId}` , {       
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      },
    })
}