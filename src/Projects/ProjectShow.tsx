import * as React from 'react';
import {
   Box,
   Card,
   CardContent,
   Grid,
   Rating,
   Slider,
   Typography,
} from '@mui/material';
import {
   ReferenceField,
   TextField,
   useRecordContext,
   List,
   ArrayField,
   ChipField,
   useInput,
   useTranslate,
   useRefresh,
} from 'react-admin';
import { Stack, Chip } from '@mui/material';
import { Project } from '../types';
import { gql, useMutation } from '@apollo/client';

const UPDATE_PROJECT = gql`
   mutation UpdateProject(
      $where: ProjectWhereUniqueInput!
      $data: ProjectUpdateInput!
   ) {
      updateProject(where: $where, data: $data) {
         id
      }
   }
`;

const labels: { [index: string]: string } = {
   1: 'Poor',

   2: 'Fair',

   3: 'Good',

   4: 'Very Good',

   5: 'Excellent',
};

function getLabelText(value: number) {
   return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

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

const AudioInput = (props) => {
   const record = useRecordContext(props);
   return <audio src={record.mixdownAudio} controls />;
};

const InputSlider = (props) => {
   const record = useRecordContext(props);
   const refresh = useRefresh();
   const [value, setValue] = React.useState<number | null>(2);
   const [hover, setHover] = React.useState(-1);

   const [updateProjectRating, { data, loading, error }] =
      useMutation(UPDATE_PROJECT);

   React.useEffect(() => {
      refresh();
      return () => {};
   }, [data]);

   return (
      <>
         <Rating
            name="simple-controlled"
            defaultValue={record.rating}
            getLabelText={getLabelText}
            max={5}
            size="medium"
            onChange={(e, value) => {
               updateProjectRating({
                  variables: {
                     where: {
                        id: record.id,
                     },
                     data: {
                        rating: value,
                     },
                  },
               });
            }}
            onChangeActive={(event, newHover) => {
               setHover(newHover);
            }}
         />
         {value && record.rating !== null && (
            <Box sx={{ ml: 2 }}>
               {labels[hover !== -1 ? hover : record.rating]}
            </Box>
         )}
      </>
   );
};

const ProjectShow = () => {
   const record = useRecordContext<Project>();

   if (!record) return null;
   const ratingValues = [
      { lable: '1', value: 1 },
      { lable: '2', value: 2 },
      { lable: '3', value: 3 },
      { lable: '4', value: 4 },
      { lable: '5', value: 5 },
   ];

   return (
      <Card
         sx={{
            margin: 'auto',
            boxShadow: 4,
            padding: 5,
            borderRadius: 1,
            // border: "1px solid #909090",
            width: 'auto',
            mx: 20,
            my: 1,
         }}
      >
         <CardContent>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Typography
                     variant="h5"
                     gutterBottom
                     align="center"
                     fontWeight={'900'}
                  >
                     {record.name}
                  </Typography>
               </Grid>
            </Grid>
            <Grid container spacing={2} textAlign="center">
               <Grid item xs={12}>
                  <VideoInput source="mixdownVideo" />
               </Grid>
            </Grid>
            <Grid container spacing={2} textAlign="center">
               <Grid item xs={12}>
                  <AudioInput source="mixdownAudio" />
               </Grid>
            </Grid>
            <Box height={20}>&nbsp;</Box>
            <Grid container spacing={2}>
               <Grid item xs={6}>
                  <Typography
                     variant="h6"
                     gutterBottom
                     align="center"
                     fontWeight={'400'}
                  >
                     Created Date{' '}
                  </Typography>
                  <Typography
                     variant="h6"
                     gutterBottom
                     align="center"
                     fontWeight={'100'}
                  >
                     {record.createdAt}
                  </Typography>
               </Grid>

               <Grid item xs={6}>
                  <Typography
                     variant="h6"
                     gutterBottom
                     align="center"
                     fontWeight={'400'}
                  >
                     Slug
                  </Typography>
                  <Typography
                     variant="h6"
                     gutterBottom
                     align="center"
                     fontWeight={'100'}
                  >
                     {record.slug}
                  </Typography>
               </Grid>
            </Grid>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Typography
                     variant="h6"
                     gutterBottom
                     align="center"
                     fontWeight={'100'}
                  >
                     Project Category
                  </Typography>
                  {record.category.map((item, index) => {
                     return (
                        <>
                           <Box
                              sx={{
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center',
                                 my: 1,
                              }}
                           >
                              <Chip label={item.name} />
                           </Box>
                        </>
                     );
                  })}
               </Grid>
            </Grid>
            <Box margin="10px 0">
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <Typography
                        variant="h6"
                        gutterBottom
                        align="center"
                        fontWeight={'100'}
                     >
                        Rating
                     </Typography>
                     <Box
                        sx={{
                           display: 'flex',
                           alignItems: 'center',
                           justifyContent: 'center',
                           flexDirection: 'column',
                           my: 1,
                        }}
                     >
                        <InputSlider source="rating" />
                     </Box>
                  </Grid>
               </Grid>

               {/* <Stack direction="row" gap={1} flexWrap="wrap">
                    {record.tracks.map(track => (
                        <Chip key={track.id} label={track.name} />
                    ))}
                    </Stack>   */}

               {/* {record.tracks.map(track => (
                    <ArrayField source={track}>
                                
                        </ArrayField>     
                    )
                    )
                    }         */}
            </Box>
         </CardContent>
      </Card>
   );
};

export default ProjectShow;
