import * as React from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
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
} from 'react-admin'

import { Contest, Project } from '../types'
import { TableCellRight } from './TableCellRight'
import { useMutation, gql, useQuery } from '@apollo/client'
import clsx from 'clsx'
import { useState, useEffect } from 'react'

const Contest_Highlight = gql`
   mutation updateContestProject(
      $where: ContestProjectWhereUniqueInput!
      $data: ContestProjectUpdateInput
   ) {
      updateContestProject(where: $where, data: $data) {
         id
         highlighted
      }
   }
`

const Contest_Project = gql`
   query ContestProjects($where: ContestProjectWhereInput) {
      contestProjects(where: $where) {
         highlighted
         id
         createdAt
         project {
            bpm
            _clapsMeta {
               count
            }
            _commentsMeta {
               count
            }
            commentsCount
            id
         }
      }
   }
`

const Basket = () => {
   const record = useRecordContext<Contest>()
   const dataProvider = useDataProvider()
   const translate = useTranslate()
   const refresh = useRefresh()
   const [highlighted_value, sethighlighted_value] =
      React.useState<boolean>(false)

   const PostPagination = () => (
      <Pagination rowsPerPageOptions={[10, 25, 50, 100]} />
   )
   const [updateContest, { data, loading, error }] =
      useMutation(Contest_Highlight)

   // const [ContestProject, { data, loading, error }] = useQuery(Contest_Project);

   // const {
   //   data: contest_projects,
   //   isLoading,
   //   error,
   // } = useGetList("where": { "id": { id: userId } });

   // useEffect(() => {
   //       dataProvider.getOne('users', { id: userId })
   //           .then(({ data }) => {
   //               setUser(data);
   //               setLoading(false);
   //           })
   //           .catch(error => {
   //               setError(error);
   //               setLoading(false);
   //           })
   //   }, []);

   const ShowData = (_event: any, highlighted: any, id: any) => {
      sethighlighted_value(highlighted)

      if (highlighted) {
         updateContest({
            variables: {
               data: {
                  highlighted: false,
               },
               where: {
                  id: id,
               },
            },
         })
      } else {
         updateContest({
            variables: {
               data: {
                  highlighted: true,
               },
               where: {
                  id: id,
               },
            },
         })
      }

      refresh()
   }

   // const { isLoading, data: projects } = useGetMany<Project>(
   //   "projects",
   //   { ids: projectsIds },
   //   { enabled: !!record }
   // );
   // const projectsById = projects
   //   ? projects.reduce((acc, project) => {
   //       acc[project.id] = project;
   //       return acc;
   //     }, {} as any)
   //   : {};

   // if (isLoading || !record || !projects) return null;

   return (
      // <ContestList />
      <Table>
         <TableHead>
            <TableRow>
               <TableCell>
                  {translate('resources.contests.fields.basket.name')}
               </TableCell>
               <TableCellRight>
                  {translate('resources.contests.fields.basket.owner')}
               </TableCellRight>
               <TableCellRight>
                  {translate('resources.contests.fields.basket.views')}
               </TableCellRight>
               <TableCellRight>
                  {translate('resources.contests.fields.basket.comments')}
               </TableCellRight>
               <TableCellRight>
                  {translate('resources.contests.fields.basket.claps')}
               </TableCellRight>
               <TableCellRight>
                  {translate('resources.contests.fields.basket.highlighted')}
               </TableCellRight>
            </TableRow>
         </TableHead>
         <TableBody>
            {record.submittedProjects.map((item: any) => (
               <TableRow key={item.id}>
                  <TableCell>
                     {/* <Link to={`/projects/${item.contestprojects_id}`}>
                {projectsById[item.contestprojects_id].project.name}
              </Link> */}
                     {/* {projectsById[item.contestprojects_id].name} */}
                     {/* {item.highlighted} */}
                     {/* {record.submittedProjects[0].project.name} */}
                     {/* {item.project.name} */}
                     <Link to={`/projects/${item.project.id}`}>
                        {item.project.name}
                     </Link>
                  </TableCell>
                  <TableCellRight>
                     {/* {projectsById[item.contestprojects_id].name} */}
                     {item.project.owner.name}
                  </TableCellRight>
                  <TableCellRight>{item.project.views}</TableCellRight>
                  <TableCellRight>{item.project.commentsCount}</TableCellRight>
                  <TableCellRight>{item.project.clapsCount}</TableCellRight>

                  {/* <TableCellRight>{String(item.highlighted)}</TableCellRight> */}
                  <TableCellRight>
                     <Button
                        label={String(item.highlighted)}
                        onClick={(event) =>
                           ShowData(event, item.highlighted, item.id)
                        }
                        value={item.id}
                     ></Button>
                  </TableCellRight>

                  {/* <TableCellRight>
              <Button label="Click" onClick={ShowData} value={item.id} />
            </TableCellRight> */}

                  {/* <TableCellRight>
              <BooleanInput label="Highlighted" source={item.highlighted} />
            </TableCellRight> */}
               </TableRow>
            ))}
         </TableBody>
      </Table>
   )
}

export default Basket
