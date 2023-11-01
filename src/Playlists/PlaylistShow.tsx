import * as React from 'react'
import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import { useRecordContext } from 'react-admin'
import { Stack } from '@mui/material'
import { Playlist } from '../types'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'

const PlaylistShow = () => {
   const record = useRecordContext<Playlist>()
   return (
      <Card
         sx={{
            margin: 'auto',
            boxShadow: 4,
            borderRadius: 1,
            // border: "1px solid #909090",
            paddingY: 1,
            paddingX: 5,
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
                     {record.name}
                  </Typography>
               </Grid>
            </Grid>
            <Box height={20}>&nbsp;</Box>
            <Grid container spacing={2}>
               <Grid item xs={6}>
                  <Typography
                     fontWeight={'400'}
                     variant="h6"
                     gutterBottom
                     align="center"
                  >
                     Created Date{' '}
                  </Typography>
                  <Typography
                     fontWeight={'100'}
                     variant="body1"
                     gutterBottom
                     align="center"
                  >
                     {record.createdAt}
                  </Typography>
               </Grid>

               <Grid item xs={5}>
                  <Typography
                     fontWeight={'400'}
                     variant="h6"
                     gutterBottom
                     align="center"
                  >
                     Owner
                  </Typography>
                  <Typography
                     fontWeight={'100'}
                     variant="body1"
                     gutterBottom
                     align="center"
                  >
                     {record.owner.name}
                  </Typography>
               </Grid>
            </Grid>

            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Typography
                     fontWeight={'400'}
                     variant="h6"
                     gutterBottom
                     align="center"
                  >
                     Selected Projects
                  </Typography>
               </Grid>
            </Grid>
            <Box margin="10px 0">
               <Stack direction="row" gap={1} flexWrap="wrap">
                  <TableContainer style={{ overflow: 'hidden' }}>
                     <Table
                        sx={{
                           [`& .${tableCellClasses.root}`]: {
                              borderBottom: 'none',
                           },
                        }}
                        aria-label="simple table"
                     >
                        <TableHead>
                           <TableRow>
                              <TableCell align="justify">Order</TableCell>
                              <TableCell align="justify">Name</TableCell>
                              <TableCell align="justify">Comments</TableCell>
                              <TableCell align="justify">Claps</TableCell>
                              <TableCell align="justify">
                                 Addition Date
                              </TableCell>
                              <TableCell align="justify">Drop Date</TableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {record.orderedProjects.map((project) => (
                              <TableRow
                                 sx={{
                                    '&:last-child td, &:last-child th': {
                                       border: 0,
                                    },
                                 }}
                              >
                                 <TableCell align="justify">
                                    {project.sortOrder + 1}
                                 </TableCell>
                                 <TableCell align="justify">
                                    {project.project.name}
                                 </TableCell>
                                 <TableCell align="justify">
                                    {project.project.commentsCount}
                                 </TableCell>
                                 <TableCell align="justify">
                                    {project.project.clapsCount}
                                 </TableCell>
                                 <TableCell align="justify">
                                    {project.additionDate}
                                 </TableCell>
                                 <TableCell align="justify">
                                    {project.dropDate}
                                 </TableCell>
                              </TableRow>
                           ))}
                        </TableBody>
                     </Table>
                  </TableContainer>
               </Stack>
            </Box>
         </CardContent>
      </Card>
   )
}

export default PlaylistShow
