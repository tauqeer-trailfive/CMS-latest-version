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
   ArrayField,
   SingleFieldList,
} from 'react-admin'
import { useMediaQuery, Theme } from '@mui/material'

import MobileGrid from './MobileGrid'
import PresetsListAside from './PresetsListAside'
import EffectLinkField from './PresetLinkField'
import EmptyListPage from './EmptyListPage'
import NotFoundRecord from './NotFoundRecord'

const userFilters = [<SearchInput source="name" alwaysOn />]

const PresetListActions = () => (
   <TopToolbar>
      <SelectColumnsButton />
      <CreateButton />
      <ExportButton />
   </TopToolbar>
)

const PresetsList = () => {
   const isXsmall = useMediaQuery<Theme>((theme) =>
      theme.breakpoints.down('sm')
   )
   const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'))
   return (
      <List
         filters={isSmall ? userFilters : undefined}
         sort={{ field: 'createdAt', order: 'DESC' }}
         perPage={10}
         aside={<PresetsListAside />}
         actions={<PresetListActions />}
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
               <EffectLinkField />
               <TextField source="name" label="resources.presets.fields.name" />
               <ChipField source="category" />
               <DateField source="createdAt" label="Created At" showTime />
               <ArrayField source="effects">
                  <SingleFieldList linkType="edit" resource="effects">
                     <ChipField source="name" size="small" />
                  </SingleFieldList>
               </ArrayField>
            </DatagridConfigurable>
         )}
      </List>
   )
}

export default PresetsList
