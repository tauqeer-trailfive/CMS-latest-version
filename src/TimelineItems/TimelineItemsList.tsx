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
} from 'react-admin'
import { useMediaQuery, Theme } from '@mui/material'

import MobileGrid from './MobileGrid'
import TimelineItemsListAside from './TimelineItemsListAside'
import TimelineItemLinkField from './TimelineItemLinkField'
import EmptyListPage from './EmptyListPage'
import NotFoundRecord from './NotFoundRecord'

const userFilters = [<SearchInput source="name" alwaysOn />]

const TimelineItemListActions = () => (
   <TopToolbar>
      <SelectColumnsButton />
      <CreateButton />
      <ExportButton />
   </TopToolbar>
)

const TimelineItemsList = () => {
   const isXsmall = useMediaQuery<Theme>((theme) =>
      theme.breakpoints.down('sm')
   )
   const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'))
   return (
      <List
         filters={isSmall ? userFilters : undefined}
         sort={{ field: 'createdAt', order: 'DESC' }}
         perPage={10}
         aside={<TimelineItemsListAside />}
         actions={<TimelineItemListActions />}
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
               <TimelineItemLinkField />
               <TextField
                  source="text"
                  label="resources.timelineitems.fields.text"
               />
               <ChipField
                  source="type"
                  label="resources.timelineitems.fields.type"
                  sortable={false}
               />
               <DateField source="createdAt" label="Created At" showTime />
            </DatagridConfigurable>
         )}
      </List>
   )
}

export default TimelineItemsList
