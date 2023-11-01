import * as React from 'react'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Typography,
   Box,
} from '@mui/material'
import {
   Link,
   useTranslate,
   useGetMany,
   useRefresh,
   useRecordContext,
   ShowButton,
   ToggleThemeButton,
   defaultTheme,
   BooleanInput,
   Button,
   Pagination,
   useGetOne,
   useGetList,
   useDataProvider,
   Loading,
   Error,
   Create,
   SimpleForm,
   TextInput,
   useRedirect,
   SelectInput,
   ReferenceInput,
   AutocompleteInput,
   ReferenceArrayInput,
   AutocompleteArrayInput,
   useNotify,
   ArrayInput,
   SimpleFormIterator,
   FormDataConsumer,
} from 'react-admin'

import { Playlist } from '../types'
import { TableCellRight } from './TableCellRight'
import { useMutation, gql, useQuery } from '@apollo/client'
import clsx from 'clsx'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Playlist_Projects = gql`
   query playlistProjects(
      $where: PlaylistProjectWhereInput
      $orderBy: PlaylistProjectOrderByInput
   ) {
      playlistProjects(where: $where, orderBy: $orderBy) {
         id
         project {
            bpm
            id
            name
            views
            clapsCount
            commentsCount
         }
         sortOrder
      }
   }
`

const Basket = () => {
   const record = useRecordContext<Playlist>()
   const translate = useTranslate()
   const refresh = useRefresh()
   //console.log(record.id);
   const [highlighted_value, sethighlighted_value] =
      React.useState<boolean>(false)

   const PostPagination = () => (
      <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
   )

   const { data, error, loading } = useQuery(Playlist_Projects, {
      variables: {
         where: {
            playlist: {
               id: record.id,
            },
         },
         orderBy: 'sortOrder_ASC',
      },
   })

   if (!data) return null
   return (
      <Table>
         <TableHead>
            <TableRow>
               <TableCell>
                  {translate('resources.projects.fields.basket.order')}
               </TableCell>
               <TableCell>
                  {translate('resources.projects.fields.basket.name')}
               </TableCell>
               <TableCellRight>
                  {translate('resources.projects.fields.basket.views')}
               </TableCellRight>
               <TableCellRight>
                  {translate('resources.projects.fields.basket.comments')}
               </TableCellRight>
               <TableCellRight>
                  {translate('resources.projects.fields.basket.claps')}
               </TableCellRight>
            </TableRow>
         </TableHead>
         <TableBody>
            {data.playlistProjects.map((item: any) => (
               <TableRow key={item.id}>
                  <TableCell>{item.sortOrder + 1}</TableCell>
                  <TableCell>
                     <Link to={`/projects/${item.project.id}`}>
                        {item.project.name}
                     </Link>
                  </TableCell>
                  <TableCellRight>{item.project.views}</TableCellRight>
                  <TableCellRight>{item.project.commentsCount}</TableCellRight>
                  <TableCellRight>{item.project.clapsCount}</TableCellRight>
               </TableRow>
            ))}
         </TableBody>
      </Table>
   )
   // return (
   //   <Create>
   //     <SimpleForm>
   //       {data.playlistProjects.map((item: any) => (
   //         <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
   //           <SectionTitle label="resources.playlists.fields.projects" />
   //           <FormDataConsumer>
   //             {({ formData, ...rest }) => (
   //               <ArrayInput source="item.project">
   //                 <SimpleFormIterator>
   //                   <ReferenceInput
   //                     label="Projects"
   //                     source="item.id"
   //                     reference="item.project"
   //                   >
   //                     <AutocompleteInput optionText="name" optionValue="id" />
   //                   </ReferenceInput>
   //                 </SimpleFormIterator>
   //               </ArrayInput>
   //             )}
   //           </FormDataConsumer>
   //         </Box>
   //       ))}
   //     </SimpleForm>
   //   </Create>
   // );
}

const SectionTitle = ({ label }: { label: string }) => {
   const translate = useTranslate()

   return (
      <Typography variant="button" gutterBottom>
         {translate(label as string)}
      </Typography>
   )
}

const Separator = () => <Box pt="1em" />

export default Basket
