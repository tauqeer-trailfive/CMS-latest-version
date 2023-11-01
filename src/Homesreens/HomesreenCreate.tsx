import * as React from 'react'
import {
   Create,
   SimpleForm,
   TextInput,
   useTranslate,
   SelectInput,
   NumberInput,
   AutocompleteArrayInput,
   BooleanInput,
   ReferenceArrayInput,
} from 'react-admin'
import { Box, Typography } from '@mui/material'
import { gql, useQuery } from '@apollo/client'

export const validateForm = (
   values: Record<string, any>
): Record<string, any> => {
   const errors = {} as any
   if (!values.title) {
      errors.title = 'ra.validation.required'
   }
   if (!values.type) {
      errors.type = 'ra.validation.required'
   }
   if (!values.priority) {
      errors.priority = 'ra.validation.required'
   }
   if (!values.limit) {
      errors.limit = 'ra.validation.required'
   }
   return errors
}

const HomesreenCreate = () => {
   const translate = useTranslate()
   return (
      <Create redirect="list">
         <SimpleForm
            sx={{ maxWidth: 500, mx: 2, my: 2 }}
            defaultValues={{
               title: '',
               type: '',
               status: true,
               priority: 0,
               limit: 0,
               user: '',
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
               {translate('resources.homescreens.fieldGroups.createHomescreen')}
            </Typography>
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput source="title" isRequired fullWidth />
               </Box>
            </Box>

            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput
                     source="description"
                     multiline
                     isRequired
                     fullWidth
                     rows={5}
                  />
               </Box>
            </Box>
            <NumberInput fullWidth source="offset" />
            <SelectInput
               source="visibility"
               isRequired
               fullWidth
               choices={[
                  { id: 'PUBLIC', name: 'PUBLIC' },
                  { id: 'PRIVATE', name: 'PRIVATE' },
                  { id: 'HIDDEN', name: 'HIDDEN' },
               ]}
            />
            <TextInput
               source="type"
               multiline
               isRequired
               fullWidth
               helperText={false}
            />
            <Separator />
            <TextInput
               source="contestId"
               multiline
               fullWidth
               helperText={false}
            />
            <BooleanInput source="status" fullWidth color="primary" />
            <NumberInput source="limit" isRequired fullWidth />
            <Separator />
            <NumberInput
               source="priority"
               multiline
               isRequired
               fullWidth
               helperText={false}
            />
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <ReferenceArrayInput
                     label="Playlists"
                     source="playlists"
                     reference="playlists"
                     allowEmpty
                  >
                     <AutocompleteArrayInput
                        optionText={(choice) =>
                           `${choice.name} / (${choice.id})`
                        }
                        optionValue="id"
                        noOptionsText="Playlist does'nt exist."
                     />
                  </ReferenceArrayInput>
               </Box>
            </Box>
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

export default HomesreenCreate
