import http from "./httpService";

const apiEndpoint = "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    name: user.username,
    password: user.password,
  });
}
