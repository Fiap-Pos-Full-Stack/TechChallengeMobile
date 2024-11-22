import { API_URL, GET_POSTS_ENDPOINT, LOGIN_ROUTE, POSTS_ROUTE, USER_ROUTE_TEACHER, USER_ROUTE_STUDENT} from "../configs/api"

export const doLogin = async (username: string, password: string, route: string) => {
  const response = await fetch(`${API_URL}/${LOGIN_ROUTE}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: username, password: password })
  })
  

  if (response.status != 200) {
    throw new Error()
  }
  return response.json()
}
