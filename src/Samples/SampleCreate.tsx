import * as React from 'react'
import {
   Create,
   SimpleForm,
   TextInput,
   useTranslate,
   PasswordInput,
   email,
   SelectInput,
   NumberInput,
   AutocompleteInput,
   ReferenceInput,
   useNotify,
} from 'react-admin'
import {
   Box,
   Button,
   IconButton,
   LinearProgress,
   Typography,
} from '@mui/material'
import { gql, useMutation } from '@apollo/client'
import CloudDoneIcon from '@mui/icons-material/CloudDone'
import DriveFolderUploadTwoToneIcon from '@mui/icons-material/DriveFolderUploadTwoTone'
import SamplesUploaded from './SamplesUploaded'
import axios from 'axios'

export const validateForm = (
   values: Record<string, any>
): Record<string, any> => {
   const errors = {} as any
   if (!values.name) {
      errors.name = 'ra.validation.required'
   }
   if (!values.format) {
      errors.format = 'ra.validation.required'
   }
   // if (!values.samplerate) {
   //   errors.samplerate = "ra.validation.required";
   // }
   // if (!values.instrument) {
   //   errors.instrument = "ra.validation.required";
   // }
   if (!values.name) {
      errors.name = 'ra.validation.required'
   }
   return errors
}

let config_data_bpms: any = {
   'x-goog-meta-test': '',
   key: '',
   'x-goog-algorithm': '',
   'x-goog-credential': '',
   'x-goog-date': '',
   'x-goog-signature': '',
   policy: '',
}

const SampleCreate = () => {
   const translate = useTranslate()
   const notify = useNotify()
   let finalArrayDATA: any[] = []
   const [filesSuccess, setFilesSuccess] = React.useState<any>()
   const [ShowLoaders, setShowLoaders] = React.useState(false)

   const [filesSelected, setFilesSelected] = React.useState<any>()

   const [bpmFiles, setBpmFiles] = React.useState<any>([
      {
         value: 0,
         audioUrl: '',
         mp3Url: '',
      },
   ])

   const [uploadedAudio, setuploadedAudio] = React.useState<boolean>(false)
   const [uploadedMp3, setuploadedMp3] = React.useState<boolean>(false)

   const UPLOAD_SAMPLE_IMAGE = gql`
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

   const [uploadSampleImage, { data, loading, error }] =
      useMutation(UPLOAD_SAMPLE_IMAGE)

   React.useEffect(() => {}, [bpmFiles])
   let stateData

   const uploadFile = async (index: number, key: string, filename: string) => {
      const finalFilename = new Date().getTime() + '-' + filename
      const response = await uploadSampleImage({
         variables: {
            imageName: finalFilename,
            bType: 'image-compression',
         },
      })

      const url = response?.data?.singleImageUpload?.mp3download_url
      stateData = JSON.parse(JSON.stringify(bpmFiles))
      stateData[index][key] = url
      //console.log(stateData);
      setBpmFiles(stateData)
   }

   React.useEffect(() => {
      localStorage.removeItem('BPM_DATA')
      localStorage.setItem('BPM_DATA', JSON.stringify(filesSuccess))
   }, [filesSuccess])

   if (data !== null) {
      config_data_bpms = {
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
      <Create redirect="list">
         <SimpleForm
            sx={{ maxWidth: 500, mx: 2, my: 2 }}
            defaultValues={{
               name: '',
               format: '',
               samplerate: 0,
               bpm: 0,
               url: '',
               mp3Url: '',
               instrument: null,
               sets: null,
            }}
            validate={validateForm}
         >
            <Typography
               variant="h4"
               gutterBottom
               color={'primary'}
               align="left"
               fontWeight={'900'}
            >
               {translate('resources.samples.fieldGroups.createSample')}
            </Typography>

            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput source="name" fullWidth isRequired />
               </Box>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <SelectInput
                     source="format"
                     fullWidth
                     isRequired
                     choices={[
                        { id: 'WAV', name: 'WAV' },
                        { id: 'FLAC', name: 'FLAC' },
                        { id: 'MP3_128', name: 'MP3_128' },
                        { id: 'MP3_256', name: 'MP3_256' },
                        { id: 'MP3_512', name: 'MP3_512' },
                        { id: 'OGG', name: 'OGG' },
                     ]}
                  />
               </Box>
            </Box>
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <ReferenceInput
                     label="User"
                     source="createdBy.id"
                     reference="users"
                     filter={{
                        role: ['SUPERADMIN', 'ADMIN', 'USER', 'ANON'],
                     }}
                  >
                     <AutocompleteInput
                        optionText={(choice) =>
                           `${choice.name}  /  (${choice.artistName})  /  (${choice.id})`
                        }
                        optionValue="id"
                        fullWidth
                        label="Select User"
                     />
                  </ReferenceInput>
               </Box>
            </Box>

            <Separator />
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <NumberInput source="samplerate" fullWidth isRequired />
               </Box>
            </Box>

            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <SelectInput
                     source="instrument"
                     label="Select Instrument"
                     fullWidth
                     isRequired
                     choices={[
                        { id: 'DRUMS', name: 'DRUMS' },
                        { id: 'BEATS', name: 'BEATS' },
                        { id: 'BASS', name: 'BASS' },
                        { id: 'CHORDS', name: 'CHORDS' },
                     ]}
                  />
               </Box>
            </Box>
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <ReferenceInput
                     label="Genre"
                     source="genre.id"
                     reference="genres"
                     isRequired
                  >
                     <AutocompleteInput
                        optionText={(choice) =>
                           `${choice.name}  /  (${choice.id})`
                        }
                        optionValue="id"
                        label="Select Genre"
                        noOptionsText="Genre does'nt exist."
                     />
                  </ReferenceInput>
               </Box>
            </Box>
            <Box
               display={{ xs: 'block', sm: 'flex', width: '100%' }}
               sx={{
                  // boxShadow: 4,
                  padding: 2,
                  marginBottom: 3,
                  borderRadius: 0.4,
                  border: '',
               }}
            >
               <div className="form-group files">
                  <SectionTitle label="resources.bpms.fields.name" />
                  {/* <label>Upload Your OGGS </label> */}
                  <br />
                  <Button
                     variant="text"
                     component="label"
                     size="small"
                     color="primary"
                     sx={{ borderRadius: 0, px: 3 }}
                     startIcon={<CloudDoneIcon color="primary" />}
                  >
                     <input
                        type="file"
                        hidden={true}
                        accept="audio/ogg, audio/*"
                        className="form-control"
                        multiple={true}
                        onChange={(e: any) => {
                           //console.log(e.target?.files);
                           setFilesSelected(e.target?.files)
                        }}
                     />
                     Choose OGGs
                  </Button>
                  <IconButton
                     color="primary"
                     aria-label="Upload"
                     size="large"
                     title="Upload"
                     onClick={() => {
                        const data = new FormData()
                        for (var x = 0; x < filesSelected.length; x++) {
                           data.append('file', filesSelected[x])
                        }
                        setShowLoaders(false)
                        setShowLoaders(true)
                        axios
                           .put('https://play.djaminn.com/uploadFiles', data)
                           .then((res) => {
                              const finalArray = res?.data?.map(
                                 (item, index) => {
                                    let initalFileName = item.filename
                                    const match = initalFileName.match(/\d+/)
                                    const firstThreeNumbers = match
                                       ? match[0].slice(0, 3)
                                       : null
                                    return {
                                       value: parseInt(firstThreeNumbers),
                                       audioUrl: item.fileUrl,
                                       originalName: item.filename,
                                    }
                                 }
                              )

                              setFilesSuccess(finalArray)
                              if (filesSuccess) {
                                 setShowLoaders(false)
                              }
                           })
                           .catch((error) => {
                              notify(`${error.message}`)
                           })
                     }}
                  >
                     <DriveFolderUploadTwoToneIcon />
                  </IconButton>
               </div>
            </Box>

            {filesSuccess
               ? filesSuccess.map(
                    ({ value, audioUrl, originalName }, index) => {
                       return (
                          <Box
                             display={{
                                xs: 'block',
                                sm: 'flex',
                                width: '100%',
                             }}
                             sx={{
                                flexDirection: 'column',
                                boxShadow: 4,
                                padding: 2,
                                marginBottom: 3,
                                borderRadius: 0.4,
                                border: '',
                                justifyContent: 'center',
                             }}
                          >
                             <SamplesUploaded
                                key={index}
                                audioUrl={audioUrl}
                                fileName={originalName}
                                value={value}
                                BPMNO={index + 1}
                             />
                          </Box>
                       )
                    }
                 )
               : ShowLoaders && (
                    <Box
                       display={{
                          xs: 'block',
                          sm: 'flex',
                          width: '100%',
                       }}
                       sx={{
                          flexDirection: 'column',
                          boxShadow: 4,
                          padding: 2,
                          marginBottom: 3,
                          borderRadius: 0.4,
                          border: '',
                       }}
                    >
                       <LinearProgress color="primary" />
                    </Box>
                 )}
         </SimpleForm>
      </Create>
   )
}

const SectionTitle = ({ label }: { label: string }) => {
   const translate = useTranslate()

   return (
      <Typography variant="h6" gutterBottom color={'pink'}>
         {translate(label as string)}
      </Typography>
   )
}

const Separator = () => <Box pt="1em" />

export default SampleCreate
