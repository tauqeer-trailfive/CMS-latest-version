import * as React from 'react'
import {
   DateInput,
   Edit,
   NullableBooleanInput,
   TextInput,
   PasswordInput,
   SimpleForm,
   useTranslate,
   SelectInput,
   NumberInput,
   useRefresh,
   useNotify,
   useInput,
} from 'react-admin'
import { Grid, Box, Typography, Button } from '@mui/material'

import { useMutation, gql } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import CloudDoneIcon from '@mui/icons-material/CloudDone'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

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

const UPDATE_BPM_AUDIO_FILE = gql`
   mutation updateBpm($data: BpmUpdateInput, $where: BpmWhereUniqueInput) {
      updateBpm(data: $data, where: $where) {
         id
      }
   }
`

let config_data_audio = {
   'x-goog-meta-test': '',
   key: '',
   'x-goog-algorithm': '',
   'x-goog-credential': '',
   'x-goog-date': '',
   'x-goog-signature': '',
   policy: '',
}

type Props = {
   BPMId: any
}

const BPMEAUDIOUploaders = (props: Props) => {
   const translate = useTranslate()
   const { id } = useParams()
   const refresh = useRefresh()
   const notify = useNotify()

   const [mp3file, setmp3file] = React.useState<any>()
   const [audiofile, setaudiofile] = React.useState<any>()

   const [mp3uploaded, setmp3uploaded] = React.useState<boolean>(false)
   const [audiouploaded, setaudiouploaded] = React.useState<boolean>(false)

   const [
      uploadAudioFile,
      { data: AudioData, loading: AudioLoading, error: AudioError },
   ] = useMutation(POLICY)

   const [
      updateBpmFile,
      { data: updatebpmData, loading: updatebpmLoading, error: updatebpmError },
   ] = useMutation(UPDATE_BPM_AUDIO_FILE)

   useEffect(() => {
      const uploadAudioImage = () => {
         const filename = new Date().getTime() + '-' + audiofile.name
         uploadAudioFile({
            variables: {
               imageName: filename,
               bType: 'image-compression',
            },
         })
         localStorage.setItem
      }
      audiofile && uploadAudioImage()
   }, [audiofile])

   if (AudioData !== undefined) {
      config_data_audio = {
         'x-goog-meta-test': 'data',
         key: AudioData?.singleImageUpload.key,
         'x-goog-algorithm': AudioData?.singleImageUpload.x_goog_algorithm,
         'x-goog-credential': AudioData?.singleImageUpload.x_goog_credential,
         'x-goog-date': AudioData?.singleImageUpload.x_goog_date,
         'x-goog-signature': AudioData?.singleImageUpload.x_goog_signature,
         policy: AudioData?.singleImageUpload.policy,
      }
   }

   const saveaudioMutaiton = () => {
      updateBpmFile({
         variables: {
            data: {
               audioUrl: AudioData?.singleImageUpload.mp3download_url,
            },
            where: {
               id: props.BPMId,
            },
         },
      })
      notify('resources.bpms.fields.audiochanged')
      refresh()
   }
   return (
      <>
         <Box>
            <Box
               display={{ xs: 'block', sm: 'flex' }}
               sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}
            >
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <div>
                     <form
                        action="https://storage.googleapis.com/image-compression/"
                        method="POST"
                        encType="multipart/form-data"
                        id="audio_file"
                     >
                        {Object.keys(config_data_audio).map((key) => (
                           <input
                              key={key}
                              name={key}
                              value={config_data_audio[key]}
                              type="hidden"
                              id="urlaudioid"
                           />
                        ))}
                        <p>
                           <Button
                              variant="outlined"
                              component="label"
                              size="small"
                              color="primary"
                              sx={{ borderRadius: 0.2 }}
                              startIcon={
                                 audiouploaded ? (
                                    <CloudDoneIcon color="success" />
                                 ) : (
                                    <CloudUploadIcon />
                                 )
                              }
                           >
                              Choose Audio for BPM(Tempo)
                              <input
                                 type="file"
                                 name="file"
                                 accept=".mp3"
                                 hidden={true}
                                 onChange={(
                                    e: React.ChangeEvent<HTMLInputElement>
                                 ) => {
                                    if (e.target.files != null) {
                                       setaudiofile(e.target.files[0])
                                       const form: any =
                                          document.querySelector('#audio_file')
                                       const input: any =
                                          document.querySelector('#urlaudioid')
                                       setTimeout(() => {
                                          form.submit()
                                          setaudiouploaded(true)
                                       }, 1000)
                                    }
                                    1
                                 }}
                              />
                           </Button>
                        </p>

                        {/* {audiouploaded ? (
                    <p style={{ color: "green" }}>
                      Contest Image Uploaded Successfully!
                    </p>
                  ) : (
                    <p style={{ color: "red" }}>Contest Image Not Uploaded!</p>
                  )} */}
                     </form>
                  </div>
               </Box>
               <Button
                  variant="outlined"
                  component="label"
                  size="small"
                  color="primary"
                  onClick={() => {
                     saveaudioMutaiton()
                  }}
                  sx={{ borderRadius: 0.2 }}
               >
                  Upload
               </Button>
            </Box>
            {audiouploaded ? (
               <p style={{ color: 'green' }}>
                  Contest Image Uploaded Successfully!
               </p>
            ) : (
               <>
                  {/* <p style={{ color: "red" }}>Contest Image Not Uploaded!</p> */}
               </>
            )}

            <Box pt="3em" />
         </Box>
      </>
   )
}

export default BPMEAUDIOUploaders
