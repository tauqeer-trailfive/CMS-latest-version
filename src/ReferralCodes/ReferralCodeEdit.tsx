import * as React from 'react';
import {
   Edit,
   TextInput,
   SimpleForm,
   useTranslate,
   NumberInput,
   SelectInput,
} from 'react-admin';
import { Grid, Box, Typography } from '@mui/material';

import Aside from './Aside';
import IdField from './IdField';
import { validateForm } from './ReferralCodeCreate';

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
const ReferralCodeEdit = () => {
   const translate = useTranslate();
   return (
      <Edit title={<CodeTitle />}>
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
                           'resources.referralcode.fieldGroups.editReferralcode'
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
                           <TextInput source="code" isRequired fullWidth />
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
                           <TextInput
                              type="email"
                              source="email"
                              isRequired
                              fullWidth
                           />
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

const CodeTitle = () => <IdField size="32" sx={{ margin: '5px 0' }} />;

export default ReferralCodeEdit;
