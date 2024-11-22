import { API_URL } from "../configs/api"

export const updateUser = async ( routeUser:string, token:string, tearchId : number, name:string, password:string, username:string) => {
  const response = await fetch(`${API_URL}/${routeUser}/${tearchId}`,{
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ token, 
    },
    body: JSON.stringify({name: name, password: password, user:username})
  })
  if(response.status != 200 )
  {
    throw new Error()
  }
  return response.json()

}
