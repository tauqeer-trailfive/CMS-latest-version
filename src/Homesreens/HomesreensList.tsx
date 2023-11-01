import * as React from 'react';
import {
   List,
   DatagridConfigurable,
   TopToolbar,
   SelectColumnsButton,
   CreateButton,
   ExportButton,
   TextField,
   DateField,
   SearchInput,
   NumberField,
   ChipField,
   ArrayField,
   SingleFieldList,
   BooleanField,
   useTranslate,
   useListContext,
} from 'react-admin';
import { useMediaQuery, Theme, Tabs, Tab, Divider } from '@mui/material';
import MobileGrid from './MobileGrid';
import HomesreensListAside from './HomesreensListAside';
import HomesreenLinkField from './HomesreenLinkField';
import CheckCircle from '@mui/icons-material/CheckCircleTwoTone';
import CancelCircle from '@mui/icons-material/CancelTwoTone';
import { gql, useQuery } from '@apollo/client';
import HomescreenShow from './HomescreenShow';
import EmptyListPage from './EmptyListPage';
import NotFoundRecord from './NotFoundRecord';

const HomesreensFilters = [<SearchInput source="title" alwaysOn />];

const HomesreenListActions = () => (
   <TopToolbar>
      <SelectColumnsButton />
      <CreateButton />
      <ExportButton />
   </TopToolbar>
);

const HomesreensList = () => {
   const isXsmall = useMediaQuery<Theme>((theme) =>
      theme.breakpoints.down('sm')
   );
   const isSmall = useMediaQuery<Theme>((theme) =>
      theme.breakpoints.down('md')
   );
   return (
      <List
         filters={isSmall ? HomesreensFilters : undefined}
         sort={{ field: 'createdAt', order: 'DESC' }}
         perPage={10}
         aside={<HomesreensListAside />}
         actions={<HomesreenListActions />}
         empty={<EmptyListPage />}
         sx={{ mt: 2 }}
      >
         {isXsmall ? <MobileGrid /> : <TabbedDatagrid />}
      </List>
   );
};

const TabbedDatagrid = () => {
   return (
      <DatagridConfigurable
         sx={{
            '& .column-groups': {
               md: { display: 'none' },
               lg: { display: 'table-cell' },
            },
         }}
         omit={['priority', 'limit', 'type', 'visibility']}
         rowClick="expand"
         expand={<HomescreenShow />}
         empty={<NotFoundRecord />}
      >
         <HomesreenLinkField />
         <TextField source="title" label="resources.homescreens.fields.title" />
         <TextField source="type" label="resources.homescreens.fields.type" />
         <NumberField
            source="priority"
            label="resources.homescreens.fields.priority"
         />
         <NumberField
            source="limit"
            label="resources.homescreens.fields.limit"
         />
         <ChipField
            size="small"
            source="user.name"
            label="User"
            sortable={false}
         />
         <ChipField
            size="small"
            source="visibility"
            label="visibility"
            sortable={false}
         />
         <BooleanField
            source="status"
            TrueIcon={CheckCircle}
            FalseIcon={CancelCircle}
         />
         <DateField source="createdAt" label="Created At" showTime />
      </DatagridConfigurable>
   );
};

export default HomesreensList;
