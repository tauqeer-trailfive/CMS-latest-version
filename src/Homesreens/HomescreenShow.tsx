import * as React from 'react'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { useRecordContext } from 'react-admin'
import { Stack, Chip } from '@mui/material'
import { Homescreen } from '../types'

const HomescreenShow = () => {
   const record = useRecordContext<Homescreen>()
   if (!record) return null
   return (
      <Card
         sx={{
            margin: 'auto',
            boxShadow: 4,
            padding: 5,
            borderRadius: 1,
            // border: "1px solid #909090",
            width: 'auto',
            mx: 20,
            my: 1,
         }}
      >
         <CardContent>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Typography
                     fontWeight={'900'}
                     variant="h5"
                     gutterBottom
                     align="center"
                  >
                     {record.title}
                  </Typography>
               </Grid>
            </Grid>

            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Typography variant="body1" gutterBottom align="center">
                     Linked Playlists
                  </Typography>
               </Grid>
            </Grid>
            <Box
               sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
               }}
            >
               <Stack direction="row" gap={1} flexWrap="wrap">
                  {record.playlist.map((pl) => (
                     <Chip
                        key={pl.id}
                        label={pl.name}
                        variant="outlined"
                        color="primary"
                     />
                  ))}
               </Stack>
            </Box>
         </CardContent>
      </Card>
   )
}

export default HomescreenShow
