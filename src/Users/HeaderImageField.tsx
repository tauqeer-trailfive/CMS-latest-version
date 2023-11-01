import * as React from 'react';
import { useTranslate, useRefresh, useNotify } from 'react-admin';
import { Box, Button, CircularProgress } from '@mui/material';

import { useMutation, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

import CloudDoneIcon from '@mui/icons-material/CloudDone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

type Props = {};

const UPLOAD_USER_POLICY = gql`
   mutation singleImageUpload($imageName: String!, $bType: String!) {
      singleImageUpload(imageName: $imageName, b_type: $bType) {
         url
         x_goog_meta_test
         key
         x_goog_date
         x_goog_credential
         x_goog_algorithm
         policy
         x_goog_signature
         download_url
         mp3download_url
      }
   }
`;

const UPDATE_HEADER_IMAGE = gql`
   mutation updateUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
      updateUser(data: $data, where: $where) {
         id
      }
   }
`;

let header_image_config_data: any = {
   'x-goog-meta-test': '',
   key: '',
   'x-goog-algorithm': '',
   'x-goog-credential': '',
   'x-goog-date': '',
   'x-goog-signature': '',
   policy: '',
};

const HeaderImageField = (props: Props) => {
   const { id } = useParams();
   const refresh = useRefresh();
   const notify = useNotify();

   const [headerimage, setheaderimage] = React.useState<any>();
   const [headeruploaded, setheaderuploaded] = React.useState<boolean>(false);

   const [uploadHeaderImage, { data, loading, error }] =
      useMutation(UPLOAD_USER_POLICY);

   const [
      UpdateUser,
      {
         data: updateuserData,
         loading: updateuserLoading,
         error: updateuserError,
      },
   ] = useMutation(UPDATE_HEADER_IMAGE);

   if (data !== undefined) {
      header_image_config_data = {
         'x-goog-meta-test': 'data',
         key: data?.singleImageUpload.key,
         'x-goog-algorithm': data?.singleImageUpload.x_goog_algorithm,
         'x-goog-credential': data?.singleImageUpload.x_goog_credential,
         'x-goog-date': data?.singleImageUpload.x_goog_date,
         'x-goog-signature': data?.singleImageUpload.x_goog_signature,
         policy: data?.singleImageUpload.policy,
      };
   }

   const saveheaderImageMutaiton = () => {
      UpdateUser({
         variables: {
            where: {
               id: id,
            },
            data: {
               headerImage: data?.singleImageUpload.mp3download_url,
            },
         },
      });
      notify('Header Image Updated');
      refresh();
   };

   useEffect(() => {
      const uploadHImage = () => {
         const filename_data = new Date().getTime() + '-' + headerimage.name;
         const filename = 'users' + '/' + 'backgrounds' + '/' + filename_data;

         uploadHeaderImage({
            variables: {
               imageName: filename,
               bType: 'djam_rn',
            },
         });
         localStorage.setItem;
      };
      headerimage && uploadHImage();
   }, [headerimage]);

   return (
      <>
         <Box
            display={{ xs: 'block', sm: 'flex', md: 'flex' }}
            sx={{
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'space-around',
               width: '70%',
            }}
         >
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
               <div>
                  <form
                     action="https://storage.googleapis.com/djam_rn/"
                     method="POST"
                     encType="multipart/form-data"
                     id="header_image"
                  >
                     {Object.keys(header_image_config_data).map((key) => (
                        <input
                           key={key}
                           name={key}
                           value={header_image_config_data[key]}
                           type="hidden"
                           id="urlheaderimageid"
                        />
                     ))}
                     <p>
                        <Button
                           variant="outlined"
                           component="label"
                           size="small"
                           color="primary"
                           sx={{ borderRadius: 0.8 }}
                           startIcon={
                              loading ? (
                                 <CircularProgress
                                    size={10}
                                    color="secondary"
                                 />
                              ) : (
                                 <CloudUploadIcon />
                              )
                           }
                        >
                           Choose Header Image
                           <input
                              type="file"
                              name="file"
                              accept="*"
                              hidden={true}
                              onChange={(
                                 e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                 if (e.target.files != null) {
                                    setheaderimage(e.target.files[0]);

                                    const form: any =
                                       document.querySelector('#header_image');
                                    const input: any =
                                       document.querySelector(
                                          '#urlheaderimageid'
                                       );
                                    setTimeout(() => {
                                       form.submit();
                                       setheaderuploaded(true);
                                    }, 1000);
                                 }
                                 1;
                              }}
                           />
                        </Button>
                     </p>
                  </form>
               </div>
            </Box>
            <Button
               variant="outlined"
               component="label"
               size="small"
               color="primary"
               onClick={() => {
                  saveheaderImageMutaiton();
               }}
               sx={{ borderRadius: 0.8 }}
            >
               Upload
            </Button>
         </Box>
         {/* 
      {headeruploaded ? (
        <p style={{ color: "green" }}>User Cover Uploaded Successfully!</p>
      ) : (
        <>
          <p style={{ color: "red" }}>User Cover Not Uploaded!</p>
        </>
      )} */}
      </>
   );
};

export default HeaderImageField;
