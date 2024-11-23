import { API_URL } from "../configs/api"

export const getAdminUsers = async (userRoute: string, token: string, page:number) => {
  return fetch(`${API_URL}/${userRoute}?page=${page}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  })
}
