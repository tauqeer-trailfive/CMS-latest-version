import * as React from 'react';
import { Card, CardContent } from '@mui/material';
import RoleIcon from '@mui/icons-material/TaskAlt';
import {
   FilterList,
   FilterListItem,
   FilterLiveSearch,
   SavedQueriesList,
} from 'react-admin';
import SaveQueryIcon from '@mui/icons-material/BookmarkAddedRounded';

const PresetsListAside = () => {
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
            <FilterLiveSearch source="name" label="Name" />
            <SavedQueriesList icon={<SaveQueryIcon />} />
            <FilterList
               label="resources.presets.filters.category"
               icon={<RoleIcon />}
            >
               <FilterListItem
                  label="resources.presets.filters.GUITAR"
                  value={{
                     category: 'GUITAR',
                  }}
               />
               <FilterListItem
                  label="resources.presets.filters.BASS"
                  value={{
                     category: 'BASS',
                  }}
               />
               <FilterListItem
                  label="resources.presets.filters.DRAMM"
                  value={{
                     category: 'DRAMM',
                  }}
               />
               <FilterListItem
                  label="resources.presets.filters.UKULELE"
                  value={{
                     category: 'UKULELE',
                  }}
               />
               <FilterListItem
                  label="resources.presets.filters.MASTERBUS"
                  value={{
                     category: 'MASTERBUS',
                  }}
               />
            </FilterList>
         </CardContent>
      </Card>
   );
};

export default PresetsListAside;
