import * as React from 'react';
import { useTranslate, useRefresh, useNotify } from 'react-admin';
import { Box, Button, CircularProgress } from '@mui/material';

import { useMutation, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const POLICY = gql`
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

const UPDATE_COVER_IMAGE = gql`
   mutation UpdatePlaylist(
      $data: PlaylistCreateInput
      $where: PlaylistWhereInput
   ) {
      updatePlaylist(data: $data, where: $where) {
         id
         imageUrl
      }
   }
`;

let cover_image_config_data = {
   'x-goog-meta-test': '',
   key: '',
   'x-goog-algorithm': '',
   'x-goog-credential': '',
   'x-goog-date': '',
   'x-goog-signature': '',
   policy: '',
};

type Props = {
   PlaylistID: any;
   ownerID: any;
};

const PECoverImageUploader = (props: Props) => {
   const refresh = useRefresh();
   const notify = useNotify();

   const [coverimageuploaded, setcoverimageuploaded] =
      React.useState<boolean>(false);
   const [coverimage, setcoverimage] = React.useState<any>();

   const [
      UpdateCoverImage,
      {
         data: updatecoverimageData,
         loading: updatecoverimageLoading,
         error: updatecoverimageError,
      },
   ] = useMutation(UPDATE_COVER_IMAGE);

   const [uploadCoverImage, { data, loading, error }] = useMutation(POLICY);

   const saveavatarURLMutaiton = () => {
      UpdateCoverImage({
         variables: {
            data: {
               imageUrl: data?.singleImageUpload.mp3download_url,
               owner: { connect: { id: props.ownerID } },
            },
            where: {
               id: props.PlaylistID,
            },
         },
      });
      notify('Cover Image Updated');
      refresh();
   };

   useEffect(() => {
      const UploadCImage = () => {
         const filename_data = new Date().getTime() + '-' + coverimage.name;
         const filename =
            'playlists' + '/' + 'cover_photos' + '/' + filename_data;
         uploadCoverImage({
            variables: {
               imageName: filename,
               bType: 'djam_rn',
            },
         });
      };
      coverimage && UploadCImage();
   }, [coverimage]);

   if (data !== undefined) {
      cover_image_config_data = {
         'x-goog-meta-test': 'data',
         key: data?.singleImageUpload.key,
         'x-goog-algorithm': data?.singleImageUpload.x_goog_algorithm,
         'x-goog-credential': data?.singleImageUpload.x_goog_credential,
         'x-goog-date': data?.singleImageUpload.x_goog_date,
         'x-goog-signature': data?.singleImageUpload.x_goog_signature,
         policy: data?.singleImageUpload.policy,
      };
   }
   return (
      <>
         <Box
            display={{ xs: 'block', sm: 'flex' }}
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
                     id="cover_image"
                  >
                     {Object.keys(cover_image_config_data).map((key) => (
                        <input
                           key={key}
                           name={key}
                           value={cover_image_config_data[key]}
                           type="hidden"
                           id="urlcoverimageid"
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
                              ) : coverimageuploaded ? (
                                 <CheckCircleIcon color="success" />
                              ) : (
                                 <CloudUploadIcon />
                              )
                           }
                        >
                           Choose Cover Image
                           <input
                              type="file"
                              name="file"
                              accept="*"
                              hidden={true}
                              onChange={(
                                 e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                 if (e.target.files != null) {
                                    setcoverimage(e.target.files[0]);

                                    const form: any =
                                       document.querySelector('#cover_image');
                                    const input: any =
                                       document.querySelector(
                                          '#urlcoverimageid'
                                       );
                                    setTimeout(() => {
                                       form.submit();
                                       setcoverimageuploaded(true);
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
                  saveavatarURLMutaiton();
               }}
               sx={{ borderRadius: 0.8 }}
            >
               Upload
            </Button>
         </Box>
         {updatecoverimageError && (
            <p style={{ color: 'red' }}>Error cannot Upload Cover Image</p>
         )}
      </>
   );
};

export default PECoverImageUploader;
