import * as React from 'react';
import {
   Edit,
   TextInput,
   SimpleForm,
   ArrayInput,
   AutocompleteInput,
   BooleanInput,
   ChipField,
   ImageField,
   ReferenceInput,
   SimpleFormIterator,
} from 'react-admin';
import { Box, Typography } from '@mui/material';

import FullNameField from './IdField';
import { validateForm } from './GroupCreate';

const GroupEdit = () => {
   return (
      <Edit title={<VisitorTitle />} mutationMode="pessimistic">
         <SimpleForm validate={validateForm} maxWidth={500}>
            <Typography
               variant="h4"
               gutterBottom
               color={'primary'}
               align="left"
               fontWeight={'900'}
            >
               Edit Group
            </Typography>
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <TextInput source="name" isRequired fullWidth />
                     </Box>
                  </Box>
               </Box>
            </Box>
            <Separator />
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <TextInput
                           source="description"
                           isRequired
                           fullWidth
                           multiline
                           rows={5}
                        />
                     </Box>
                  </Box>
               </Box>
            </Box>
            <Separator />
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <ImageField source="avatarUrl" />
                     </Box>
                  </Box>
               </Box>
            </Box>
            <Separator />
            <BooleanInput source="isPublic" />
            <Separator />
            <ArrayInput source="members">
               <SimpleFormIterator disableReordering fullWidth>
                  <ChipField source="role" />
                  <ReferenceInput
                     label="User"
                     source="user.id"
                     reference="users"
                  >
                     <AutocompleteInput
                        source="id"
                        filterToQuery={(searchText) => ({
                           artistName: `${searchText}`,
                        })}
                        optionText={(choice) =>
                           `${choice.name}  /  (${choice.artistName})  /  (${choice.id})`
                        }
                        optionValue="id"
                        fullWidth
                     />
                  </ReferenceInput>
               </SimpleFormIterator>
            </ArrayInput>

            <Box mt="1em" />
         </SimpleForm>
      </Edit>
   );
};

const VisitorTitle = () => <FullNameField size="32" sx={{ margin: '5px 0' }} />;

const Separator = () => <Box pt="1em" />;

export default GroupEdit;
