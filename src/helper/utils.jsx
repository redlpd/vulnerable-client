import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const setCookies = (token) => {
  cookies.set('authToken', token)
}

export const removeToken = () => {
  cookies.remove('authToken')
}

export const getToken = () => {
  return cookies.get('authToken')
}
