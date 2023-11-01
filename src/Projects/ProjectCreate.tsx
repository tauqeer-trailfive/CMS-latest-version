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
   AutocompleteArrayInput,
   AutocompleteInput,
   BooleanInput,
   ReferenceArrayInput,
   ReferenceInput,
} from 'react-admin'
import { Badge, Box, Chip, Typography } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'

export const validateForm = (
   values: Record<string, any>
): Record<string, any> => {
   const errors = {} as any
   if (!values.name) {
      errors.name = 'ra.validation.required'
   }
   // if (!values.description) {
   //   errors.description = "ra.validation.required";
   // }
   // if (!values.slug) {
   //   errors.slug = "ra.validation.required";
   // }
   // if (!values.bpm) {
   //   errors.bpm = "ra.validation.required";
   // }
   // if (!values.mixdownVideo) {
   //   errors.mixdownVideo = "ra.validation.required";
   // }
   // if (!values.mixdownPath) {
   //   errors.mixdownPath = "ra.validation.required";
   // }
   // if (!values.owner.id) {
   //   errors.owner.id = "ra.validation.required";
   // }
   if (!values.tracks) {
      errors.tracks = 'ra.validation.required'
   }

   return errors
}

const ProjectCreate = () => {
   const translate = useTranslate()
   const convertStringToNumber = (value) => {
      const float = parseFloat(value)
      return isNaN(float) ? null : float
   }

   return (
      <Create redirect="list">
         <SimpleForm
            sx={{ maxWidth: 500, mx: 2, my: 2 }}
            defaultValues={{
               name: '',
               description: '',
               slug: '',
               mixdownVideo: '',
               mixdownPath: '',
               bpm: 0,
               private: false,
               tracks: '',
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
               {translate('resources.projects.fieldGroups.createProject')}
            </Typography>
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput source="name" isRequired fullWidth />
               </Box>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput source="description" fullWidth />
               </Box>
            </Box>
            <Separator />

            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <NumberInput
                     source="rating"
                     fullWidth
                     min={0}
                     max={5}
                     step={1}
                     parse={convertStringToNumber}
                  />
               </Box>
            </Box>

            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput source="slug" fullWidth />
               </Box>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <NumberInput source="bpm" fullWidth />
               </Box>
            </Box>
            <Separator />
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <ReferenceArrayInput
                     label="Genres"
                     source="genres"
                     reference="genres"
                     allowEmpty
                  >
                     <AutocompleteArrayInput
                        optionText="name"
                        optionValue="id"
                        noOptionsText="Genre does'nt exist."
                     />
                  </ReferenceArrayInput>
               </Box>
            </Box>
            <Separator />
            <Separator />
            <ReferenceArrayInput
               label="MusicalInstruments"
               source="musicalInstruments"
               reference="musicalInstruments"
               allowEmpty
            >
               <AutocompleteArrayInput
                  optionText={(choice) =>
                     `${choice.name}  /  (${choice.rank})  /  (${choice.id})`
                  }
                  optionValue="id"
                  fullWidth
                  noOptionsText="Musical Instrument does'nt exist."
               />
            </ReferenceArrayInput>
            <Separator />
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput source="mixdownVideo" fullWidth />
               </Box>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput source="mixdownPath" fullWidth />
               </Box>
            </Box>
            <Separator />
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput source="mixdownScreen" fullWidth />
               </Box>
            </Box>
            <Separator />

            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <Box
                     display={{ xs: 'block', sm: 'flex', width: '100%' }}
                     gap={1}
                  >
                     <Chip
                        label="Here, Owner is required Field."
                        variant="outlined"
                        icon={
                           <Badge color="warning">
                              <InfoIcon color="warning" />
                           </Badge>
                        }
                     />
                  </Box>
                  <ReferenceInput
                     label="User"
                     source="owner.id"
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
                        noOptionsText="Owner does'nt exist."
                        label="Owner"
                     />
                  </ReferenceInput>
               </Box>
            </Box>

            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <ReferenceArrayInput
                     label="Tracks"
                     source="tracks"
                     reference="tracks"
                     allowEmpty
                     perPage={50}
                  >
                     <AutocompleteArrayInput
                        optionText="id"
                        optionValue="id"
                        noOptionsText="Track does'nt exist."
                     />
                  </ReferenceArrayInput>
               </Box>
            </Box>
            <BooleanInput
               source="private"
               fullWidth
               variant="filled"
               color="primary"
            />
         </SimpleForm>
      </Create>
   )
}

const SectionTitle = ({ label }: { label: string }) => {
   const translate = useTranslate()

   return (
      <Typography variant="h6" gutterBottom>
         {translate(label as string)}
      </Typography>
   )
}

const Separator = () => <Box pt="1em" />

export default ProjectCreate
