import * as React from 'react'
import { Card, CardContent } from '@mui/material'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import MonetizationOnIcon from '@mui/icons-material/MonetizationOnOutlined'
import MailIcon from '@mui/icons-material/MailOutline'
import LocalOfferIcon from '@mui/icons-material/LocalOfferOutlined'
import RoleIcon from '@mui/icons-material/TaskAlt'
import RatingIcon from '@mui/icons-material/ThumbsUpDownRounded'
import StatusIcon from '@mui/icons-material/CloudCircleRounded'
import PrivateIcon from '@mui/icons-material/SecurityRounded'

import {
   FilterList,
   FilterListItem,
   FilterLiveSearch,
   SavedQueriesList,
   useListContext,
} from 'react-admin'
import {
   endOfYesterday,
   startOfWeek,
   subWeeks,
   startOfMonth,
   subMonths,
} from 'date-fns'

const ProjectsListAside = () => {
   return (
      <Card
         sx={{
            display: {
               xs: 'none',
               md: 'block',
            },
            order: -1,
            flex: '0 0 15em',
            mr: 2,
            mt: 6,
            alignSelf: 'flex-start',
         }}
      >
         <CardContent sx={{ pt: 1 }}>
            <FilterLiveSearch source="name" label="Name" />
            <FilterLiveSearch source="email" label="Owner Email" />
            <SavedQueriesList />
            <FilterList label="Filter By Rating" icon={<RatingIcon />}>
               <FilterListItem
                  label="Poor"
                  value={{
                     rating: 1,
                  }}
               />
               <FilterListItem
                  label="Fair"
                  value={{
                     rating: 2,
                  }}
               />
               <FilterListItem
                  label="Good"
                  value={{
                     rating: 3,
                  }}
               />
               <FilterListItem
                  label="Very Good"
                  value={{
                     rating: 4,
                  }}
               />
               <FilterListItem
                  label="Excellent"
                  value={{
                     rating: 5,
                  }}
               />
            </FilterList>

            <FilterList
               label="resources.projects.filters.status"
               icon={<StatusIcon />}
            >
               <FilterListItem
                  label="DRAFT"
                  value={{
                     status: 'DRAFT',
                  }}
               />
               <FilterListItem
                  label="PUBLISH_IN_PROGRESS"
                  value={{
                     status: 'PUBLISH_IN_PROGRESS',
                  }}
               />
               <FilterListItem
                  label="PUBLISHED"
                  value={{
                     status: 'PUBLISHED',
                  }}
               />
               <FilterListItem
                  label="ARCHIVED"
                  value={{
                     status: 'ARCHIVED',
                  }}
               />
               <FilterListItem
                  label="READONLY"
                  value={{
                     status: 'READONLY',
                  }}
               />
            </FilterList>
            <FilterList
               label="resources.projects.filters.private"
               icon={<PrivateIcon />}
            >
               <FilterListItem
                  label="ra.boolean.true"
                  value={{
                     private: true,
                  }}
               />
               <FilterListItem
                  label="ra.boolean.false"
                  value={{
                     private: false,
                  }}
               />
            </FilterList>
         </CardContent>
      </Card>
   )
}

export default ProjectsListAside
