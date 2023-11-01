import { Box, Typography } from '@mui/material'
import React from 'react'
import { CreateButton } from 'react-admin'
import SampleSets from './index'

type Props = {}

const EmptyListPage = (props: Props) => {
   return (
      <Box
         textAlign="center"
         m={1}
         sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            mx: 'auto',
            my: 'auto',
            pt: 5,
         }}
      >
         <SampleSets.icon sx={{ fontSize: 100 }} />
         <Typography variant="h4" paragraph fontWeight={'800'}>
            No Sample Sets available
         </Typography>
         <Typography variant="body1" fontWeight={'300'}>
            Do you want to add one?
         </Typography>
         <CreateButton label="Create Sample Set" />
      </Box>
   )
}

export default EmptyListPage
