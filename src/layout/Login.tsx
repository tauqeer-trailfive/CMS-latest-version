import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import {
   Avatar,
   Button,
   Card,
   CardActions,
   CircularProgress,
   Typography,
   Backdrop,
} from '@mui/material';
import LockIcon from '@mui/icons-material/LockPersonTwoTone';
import {
   Form,
   required,
   TextInput,
   useTranslate,
   useLogin,
   useNotify,
} from 'react-admin';

import Box from '@mui/material/Box';
import logo from '../images/logo.png';
import cover from '../images/login_image.png';

const Login = () => {
   const [loading, setLoading] = useState(false);
   const translate = useTranslate();

   const notify = useNotify();
   const login = useLogin();
   const location = useLocation();

   const handleSubmit = (auth: FormValues) => {
      setLoading(true);
      login(
         auth,
         location.state ? (location.state as any).nextPathname : '/'
      ).catch((error: Error) => {
         setLoading(false);
         notify(
            typeof error === 'string'
               ? error
               : typeof error === 'undefined' || !error.message
               ? 'ra.auth.sign_in_error'
               : error.message,
            {
               type: 'error',
               messageArgs: {
                  _:
                     typeof error === 'string'
                        ? error
                        : error && error.message
                        ? error.message
                        : undefined,
               },
            }
         );
      });
   };

   return (
      <Form onSubmit={handleSubmit} noValidate>
         <Box
            sx={{
               display: 'flex',
               flexDirection: 'column',
               minHeight: '100vh',
               alignItems: 'center',
               justifyContent: 'flex-start',
               backgroundImage: `url("${cover}")`,
               backgroundRepeat: 'no-repeat',
               backgroundSize: 'cover',
            }}
         >
            <Backdrop open>
               <Card sx={{ minWidth: 300, my: 'auto' }}>
                  <Box
                     sx={{
                        margin: '1em',
                        display: 'flex',
                        justifyContent: 'center',
                     }}
                  >
                     <Avatar sx={{ bgcolor: 'secondary.main' }}>
                        <LockIcon />
                     </Avatar>
                  </Box>
                  <Box
                     sx={{
                        marginTop: '1em',
                        display: 'flex',
                        justifyContent: 'center',
                        color: (theme) => theme.palette.grey[500],
                     }}
                  >
                     <img
                        style={{ height: '2rem', width: 'auto' }}
                        alt={'djaminn_logo'}
                        src={logo}
                     />
                  </Box>
                  <Box sx={{ padding: '0 1em 1em 1em' }}>
                     <Box sx={{ marginTop: '1em' }}>
                        <TextInput
                           autoFocus
                           source="username"
                           label={'Email Address'}
                           validate={required()}
                           fullWidth
                        />
                     </Box>
                     <Box sx={{ marginTop: '1em' }}>
                        <TextInput
                           source="password"
                           label={translate('ra.auth.password')}
                           type="password"
                           validate={required()}
                           fullWidth
                        />
                     </Box>
                  </Box>
                  <CardActions sx={{ padding: '0 1em 1em 1em' }}>
                     <Button
                        variant="contained"
                        type="submit"
                        color="primary"
                        disabled={loading}
                        fullWidth
                     >
                        {loading ? (
                           <CircularProgress
                              size={25}
                              thickness={2}
                              color="inherit"
                           />
                        ) : (
                           translate('ra.auth.sign_in')
                        )}
                     </Button>
                  </CardActions>
               </Card>
            </Backdrop>
         </Box>
      </Form>
   );
};

Login.propTypes = {
   authProvider: PropTypes.func,
   previousRoute: PropTypes.string,
};

export default Login;

interface FormValues {
   username?: string;
   password?: string;
}
