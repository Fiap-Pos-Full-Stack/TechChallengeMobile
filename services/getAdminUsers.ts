import { API_URL } from "../configs/api"

export const getAdminUsers = async (userRoute: string, token: string) => {
  return fetch(`${API_URL}/${userRoute}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  })
}
