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
} from 'react-admin'
import { Box, Typography } from '@mui/material'
import BPMCAUDIOUploader from './BPMCUploaders/BPMCAUDIOUploader'

export const validateForm = (
   values: Record<string, any>
): Record<string, any> => {
   const errors = {} as any
   if (!values.value) {
      errors.value = 'ra.validation.required'
   }
   return errors
}

const BpmsCreate = () => {
   const translate = useTranslate()
   return (
      <Create redirect="list">
         <SimpleForm
            sx={{ maxWidth: 500, mx: 2, my: 2 }}
            defaultValues={{
               value: '',
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
               {translate('resources.bpms.fieldGroups.CreateBpm')}
            </Typography>
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <NumberInput source="value" isRequired fullWidth />
               </Box>
            </Box>
            <SectionTitle label="resources.bpms.fields.audiofile" />
            <BPMCAUDIOUploader />
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

export default BpmsCreate
