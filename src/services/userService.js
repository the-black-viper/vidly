import http from "./httpService";
import { apiURL } from "../config.json";

const apiEndpoint = `${apiURL}/users`;

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    name: user.username,
    password: user.password,
  });
}
