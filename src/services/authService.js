import http from "./httpService";
import jwtDecode from "jwt-decode";

const apiEndpoint = `/auth`;
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const { data: jwt } = await http.post(apiEndpoint, { email, password });
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJWT(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getJwt() {
  localStorage.getItem(tokenKey);
}

export function getUserToken() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    return null;
  }
}

const auth = {
  login,
  logout,
  loginWithJWT,
  getUserToken,
  getJwt,
};
export default auth;
