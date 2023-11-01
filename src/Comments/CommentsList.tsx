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
   ReferenceField,
} from 'react-admin';
import { useMediaQuery, Theme } from '@mui/material';

import MobileGrid from './MobileGrid';
import CommentsListAside from './CommentsListAside';
import CommentLinkField from './CommentLinkField';
import NotFoundRecord from './NotFoundRecord';
import EmptyListPage from './EmptyListPage';

const userFilters = [<SearchInput source="name" alwaysOn />];

const CommentListActions = () => (
   <TopToolbar>
      <SelectColumnsButton />
      <CreateButton />
      <ExportButton />
   </TopToolbar>
);

const CommentsList = () => {
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
         aside={<CommentsListAside />}
         actions={<CommentListActions />}
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
               <CommentLinkField />
               <TextField
                  source="text"
                  label="resources.comments.fields.text"
               />
               <ReferenceField
                  label="Owner"
                  source="owner.id"
                  reference="users"
               >
                  <ChipField
                     source="name"
                     label="resources.comments.fields.user"
                     sortable={false}
                  />
               </ReferenceField>
               <ReferenceField
                  label="Project"
                  source="project.id"
                  reference="projects"
               >
                  <ChipField
                     source="name"
                     label="resources.comments.fields.project"
                     sortable={false}
                  />
               </ReferenceField>
               <DateField
                  source="createdAt"
                  label="resources.comments.fields.created_at"
                  showTime
               />
            </DatagridConfigurable>
         )}
      </List>
   );
};

export default CommentsList;
