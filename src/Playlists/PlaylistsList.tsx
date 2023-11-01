import * as React from 'react'
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
   ArrayField,
   SingleFieldList,
   ReferenceField,
} from 'react-admin'
import { useMediaQuery, Theme } from '@mui/material'

import MobileGrid from './MobileGrid'
import PlaylistsListAside from './PlaylistsListAside'
import PlaylistLinkField from './PlaylistLinkField'
import CheckCircle from '@mui/icons-material/CheckCircleTwoTone'
import CancelCircle from '@mui/icons-material/CancelTwoTone'
import PlaylistShow from './PlaylistShow'
import NotFoundRecord from './NotFoundRecord'
import EmptyListPage from './EmptyListPage'

const userFilters = [<SearchInput source="name" alwaysOn />]

const PlaylistListActions = () => (
   <TopToolbar>
      <SelectColumnsButton />
      <CreateButton />
      <ExportButton />
   </TopToolbar>
)

const PlaylistsList = () => {
   const isXsmall = useMediaQuery<Theme>((theme) =>
      theme.breakpoints.down('sm')
   )
   const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'))
   return (
      <List
         filters={isSmall ? userFilters : undefined}
         sort={{ field: 'createdAt', order: 'DESC' }}
         perPage={10}
         aside={<PlaylistsListAside />}
         actions={<PlaylistListActions />}
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
               omit={['orderedProjects']}
               rowClick="expand"
               expand={<PlaylistShow />}
               empty={<NotFoundRecord />}
            >
               <PlaylistLinkField sortable={false} />
               <BooleanField
                  source="public"
                  TrueIcon={CheckCircle}
                  FalseIcon={CancelCircle}
               />
               <TextField source="name" />
               <ReferenceField
                  label="Owner"
                  source="owner.id"
                  reference="users"
               >
                  <ChipField
                     source="name"
                     label="resources.playlists.fields.ownername"
                     sortable={false}
                  />
               </ReferenceField>
               <ArrayField source="orderedProjects" sortable={false}>
                  <SingleFieldList linkType={false}>
                     <ChipField source="project.name" size="small" />
                  </SingleFieldList>
               </ArrayField>
               <DateField source="createdAt" label="Created At" showTime />
            </DatagridConfigurable>
         )}
      </List>
   )
}

export default PlaylistsList
