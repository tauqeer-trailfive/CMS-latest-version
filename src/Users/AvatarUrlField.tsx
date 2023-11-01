import * as React from 'react'
import { useTranslate, useRefresh, useNotify } from 'react-admin'
import { Box, Button, CircularProgress } from '@mui/material'

import { useMutation, gql } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import CloudDoneIcon from '@mui/icons-material/CloudDone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

type Props = {}

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
`

const UPDATE_USER_IMAGE = gql`
   mutation updateUser($data: UserUpdateInput!, $where: UserWhereUniqueInput!) {
      updateUser(data: $data, where: $where) {
         id
      }
   }
`

let user_avatar_config_data: any = {
   'x-goog-meta-test': '',
   key: '',
   'x-goog-algorithm': '',
   'x-goog-credential': '',
   'x-goog-date': '',
   'x-goog-signature': '',
   policy: '',
}

const AvatarUrlField = (props: Props) => {
   const translate = useTranslate()
   const { id } = useParams()
   const refresh = useRefresh()
   const notify = useNotify()

   const [useravataruploaded, setuseravataruploaded] =
      React.useState<boolean>(false)
   const [useravatar, setuseravatar] = React.useState<any>()

   const [
      UpdateUser,
      {
         data: updateuserData,
         loading: updateuserLoading,
         error: updateuserError,
      },
   ] = useMutation(UPDATE_USER_IMAGE)

   const [uploadavatarImage, { data, loading, error }] =
      useMutation(UPLOAD_USER_POLICY)

   const saveavatarURLMutaiton = () => {
      UpdateUser({
         variables: {
            where: {
               id: id,
            },
            data: {
               avatarUrl: data?.singleImageUpload.mp3download_url,
            },
         },
      })
      notify('User Image Updated')
      refresh()
   }

   useEffect(() => {
      const uploadAImage = () => {
         const filename_data = new Date().getTime() + '-' + useravatar.name
         const filename = 'users' + '/' + 'avatars' + '/' + filename_data
         uploadavatarImage({
            variables: {
               imageName: filename,
               bType: 'djam_rn',
            },
         })
      }
      useravatar && uploadAImage()
   }, [useravatar])

   if (data !== undefined) {
      user_avatar_config_data = {
         'x-goog-meta-test': 'data',
         key: data?.singleImageUpload.key,
         'x-goog-algorithm': data?.singleImageUpload.x_goog_algorithm,
         'x-goog-credential': data?.singleImageUpload.x_goog_credential,
         'x-goog-date': data?.singleImageUpload.x_goog_date,
         'x-goog-signature': data?.singleImageUpload.x_goog_signature,
         policy: data?.singleImageUpload.policy,
      }
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
                     id="user_avatar"
                  >
                     {Object.keys(user_avatar_config_data).map((key) => (
                        <input
                           key={key}
                           name={key}
                           value={user_avatar_config_data[key]}
                           type="hidden"
                           id="urluseravatarid"
                        />
                     ))}
                     <p>
                        <Button
                           variant="outlined"
                           component="label"
                           size="small"
                           color="primary"
                           sx={{ borderRadius: 10 }}
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
                           Choose User Avatar
                           <input
                              type="file"
                              name="file"
                              accept="*"
                              hidden={true}
                              onChange={(
                                 e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                 if (e.target.files != null) {
                                    setuseravatar(e.target.files[0])

                                    const form: any =
                                       document.querySelector('#user_avatar')
                                    const input: any =
                                       document.querySelector(
                                          '#urluseravatarid'
                                       )
                                    setTimeout(() => {
                                       form.submit()
                                       setuseravataruploaded(true)
                                    }, 1000)
                                 }
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
                  saveavatarURLMutaiton()
               }}
               sx={{ borderRadius: 0.8 }}
            >
               Upload
            </Button>
         </Box>

         {/* {useravataruploaded ? (
        <p style={{ color: "green" }}>User Avatar Uploaded Successfully!</p>
      ) : (
        <>
          <p style={{ color: "red" }}>User Avatar Not Uploaded!</p>
        </>
      )} */}
      </>
   )
}

export default AvatarUrlField
