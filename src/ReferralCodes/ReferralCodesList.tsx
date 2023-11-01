import * as React from 'react';
import {
   List,
   DatagridConfigurable,
   TopToolbar,
   SelectColumnsButton,
   CreateButton,
   ExportButton,
   TextField,
   SearchInput,
   EmailField,
   DateField,
   NumberField,
} from 'react-admin';
import { useMediaQuery, Theme } from '@mui/material';
import MobileGrid from './MobileGrid';
import ReferralCodesListAside from './ReferralCodesListAside';
import ReferralCodeLinkField from './ReferralCodeLinkField';
import EmptyListPage from './EmptyListPage';
import NotFoundRecord from './NotFoundRecord';

const userFilters = [<SearchInput source="name" alwaysOn />];

const ReferralCodeActions = () => (
   <TopToolbar>
      <SelectColumnsButton />
      <CreateButton />
      <ExportButton />
   </TopToolbar>
);

const ReferralCodesList = () => {
   const isXsmall = useMediaQuery<Theme>((theme) =>
      theme.breakpoints.down('sm')
   );
   const isSmall = useMediaQuery<Theme>((theme) =>
      theme.breakpoints.down('md')
   );
   return (
      <List
         filters={isSmall ? userFilters : undefined}
         sort={{ field: 'createdAt', order: 'DESC' }}
         perPage={10}
         aside={<ReferralCodesListAside />}
         actions={<ReferralCodeActions />}
         empty={<EmptyListPage />}
         sx={{ mt: 2 }}
      >
         {isXsmall ? (
            <MobileGrid />
         ) : (
            <DatagridConfigurable
               sx={{
                  '& .column-groups': {
                     md: { display: 'none' },
                     lg: { display: 'table-cell' },
                  },
               }}
               empty={<NotFoundRecord />}
            >
               <ReferralCodeLinkField />
               <TextField
                  source="code"
                  label="resources.referralcode.fields.code"
               />
               <NumberField source="ttl" />
               <NumberField source="status" />
               <EmailField
                  source="email"
                  label="resources.referralcode.fields.email"
               />
               <DateField source="createdAt" showTime label="Created At" />
            </DatagridConfigurable>
         )}
      </List>
   );
};

export default ReferralCodesList;
