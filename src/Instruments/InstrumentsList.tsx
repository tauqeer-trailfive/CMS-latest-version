import * as React from 'react'
import {
   List,
   DatagridConfigurable,
   TopToolbar,
   SelectColumnsButton,
   CreateButton,
   ExportButton,
   EmailField,
   ChipField,
   TextField,
   DateField,
   ArrayField,
   SingleFieldList,
   ReferenceArrayField,
   Datagrid,
   SearchInput,
   BooleanField,
   NumberField,
} from 'react-admin'
import { useMediaQuery, Theme } from '@mui/material'

import MobileGrid from './MobileGrid'
import InstrumentListAside from './InstrumentListAside'
import CheckCircle from '@mui/icons-material/CheckCircleTwoTone'
import CancelCircle from '@mui/icons-material/CancelTwoTone'
import InstrumentLinkField from './InstrumentLinkField'
import EmptyListPage from './EmptyListPage'
import NotFoundRecord from './NotFoundRecord'

const userFilters = [<SearchInput source="name" alwaysOn />]

const PostListActions = () => (
   <TopToolbar>
      <SelectColumnsButton />
      <CreateButton />
      <ExportButton />
   </TopToolbar>
)

const InstrumentsList = () => {
   const isXsmall = useMediaQuery<Theme>((theme) =>
      theme.breakpoints.down('sm')
   )
   const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'))
   return (
      <List
         filters={isSmall ? userFilters : undefined}
         sort={{ field: 'createdAt', order: 'DESC' }}
         perPage={10}
         aside={<InstrumentListAside />}
         actions={<PostListActions />}
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
               <InstrumentLinkField />
               <TextField
                  source="name"
                  label="resources.musicalInstruments.fields.name"
               />
               <NumberField
                  source="rank"
                  label="resources.musicalInstruments.fields.Rank"
               />
               <DateField source="createdAt" label="Created At" showTime />
            </DatagridConfigurable>
         )}
      </List>
   )
}

export default InstrumentsList
