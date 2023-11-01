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
   BooleanField,
   Button,
   ArrayField,
   SingleFieldList,
} from 'react-admin';
import { useMediaQuery, Theme } from '@mui/material';

import MobileGrid from './MobileGrid';
import ProjectsListAside from './ProjectsListAside';
import ProjectLinkField from './ProjectLinkField';
import CheckCircle from '@mui/icons-material/CheckCircleTwoTone';
import CancelCircle from '@mui/icons-material/CancelTwoTone';
import RatingField from './RatingField';
import { gql, useQuery } from '@apollo/client';
import DownloadCSVIcon from '@mui/icons-material/DownloadForOfflineTwoTone';
import ProjectShow from './ProjectShow';
import EmptyListPage from './EmptyListPage';
import NotFoundRecord from './NotFoundRecord';

const EXPORT_PROJECTS_QUERY = gql`
   query Query($model: ModelNames!) {
      getCsvUrl(model: $model)
   }
`;

const ProjectFilters = [<SearchInput source="name" alwaysOn />];

const ProjectsList = () => {
   const isXsmall = useMediaQuery<Theme>((theme) =>
      theme.breakpoints.down('sm')
   );
   const isSmall = useMediaQuery<Theme>((theme) =>
      theme.breakpoints.down('md')
   );

   const { data, loading, error } = useQuery(EXPORT_PROJECTS_QUERY, {
      variables: {
         model: 'project',
      },
   });
   const ProjectsListActions = () => (
      <TopToolbar>
         <SelectColumnsButton />
         <CreateButton />
         {/* <ExportButton /> */}
         <Button
            href={!loading ? data?.getCsvUrl : '#'}
            disabled={loading}
            title="Export Projects List"
            label="Export Entire Projects List"
            startIcon={
               <React.Fragment>
                  <DownloadCSVIcon />
               </React.Fragment>
            }
         />
      </TopToolbar>
   );
   return (
      <List
         filters={isSmall ? ProjectFilters : undefined}
         sort={{ field: 'publishedAt', order: 'DESC' }}
         perPage={10}
         aside={<ProjectsListAside />}
         actions={<ProjectsListActions />}
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
               omit={[
                  'slug',
                  'availableFrom',
                  'createdAt',
                  'private',
                  'category',
               ]}
               rowClick="expand"
               expand={<ProjectShow />}
               empty={<NotFoundRecord />}
            >
               <ProjectLinkField />
               <TextField
                  source="name"
                  label="resources.projects.fields.name"
               />
               <TextField
                  source="slug"
                  label="resources.projects.fields.slug"
               />
               <DateField source="publishedAt" showTime />
               <DateField source="availableFrom" showTime />
               <DateField source="createdAt" showTime />
               <BooleanField
                  source="private"
                  label="Private"
                  TrueIcon={CheckCircle}
                  FalseIcon={CancelCircle}
               />
               <RatingField source="rating" />
               <ChipField source="status" />
               <ArrayField source="musicalInstruments">
                  <SingleFieldList
                     linkType="edit"
                     resource="musicalInstruments"
                  >
                     <ChipField source="name" size="small" />
                  </SingleFieldList>
               </ArrayField>
               <ArrayField source="genres">
                  <SingleFieldList linkType="edit" resource="genres">
                     <ChipField source="name" size="small" />
                  </SingleFieldList>
               </ArrayField>
               <ArrayField source="category">
                  <SingleFieldList linkType="edit" resource="projectCategories">
                     <ChipField source="name" size="small" />
                  </SingleFieldList>
               </ArrayField>
            </DatagridConfigurable>
         )}
      </List>
   );
};

export default ProjectsList;
