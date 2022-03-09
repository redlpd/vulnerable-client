import Cookies from 'universal-cookie'

const cookies = new Cookies()

export const setCookies = (token, type) => {
  cookies.set(type, token)
}

export const removeToken = () => {
  cookies.remove('authToken')
}

export const removeUserId = () => {
  cookies.remove('userId')
}

export const getUserId = () => {
  return cookies.get('userId')
}

export const getToken = () => {
  return cookies.get('authToken')
}
