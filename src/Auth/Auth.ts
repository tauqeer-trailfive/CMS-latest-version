import { AuthProvider } from "react-admin";
import configFile from "../configFile";

const authProvider: AuthProvider = {
  login: (params) => {
    const { username, password } = params;
    const request = new Request(configFile.ip, {
      method: "POST",
      body: JSON.stringify({
        query: `mutation($emailUser: String!, $passwordUser: String!) {
                    login(email: $emailUser, password: $passwordUser) {
                        id
                        token
                        user {
                        id
                        email
                        username
                        name
                        avatarUrl
                        }
                    }
                }`,
        variables: { emailUser: username, passwordUser: password },
      }),
      headers: new Headers({ "Content-Type": "application/json" }),
    });
    return fetch(request)
      .then(async (response) => {
        if (response.status < 200 || response.status >= 300) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        localStorage.setItem("token", data.data.login.token);
        localStorage.setItem("username", data.data.login.user.artistName);
        localStorage.setItem("user_id", data.data.login.user.id);
        localStorage.setItem("user_email", data.data.login.user.email);
        localStorage.setItem("role", data.data.login.user.role);
        localStorage.setItem("avatarUrl", data.data.login.user.avatarUrl);
      })
      .catch((error: Error) => {
        throw new Error("Wrong Credentials");
      });
  },
  logout: () => {
    localStorage.removeItem("token");
    return Promise.resolve();
  },
  checkError: (error) => {
    const status = error.status;
    if (status === 401 || status === 403) {
      localStorage.removeItem("token");
      return Promise.reject({ message: false });
    }
    // other error code (404, 500, etc): no need to log out
    return Promise.resolve();
  },
  checkAuth: () =>
    localStorage.getItem("token") ? Promise.resolve() : Promise.reject(),
  getPermissions: () => Promise.resolve(),
  getIdentity: () =>
    Promise.resolve({
      id: `${localStorage.getItem("user_id")}`,
      fullName: `${localStorage.getItem("user_email")}`,
      avatar: `${localStorage.getItem("avatarUrl")}`,
    }),
};

export default authProvider;
