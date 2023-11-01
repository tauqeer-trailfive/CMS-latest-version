import * as React from 'react';
import { Card, CardContent } from '@mui/material';
import CloudSyncTwoToneIcon from '@mui/icons-material/CloudSyncTwoTone';
import SaveQueryIcon from '@mui/icons-material/BookmarkAddedRounded';
import {
   Button,
   FilterLiveSearch,
   SavedQueriesList,
   useNotify,
} from 'react-admin';
import { gql, useMutation } from '@apollo/client';

const SamplesListAside = () => {
   const Syncronize_WATCH_FOLDER = gql`
      mutation Mutation {
         createSamplesFromWatchFolder
      }
   `;

   const notify = useNotify();
   const [mutateWatchFolder, { data, loading, error }] = useMutation(
      Syncronize_WATCH_FOLDER
   );

   const memoizedNotify = React.useCallback(
      (data) => {
         if (data) {
            notify(`${data.createSamplesFromWatchFolder}`, {
               type: 'success',
            });
         }
      },
      [notify]
   );

   React.useEffect(() => {
      memoizedNotify(data);
      return () => {};
   }, [data, memoizedNotify]);

   return (
      <Card
         sx={{
            display: {
               xs: 'none',
               md: 'block',
            },
            order: -1,
            flex: '0 0 15em',
            mr: 2,
            mt: 6,
            alignSelf: 'flex-start',
         }}
      >
         <CardContent
            sx={{
               // pt: 1,
               pb: 0,
               display: 'flex',
               alignItems: 'center',
               justifyContent: 'center',
            }}
         >
            <Button
               onClick={() => {
                  mutateWatchFolder();
               }}
               variant="text"
               label="Sync Watch Folder"
            >
               <CloudSyncTwoToneIcon color={loading ? 'warning' : 'success'} />
            </Button>
         </CardContent>
         <CardContent sx={{ pt: 1 }}>
            <FilterLiveSearch source="name" label="Sample Name" />
            <FilterLiveSearch source="bpm" label="BPM" />
            <SavedQueriesList icon={<SaveQueryIcon />} />
         </CardContent>
      </Card>
   );
};

export default SamplesListAside;
