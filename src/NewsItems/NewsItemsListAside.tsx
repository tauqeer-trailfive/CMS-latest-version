import * as React from 'react';
import { Card, CardContent } from '@mui/material';
import { FilterLiveSearch, SavedQueriesList } from 'react-admin';
import SaveQueryIcon from '@mui/icons-material/BookmarkAddedRounded';

const NewsItemsListAside = () => {
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
         <CardContent sx={{ pt: 1 }}>
            <FilterLiveSearch source="title" label="Title" />
            <SavedQueriesList icon={<SaveQueryIcon />} />
         </CardContent>
      </Card>
   );
};

export default NewsItemsListAside;
