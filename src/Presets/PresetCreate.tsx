import * as React from 'react';
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
   ReferenceArrayInput,
} from 'react-admin';
import { Box, Typography } from '@mui/material';

export const validateForm = (
   values: Record<string, any>
): Record<string, any> => {
   const errors = {} as any;
   if (!values.name) {
      errors.name = 'ra.validation.required';
   }
   if (!values.category) {
      errors.category = 'ra.validation.required';
   }
   return errors;
};

const PresetCreate = () => {
   const translate = useTranslate();
   return (
      <Create redirect="list">
         <SimpleForm
            sx={{ maxWidth: 500, mx: 2, my: 2 }}
            defaultValues={{
               name: '',
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
               {translate('resources.presets.fieldGroups.createPreset')}
            </Typography>
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput source="name" isRequired fullWidth />
               </Box>
            </Box>
            <SelectInput
               source="category"
               isRequired
               fullWidth
               choices={[
                  { id: 'GUITAR', name: 'GUITAR' },
                  { id: 'BASS', name: 'BASS' },
                  { id: 'DRAMM', name: 'DRAMM' },
                  { id: 'UKULELE', name: 'UKULELE' },
                  { id: 'MASTERBUS', name: 'MASTERBUS' },
               ]}
            />

            <ReferenceArrayInput
               label="Effects (Search by Name)"
               source="effects"
               reference="effects"
               allowEmpty
            >
               <AutocompleteArrayInput
                  optionText={(choice) =>
                     `${choice.name}  /  ${choice.typeOfEffect}  /  (${choice.id})`
                  }
                  optionValue="id"
                  id="id"
                  fullWidth
                  label="Effect"
                  noOptionsText="Effect does'nt exist."
               />
            </ReferenceArrayInput>
         </SimpleForm>
      </Create>
   );
};

const SectionTitle = ({ label }: { label: string }) => {
   const translate = useTranslate();

   return (
      <Typography variant="h6" gutterBottom>
         {translate(label as string)}
      </Typography>
   );
};

const Separator = () => <Box pt="1em" />;

export default PresetCreate;
