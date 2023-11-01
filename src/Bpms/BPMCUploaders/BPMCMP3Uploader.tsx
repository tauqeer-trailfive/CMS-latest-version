import * as React from 'react'
import {
   Create,
   DateInput,
   SimpleForm,
   TextInput,
   useTranslate,
   PasswordInput,
   email,
   SelectInput,
   NumberInput,
} from 'react-admin'
import { Box, Button, Typography } from '@mui/material'
import { useMutation, gql } from '@apollo/client'
import CloudDoneIcon from '@mui/icons-material/CloudDone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'
import { useEffect } from 'react'

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
`

let config_data_mp3 = {
   'x-goog-meta-test': '',
   key: '',
   'x-goog-algorithm': '',
   'x-goog-credential': '',
   'x-goog-date': '',
   'x-goog-signature': '',
   policy: '',
}

let config_data_audio = {
   'x-goog-meta-test': '',
   key: '',
   'x-goog-algorithm': '',
   'x-goog-credential': '',
   'x-goog-date': '',
   'x-goog-signature': '',
   policy: '',
}
type Props = {}

const BPMCMP3Uploader = (props: Props) => {
   const translate = useTranslate()

   const [mp3fileurl, setmp3fileurl] = React.useState<any>()
   const [mp3fileupload, setmp3fileupload] = React.useState<any>(false)
   const [uploadedmp3, setuploadedmp3] = React.useState<boolean>(false)
   const [uploadBPMMp3File, { data, loading, error }] = useMutation(POLICY)

   useEffect(() => {
      const uploadmp3File = () => {
         const filename = new Date().getTime() + '-' + mp3fileurl.name
         uploadBPMMp3File({
            variables: {
               imageName: filename,
               bType: 'image-compression',
            },
         })
      }
      mp3fileurl && uploadmp3File()
   }, [mp3fileurl])

   if (data !== null) {
      config_data_mp3 = {
         'x-goog-meta-test': 'data',
         key: data?.singleImageUpload.key,
         'x-goog-algorithm': data?.singleImageUpload.x_goog_algorithm,
         'x-goog-credential': data?.singleImageUpload.x_goog_credential,
         'x-goog-date': data?.singleImageUpload.x_goog_date,
         'x-goog-signature': data?.singleImageUpload.x_goog_signature,
         policy: data?.singleImageUpload.policy,
      }

      if (mp3fileupload) {
         localStorage.setItem(
            'bpmmp3file',
            data?.singleImageUpload.mp3download_url
         )
      }
   }

   return (
      <>
         <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
               <div>
                  <form
                     action="https://storage.googleapis.com/image-compression/"
                     method="POST"
                     encType="multipart/form-data"
                     id="mp3_file"
                  >
                     {Object.keys(config_data_mp3).map((key) => (
                        <input
                           key={key}
                           name={key}
                           value={config_data_mp3[key]}
                           type="hidden"
                           id="urlmp3fileid"
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
                              uploadedmp3 ? (
                                 <CloudDoneIcon color="success" />
                              ) : (
                                 <CloudUploadIcon />
                              )
                           }
                        >
                           BPM MP3 File
                           <input
                              type="file"
                              name="file"
                              accept=".mp3"
                              hidden={true}
                              onChange={(
                                 e: React.ChangeEvent<HTMLInputElement>
                              ) => {
                                 if (e.target.files != null) {
                                    setmp3fileurl(e.target.files[0])
                                    setmp3fileupload(true)
                                    const form: any =
                                       document.querySelector('#mp3_file')
                                    const input: any =
                                       document.querySelector('#urlmp3fileid')
                                    setTimeout(() => {
                                       form.submit()
                                       setuploadedmp3(true)
                                    }, 1000)
                                 }
                                 1
                              }}
                           />
                        </Button>
                     </p>
                  </form>
               </div>
            </Box>
         </Box>

         {uploadedmp3 ? (
            <p style={{ color: 'green' }}>Mp3 File Uploaded Successfully!</p>
         ) : (
            <>{/* <p style={{ color: "red" }}>Mp3 File Not Uploaded!</p> */}</>
         )}
      </>
   )
}

export default BPMCMP3Uploader
