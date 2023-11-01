import * as React from 'react'
import {
   Edit,
   TextInput,
   SimpleForm,
   useTranslate,
   BooleanInput,
   NumberInput,
   ReferenceInput,
   AutocompleteInput,
   ArrayInput,
   SimpleFormIterator,
   SelectInput,
} from 'react-admin'
import { Box, Typography } from '@mui/material'

import Aside from './Aside'
import IdField from './IdField'
import { validateForm } from './HomesreenCreate'

const HomescreenEdit = () => {
   const translate = useTranslate()
   return (
      <Edit title={<VisitorTitle />}>
         <SimpleForm
            validate={validateForm}
            maxWidth={500}
            sx={{ mx: 2, my: 2 }}
         >
            <Typography
               variant="h4"
               gutterBottom
               color={'primary'}
               align="left"
               fontWeight={'900'}
            >
               {translate('resources.homescreens.fieldGroups.editHomescreen')}
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
            <NumberInput source="offset" fullWidth />
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
            <BooleanInput
               source="status"
               isRequired
               fullWidth
               color="primary"
            />
            <Separator />
            <NumberInput
               source="priority"
               multiline
               fullWidth
               isRequired
               helperText={false}
            />
            <TextInput
               source="contestId"
               multiline
               fullWidth
               helperText={false}
            />

            <Box mt="1em" />

            <Separator />
            <NumberInput source="limit" fullWidth isRequired />
            <Separator />
            <Box display={{ xs: 'block', sm: 'flex' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}></Box>
            </Box>

            <ArrayInput source="playlist">
               <SimpleFormIterator disableReordering={true} fullWidth>
                  <ReferenceInput
                     label="Playlists"
                     source="id"
                     reference="playlists"
                  >
                     <AutocompleteInput
                        optionText={(choices) => {
                           return `${choices.name} / ${choices.id}`
                        }}
                        optionValue="id"
                        fullWidth
                        noOptionsText="Playlist does'nt exist."
                     />
                  </ReferenceInput>
               </SimpleFormIterator>
            </ArrayInput>
         </SimpleForm>
      </Edit>
   )
}

const VisitorTitle = () => <IdField size="32" sx={{ margin: '5px 0' }} />

const SectionTitle = ({ label }: { label: string }) => {
   const translate = useTranslate()

   return (
      <Typography variant="button" gutterBottom>
         {translate(label as string)}
      </Typography>
   )
}

const Separator = () => <Box pt="1em" />

export default HomescreenEdit
