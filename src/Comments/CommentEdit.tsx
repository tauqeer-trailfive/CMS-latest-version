import * as React from 'react';
import {
   Edit,
   TextInput,
   SimpleForm,
   useTranslate,
   NumberInput,
   SelectInput,
   AutocompleteInput,
   ReferenceInput,
} from 'react-admin';
import { Grid, Box, Typography } from '@mui/material';

import Aside from './Aside';
import IdField from './IdField';
import { validateForm } from './CommentCreate';

const typesofEffects = [
   { id: 'DELAYBPM', name: 'DELAYBPM' },
   { id: 'DELAY', name: 'DELAY' },
   { id: 'REVERB', name: 'REVERB' },
   { id: 'EQUALIZER', name: 'EQUALIZER' },
   { id: 'COMPRESSOR', name: 'COMPRESSOR' },
   {
      id: 'COMPRESSORMASTERBUS',
      name: 'COMPRESSORMASTERBUS',
   },
   { id: 'LIMITER', name: 'LIMITER' },
];
const CommentEdit = () => {
   const translate = useTranslate();
   return (
      <Edit title={<CommentTitle />}>
         <SimpleForm validate={validateForm} sx={{ mx: 2, my: 2 }}>
            <div>
               <Grid container width={{ xs: '100%', xl: 800 }} spacing={2}>
                  <Grid item xs={12} md={8}>
                     <Typography
                        variant="h4"
                        gutterBottom
                        color={'primary'}
                        align="left"
                        fontWeight={'800'}
                     >
                        {translate(
                           'resources.comments.fieldGroups.editComment'
                        )}
                     </Typography>
                     <Box
                        display={{
                           xs: 'block',
                           sm: 'flex',
                           width: '100%',
                        }}
                     >
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                           <TextInput source="text" isRequired fullWidth />
                        </Box>
                     </Box>
                     <Separator />
                     <Box
                        display={{
                           xs: 'block',
                           sm: 'flex',
                           width: '100%',
                        }}
                     >
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
                     <Box
                        display={{
                           xs: 'block',
                           sm: 'flex',
                           width: '100%',
                        }}
                     >
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                           <ReferenceInput
                              label="Project"
                              source="project.id"
                              reference="projects"
                              sort={{
                                 field: 'publishedAt',
                                 order: 'DESC',
                              }}
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
                     <Box mt="1em" />
                  </Grid>
                  <Grid item xs={12} md={4}></Grid>
               </Grid>
            </div>
         </SimpleForm>
      </Edit>
   );
};

const CommentTitle = () => <IdField size="32" sx={{ margin: '5px 0' }} />;
const Separator = () => <Box pt="1em" />;

export default CommentEdit;
