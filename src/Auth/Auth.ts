import { AuthProvider } from 'react-admin';
import config from '../configFile';

const authProvider: AuthProvider = {
   // export default {

   login: (params) => {
      const { username, password } = params;
      const request = new Request(config.ip, {
         method: 'POST',
         // tslint:disable-next-line:object-literal-sort-keys
         body: JSON.stringify({
            query: `mutation($emailUser: String!, $passwordUser: String!) {
                    login(email: $emailUser, password: $passwordUser) {
                        id
                        token
                        user {
                        id
                        role
                        email
                        username
                        name
                        avatarUrl
                        }
                    }
                }`,
            variables: { emailUser: username, passwordUser: password },
         }),
         headers: new Headers({ 'Content-Type': 'application/json' }),
      });
      return fetch(request)
         .then(async (response) => {
            // tslint:disable-next-line:no-magic-numbers
            if (response.status < 200 || response.status >= 300) {
               throw new Error(response.statusText);
            }
            return response.json();
         })
         .then((data) => {
            if (data.errors && data.errors.length > 0) {
               const error = data.errors[0].message;
               throw new Error(error);
            }
            const isAuthorizedUser: boolean =
               data.data.login.user.role === 'ADMIN' ||
               data.data.login.user.role === 'SUPERADMIN';
            if (isAuthorizedUser) {
               localStorage.setItem('token', data.data.login.token);
               localStorage.setItem(
                  'username',
                  data.data.login.user.artistName
               );
               localStorage.setItem('user_id', data.data.login.user.id);
               localStorage.setItem('user_email', data.data.login.user.email);
               localStorage.setItem('role', data.data.login.user.role);
               localStorage.setItem(
                  'avatarUrl',
                  data.data.login.user.avatarUrl
               );
               return Promise.resolve();
            }
            throw new Error(
               `${data.data.login.user.role} doesn't have permission to access!`
            );
         });
   },

   logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_email');
      localStorage.removeItem('role');
      localStorage.removeItem('avatarUrl');
      return Promise.resolve();
   },
   // checkError: (error) => Promise.resolve(),
   checkError: (error) => {
      const status = error.status;
      if (status === 401 || status === 403) {
         localStorage.removeItem('token');
         localStorage.removeItem('username');
         localStorage.removeItem('user_id');
         localStorage.removeItem('user_email');
         localStorage.removeItem('role');
         localStorage.removeItem('avatarUrl');
         return Promise.reject({ message: false });
      }
      // other error code (404, 500, etc): no need to log out
      return Promise.resolve();
   },
   checkAuth: () =>
      // localStorage.getItem('token') ? Promise.resolve() : Promise.reject({ message: 'login.required' }),
      localStorage.getItem('token')
         ? Promise.resolve()
         : Promise.reject({ message: false }),

   getPermissions: () => Promise.reject('Unknown method'),
   getIdentity: () =>
      Promise.resolve({
         id: `${localStorage.getItem('user_id')}`,
         fullName: `${localStorage.getItem('user_email')}`,
         avatar: `${localStorage.getItem('avatarUrl')}`,
      }),
};

export default authProvider;
