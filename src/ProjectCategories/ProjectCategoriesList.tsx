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
   ArrayField,
   SingleFieldList,
   ChipField,
} from 'react-admin';
import { useMediaQuery, Theme } from '@mui/material';

import MobileGrid from './MobileGrid';
import ProjectCategoriesListAside from './ProjectCategoriesListAside';
import ProjectCategoryLinkField from './ProjectCategoryLinkField';
import EmptyListPage from './EmptyListPage';
import NotFoundRecord from './NotFoundRecord';

const userFilters = [<SearchInput source="name" alwaysOn />];

const ProjectCategoriesListActions = () => (
   <TopToolbar>
      <SelectColumnsButton />
      <CreateButton />
      <ExportButton />
   </TopToolbar>
);

const ProjectCategoriesList = () => {
   const isXsmall = useMediaQuery<Theme>((theme) =>
      theme.breakpoints.down('sm')
   );
   const isSmall = useMediaQuery<Theme>((theme) =>
      theme.breakpoints.down('md')
   );
   return (
      <List
         filters={isSmall ? userFilters : undefined}
         sort={{ field: 'name', order: 'DESC' }}
         perPage={5}
         aside={<ProjectCategoriesListAside />}
         actions={<ProjectCategoriesListActions />}
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
               <ProjectCategoryLinkField />
               <TextField
                  source="name"
                  label="resources.projectcategories.fields.name"
               />
               <ArrayField
                  source="Project"
                  label="resources.projectcategories.fields.project"
               >
                  <SingleFieldList linkType="edit" resource="projects">
                     <ChipField source="name" size="small" />
                  </SingleFieldList>
               </ArrayField>
            </DatagridConfigurable>
         )}
      </List>
   );
};

export default ProjectCategoriesList;
