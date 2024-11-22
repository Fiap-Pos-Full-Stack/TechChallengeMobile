import { API_URL } from "../configs/api"
import { LOCAL_STORAGE_TOKEN } from "../configs/constraints"

export const deleteUser= async (userRoute: string, token: string, userId: number ) => {
  console.log("userRoute 2->", userRoute);
  return fetch(`${API_URL}/${userRoute}/${userId}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
  });
}
