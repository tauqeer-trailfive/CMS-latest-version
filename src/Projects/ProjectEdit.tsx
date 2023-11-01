import * as React from 'react';
import {
   Edit,
   TextInput,
   SimpleForm,
   useTranslate,
   NumberInput,
   SelectInput,
   useRecordContext,
   useInput,
   SimpleFormIterator,
   ReferenceInput,
   AutocompleteInput,
   BooleanInput,
   DateInput,
   SelectArrayInput,
   ArrayInput,
} from 'react-admin';
import { Grid, Box, Typography } from '@mui/material';
import { gql, useQuery, from } from '@apollo/client';
import Aside from './Aside';
import IdField from './IdField';
import { validateForm } from './ProjectCreate';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import PEMixdownscreenUploader from './PEMixdownscreenUploader/PEMixdownscreenUploader';

const GET_PROJECT_CATEGORIES = gql`
   query ProjectCategories {
      projectCategories {
         id
         name
      }
   }
`;

const ProjectEdit = () => {
   const translate = useTranslate();
   const { id } = useParams();

   const { data, loading, error } = useQuery(GET_PROJECT_CATEGORIES);

   //console.log("GET_PROJECT_CATEGORIES", data);

   const PCA = data?.projectCategories?.map((item, index) => {
      return { id: item?.id, name: item?.name };
   });

   const convertStringToNumber = (value) => {
      const float = parseFloat(value);
      return isNaN(float) ? null : float;
   };

   const ImageMedia = (props) => {
      const record = useRecordContext(props);

      return (
         <img
            src={record?.mixdownScreen}
            width="220"
            height="140"
            style={{
               maxWidth: '100%',
               height: 'auto',
               padding: 0,
               margin: 0,
               borderRadius: 10,
            }}
         />
      );
   };

   const VideoInput = (props) => {
      const record = useRecordContext(props);
      return (
         <video
            src={`${record.mixdownVideo}`}
            controls
            width="220"
            height="140"
            style={{
               maxWidth: '100%',
               height: 'auto',
               padding: 0,
               margin: 0,
               borderRadius: 10,
               marginBottom: 5,
            }}
         />
      );
   };

   const AudioInput = ({ source, label }) => {
      const { id, field, fieldState } = useInput({ source });
      return (
         <label htmlFor={id}>
            {label}
            {/* <input id={id} {...field}/> */}
            <audio id={id} {...field} src={field.value} controls />
            {fieldState.error && <span>{fieldState.error.message}</span>}
         </label>
      );
   };
   return (
      <Edit title={<ProjectTitle />}>
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
                           'resources.projects.fieldGroups.editProject'
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
                           <TextInput source="name" isRequired fullWidth />
                        </Box>
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                           <TextInput source="description" fullWidth />
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
                           <TextInput source="slug" fullWidth />
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

                     <Separator />

                     <Box
                        display={{
                           xs: 'block',
                           sm: 'flex',
                           width: '100%',
                        }}
                     >
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                           <ArrayInput source="genres">
                              <SimpleFormIterator
                                 disableReordering={true}
                                 source="genres"
                                 fullWidth
                              >
                                 <ReferenceInput
                                    label="genres"
                                    source="id"
                                    reference="genres"
                                 >
                                    <AutocompleteInput
                                       optionText={(choice) =>
                                          `${choice.name}  /  (${choice.id})`
                                       }
                                       optionValue="id"
                                       fullWidth
                                    />
                                 </ReferenceInput>
                              </SimpleFormIterator>
                           </ArrayInput>
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
                           <ArrayInput source="musicalInstruments">
                              <SimpleFormIterator
                                 disableReordering={true}
                                 source="musicalInstruments"
                                 fullWidth
                              >
                                 <ReferenceInput
                                    label="musicalInstruments"
                                    source="id"
                                    reference="musicalInstruments"
                                 >
                                    <AutocompleteInput
                                       optionText={(choice) =>
                                          `${choice.name}  /  (${choice.rank})  /  (${choice.id})`
                                       }
                                       optionValue="id"
                                       fullWidth
                                    />
                                 </ReferenceInput>
                              </SimpleFormIterator>
                           </ArrayInput>
                        </Box>
                     </Box>
                     <BooleanInput
                        source="private"
                        fullWidth
                        variant="filled"
                        color="primary"
                     />
                     <Separator />

                     <VideoInput source="mixdownVideo" />

                     <Box
                        display={{
                           xs: 'block',
                           sm: 'flex',
                           width: '100%',
                        }}
                     >
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                           <TextInput
                              source="mixdownVideo"
                              fullWidth
                              disabled
                           />
                        </Box>
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                           <TextInput
                              source="mixdownPath"
                              fullWidth
                              color="primary"
                              disabled
                           />
                        </Box>
                     </Box>

                     <AudioInput source="mixdownAudio" label={''} />

                     <Box
                        display={{
                           xs: 'block',
                           sm: 'flex',
                           width: '100%',
                        }}
                     >
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                           <TextInput
                              source="mixdownAudio"
                              fullWidth
                              disabled
                           />
                        </Box>
                     </Box>

                     <Separator />

                     <Box pt="1em" />
                     <Box display={{ xs: 'block', sm: 'flex' }}>
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                           <ImageMedia source="mixdownScreen" title="image" />
                        </Box>
                     </Box>
                     <Box display={{ xs: 'block', sm: 'flex' }}>
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                           <TextInput
                              source="mixdownScreen"
                              disabled
                              fullWidth
                              color="primary"
                           />
                        </Box>
                     </Box>

                     <PEMixdownscreenUploader ProjectId={id} />

                     <ArrayInput source="tracks">
                        <SimpleFormIterator disableReordering={true} fullWidth>
                           <ReferenceInput
                              label="Tracks"
                              source="id"
                              reference="tracks"
                           >
                              <AutocompleteInput
                                 optionText="id"
                                 optionValue="id"
                                 fullWidth
                              />
                           </ReferenceInput>
                        </SimpleFormIterator>
                     </ArrayInput>

                     <ArrayInput source="category">
                        <SimpleFormIterator disableReordering={true} fullWidth>
                           <TextInput source="name" fullWidth />
                        </SimpleFormIterator>
                     </ArrayInput>

                     <SelectArrayInput
                        label="Add Pre Defined Categories"
                        source="AddpreDefinedCatagories"
                        choices={loading ? [] : PCA}
                        optionText="name"
                        optionValue="name"
                        fullWidth
                        defaultValue={[]}
                     />

                     <Box
                        display={{
                           xs: 'block',
                           sm: 'flex',
                           width: '100%',
                        }}
                     >
                        <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                           <DateInput
                              source="availableFrom"
                              type="date"
                              defaultValue={new Date()}
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

const ProjectTitle = () => <IdField size="32" sx={{ margin: '5px 0' }} />;
const Separator = () => <Box pt="1em" />;

export default ProjectEdit;
