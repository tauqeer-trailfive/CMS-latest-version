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
   BooleanField,
   useTranslate,
   useListContext,
} from 'react-admin'
import { useMediaQuery, Theme, Tabs, Tab, Divider } from '@mui/material'
import MobileGrid from './MobileGrid'
import HomesreensListAside from './HomesreensListAside'
import HomesreenLinkField from './HomesreenLinkField'
import CheckCircle from '@mui/icons-material/CheckCircleTwoTone'
import CancelCircle from '@mui/icons-material/CancelTwoTone'
import { gql, useQuery } from '@apollo/client'
import HomescreenShow from './HomescreenShow'
import EmptyListPage from './EmptyListPage'
import NotFoundRecord from './NotFoundRecord'

const GET_REGIONS = gql`
   query GetAllRegions($orderBy: MetricsFEOrderByInput) {
      getAllRegions(orderBy: $orderBy) {
         id
         name
      }
   }
`

const HomesreensFilters = [<SearchInput source="title" alwaysOn />]

const HomesreenListActions = () => (
   <TopToolbar>
      <SelectColumnsButton />
      <CreateButton />
      <ExportButton />
   </TopToolbar>
)

const HomesreensList = () => {
   const isXsmall = useMediaQuery<Theme>((theme) =>
      theme.breakpoints.down('sm')
   )
   const isSmall = useMediaQuery<Theme>((theme) => theme.breakpoints.down('md'))
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
   )
}

const TabbedDatagrid = () => {
   const [Regions, setRegions] = React.useState<{ id: string; name: string }[]>(
      []
   )
   const { data, loading, error } = useQuery(GET_REGIONS, {
      variables: {
         orderBy: 'createdAt_DESC',
      },
   })
   const translate = useTranslate()
   const listContext = useListContext()
   const { filterValues, setFilters, displayedFilters } = listContext
   const isXsmall = useMediaQuery<Theme>((theme) =>
      theme.breakpoints.down('sm')
   )

   const handleChange = React.useCallback(
      (event: React.ChangeEvent<{}>, value: any) => {
         setFilters &&
            setFilters(
               { ...filterValues, region: value },
               displayedFilters,
               false // no debounce, we want the filter to fire immediately
            )
      },
      [displayedFilters, filterValues, setFilters]
   )
   React.useEffect(() => {
      if (data?.getAllRegions) {
         const extractingRegions: { id: string; name: string }[] =
            data?.getAllRegions.map((item) => {
               return { id: item.id, name: item.name }
            })
         extractingRegions.unshift({ id: 'DEFAULT', name: 'DEFAULT' })
         setRegions(extractingRegions)
      }
   }, [data])
   return (
      <React.Fragment>
         <Tabs
            variant="scrollable"
            value={filterValues.region}
            indicatorColor="primary"
            onChange={handleChange}
         >
            {Regions?.map((choice) => (
               <Tab
                  key={choice.id}
                  label={<span>{choice.name}</span>}
                  value={choice.name === 'DEFAULT' ? null : choice.name}
                  defaultValue="DEFAULT"
               />
            ))}
         </Tabs>
         {isXsmall ? (
            <MobileGrid />
         ) : (
            <>
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
                  <TextField
                     source="title"
                     label="resources.homescreens.fields.title"
                  />
                  <TextField
                     source="type"
                     label="resources.homescreens.fields.type"
                  />
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
                  <ArrayField source="region" sortable={false}>
                     <SingleFieldList linkType={false}>
                        <ChipField source="name" size="small" />
                     </SingleFieldList>
                  </ArrayField>
                  <DateField source="createdAt" label="Created At" showTime />
               </DatagridConfigurable>
            </>
         )}
      </React.Fragment>
   )
}

export default HomesreensList
