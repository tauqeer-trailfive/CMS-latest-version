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
   AutocompleteInput,
   ReferenceInput,
} from 'react-admin';
import { Box, Typography } from '@mui/material';

export const validateForm = (
   values: Record<string, any>
): Record<string, any> => {
   const errors = {} as any;
   if (!values.text) {
      errors.text = 'ra.validation.required';
   }
   return errors;
};

const EffectCreate = () => {
   const translate = useTranslate();
   return (
      <Create redirect="list">
         <SimpleForm
            sx={{ maxWidth: 500, mx: 2, my: 2 }}
            defaultValues={{
               text: '',
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
               {translate('resources.comments.fieldGroups.createComment')}
            </Typography>
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <TextInput source="text" isRequired fullWidth />
               </Box>
            </Box>
            <Separator />
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
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
                  <ReferenceInput
                     label="Project"
                     source="project.id"
                     reference="projects"
                     sort={{ field: 'publishedAt', order: 'DESC' }}
                     filter={{
                        role: ['SUPERADMIN', 'ADMIN', 'USER', 'ANON'],
                     }}
                  >
                     <AutocompleteInput
                        key="project"
                        optionText={(choice) =>
                           `${choice.name}  /  (${choice.id})`
                        }
                        optionValue="id"
                        noOptionsText="Project does'nt exist."
                        label="Project"
                     />
                  </ReferenceInput>
               </Box>
            </Box>
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

export default EffectCreate;
