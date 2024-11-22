import { API_URL, USER_ROUTE_TEACHER } from "../configs/api"

export const createUser = async ( routeUser:string, token:string, name:string, password:string, username:string) => {
  
  console.log("token " + token)  
  const response = await fetch(`${API_URL}/${routeUser}`,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ token, 
        },
        body: JSON.stringify({name: name, password: password, user:username})
      })
  if(response.status != 201)
  {
    throw new Error()
  }
  return response.json()

}
