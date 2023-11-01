import React, { useEffect, useState } from 'react'
import {
   AutocompleteInput,
   DateInput,
   NumberInput,
   ReferenceInput,
   useNotify,
} from 'react-admin'
import {
   Box,
   InputLabel,
   MenuItem,
   Select,
   Divider,
   CircularProgress,
   Button,
   TextField,
   FormControl,
} from '@mui/material'
import { gql, useLazyQuery } from '@apollo/client'

const SEND_USER_NOTI = gql`
   query Query(
      $title: String!
      $goto: GotoType!
      $type: GroupType!
      $destination: destinationInput!
      $text: String!
      $datetime: DateTime
      $xAmountOfDays: Int
   ) {
      sendPushNotificationsToUsers(
         title: $title
         goto: $goto
         type: $type
         destination: $destination
         text: $text
         datetime: $datetime
         xAmountOfDays: $xAmountOfDays
      )
   }
`

const GET_PROJECT_COMMENT = gql`
   query Comments($where: CommentWhereInput) {
      comments(where: $where) {
         id
         text
         atTimeMicros
         createdAt
      }
   }
`

type Props = {}

const SendPushNotificationToUser = (props: Props) => {
   const noti = useNotify()
   const [type, setType] = React.useState('')
   const [title, setTitle] = useState('')
   const [text, setText] = useState('')
   const [goto, setGoto] = useState('')
   const [UserId, setUserId] = React.useState<any>(undefined)
   const [ProjectId, setProjectId] = React.useState<any>(undefined)
   const [ContestId, setContestId] = React.useState<any>(undefined)
   const [dateTime, setDateTime] = useState<any>()
   const [amountOfDays, setAmountOfDays] = useState<any>()
   const [commentId, setComment] = useState<any>(undefined)

   const [sendNoti, { error, loading, data }] = useLazyQuery(SEND_USER_NOTI)
   const [
      getComments,
      { error: CommentError, loading: CommentLoading, data: commentData },
   ] = useLazyQuery(GET_PROJECT_COMMENT)

   const handleTopic = (event: any) => {
      setType(event.target.value)
   }

   const handleGoto = (event: any) => {
      setGoto(event.target.value)
      if (event.target.value === 'ProfileScreen') {
         setComment(undefined)
         setProjectId(undefined)
         setContestId(undefined)
      }
      if (event.target.value === 'PlayJustOneProject') {
         setUserId(undefined)
         setContestId(undefined)
      }
      if (event.target.value === 'ContestInfo') {
         setComment(undefined)
         setUserId(undefined)
         setProjectId(undefined)
      }
   }

   const handleComment = (event: any) => {
      setComment(event.target.value)
   }

   const AllValidationCheck =
      type === '' || title === '' || text === '' || goto === '' ? true : false

   const ActiveValidationCheck =
      type === '' ||
      title === '' ||
      text === '' ||
      goto === '' ||
      dateTime === undefined
         ? true
         : false

   const InActiveValidationCheck =
      type === '' ||
      title === '' ||
      text === '' ||
      goto === '' ||
      dateTime === undefined
         ? true
         : false

   const xAmountofTimeValidationCheck =
      type === '' ||
      title === '' ||
      text === '' ||
      goto === '' ||
      dateTime === undefined ||
      amountOfDays === ''
         ? true
         : false

   const checkValidations = () => {
      if (type === 'All') {
         return AllValidationCheck
      } else if (type === 'Active') {
         return ActiveValidationCheck
      } else if (type === 'Inactive') {
         return InActiveValidationCheck
      } else if (type === 'InactiveForXAmountOfTime') {
         return xAmountofTimeValidationCheck
      }
      return AllValidationCheck
   }

   const TypeCheck =
      type === 'Active' ||
      type === 'Inactive' ||
      type === 'InactiveForXAmountOfTime'

   useEffect(() => {
      if (data) {
         noti(`${data?.sendPushNotificationsToUsers}`, { type: 'success' })
      }
      if (error) {
         noti(`Error: ${error?.message}`, { type: 'error', multiLine: true })
      }
      return () => {}
   }, [data, error])

   useEffect(() => {
      getComments({
         variables: {
            where: {
               project: {
                  id: ProjectId,
               },
            },
         },
      })
      return () => {}
   }, [ProjectId])

   // //console.log(
   //   `userid : ${UserId} --- ProjectId : ${ProjectId} --- ContestId : ${ContestId}`
   // );

   return (
      <>
         {/* send Noti By Grouped user  */}
         <Divider sx={{ border: 0, width: '100%' }} />
         {/* Type */}
         <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
               <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Type</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={type}
                     label="Type"
                     onChange={handleTopic}
                     fullWidth
                     required
                     variant="filled"
                  >
                     <MenuItem value={'All'}>All</MenuItem>
                     <MenuItem value={'Active'}>Active</MenuItem>
                     <MenuItem value={'Inactive'}>Inactive</MenuItem>
                     <MenuItem value={'InactiveForXAmountOfTime'}>
                        InactiveForXAmountOfTime
                     </MenuItem>
                  </Select>
               </FormControl>
            </Box>
         </Box>
         {/* Title */}
         <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
               <TextField
                  id="outlined-basic"
                  label="Title"
                  fullWidth
                  defaultValue={title}
                  onChange={(e: any) => {
                     setTitle(e.target.value)
                  }}
                  required
               />
            </Box>
         </Box>
         {/* Text */}
         <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
               <TextField
                  label="Text"
                  multiline
                  rows={5}
                  fullWidth
                  defaultValue={text}
                  onChange={(e: any) => {
                     setText(e.target.value)
                  }}
                  required
               />
            </Box>
         </Box>
         {/* Goto */}
         <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
               {/* <TextField
            id="outlined-basic"
            label="Goto"
            variant="outlined"
            fullWidth
            defaultValue={goto}
            onChange={(e: any) => {
              setGoto(e.target.value);
            }}
            required
          /> */}
               <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Goto</InputLabel>
                  <Select
                     labelId="demo-simple-select-label"
                     id="demo-simple-select"
                     value={goto}
                     label="Goto"
                     onChange={handleGoto}
                  >
                     <MenuItem value={'ProfileScreen'}>ProfileScreen</MenuItem>
                     <MenuItem value={'PlayJustOneProject'}>
                        PlayJustOneProject
                     </MenuItem>
                     <MenuItem value={'ContestInfo'}>ContestInfo</MenuItem>
                     <MenuItem value={'HomeScreen'}>HomeScreen</MenuItem>
                  </Select>
               </FormControl>
            </Box>
         </Box>

         {goto === 'ProfileScreen' && (
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <ReferenceInput
                     label="User"
                     source="artistName"
                     reference="users"
                     sort={{ field: 'createdAt', order: 'DESC' }}
                     filter={{
                        role: ['SUPERADMIN', 'ADMIN', 'USER', 'ANON'],
                     }}
                  >
                     <AutocompleteInput
                        optionText={(choice) =>
                           `${choice.name}  /  (${choice.artistName})  /  (${choice.id})`
                        }
                        optionValue="id"
                        onChange={(newValue) => {
                           setUserId(newValue)
                        }}
                        noOptionsText="User does'nt exist."
                     />
                  </ReferenceInput>
               </Box>
            </Box>
         )}
         {goto === 'PlayJustOneProject' && (
            <>
               <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                  <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                     <ReferenceInput
                        label="Project"
                        source="project.id"
                        reference="projects"
                        filter={{ status: 'PUBLISHED' }}
                     >
                        <AutocompleteInput
                           label="Project"
                           key="project"
                           optionText={(choice) =>
                              `${choice.name} /  (${choice.id})`
                           }
                           optionValue="id"
                           onChange={(newValue) => {
                              setProjectId(newValue)
                           }}
                           noOptionsText="Project does'nt exist"
                        />
                     </ReferenceInput>
                  </Box>
               </Box>

               {ProjectId && commentData && (
                  <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
                     <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                        <ReferenceInput
                           label="Comment"
                           source="comment.id"
                           reference="comments"
                           filter={{ project: { id: ProjectId } }}
                        >
                           <AutocompleteInput
                              label="Comment"
                              key="comment"
                              optionText={(choice) =>
                                 `${choice.text} / (${choice.id})`
                              }
                              optionValue="id"
                              onChange={(newValue) => {
                                 setComment(newValue)
                              }}
                              noOptionsText="Comment does'nt exist."
                           />
                        </ReferenceInput>
                     </Box>
                  </Box>
               )}
            </>
         )}
         {goto === 'ContestInfo' && (
            <Box display={{ xs: 'block', sm: 'flex', width: '100%' }}>
               <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
                  <ReferenceInput
                     label="Contest"
                     source="title"
                     reference="contests"
                     filter={{
                        role: ['SUPERADMIN', 'ADMIN', 'USER', 'ANON'],
                     }}
                  >
                     <AutocompleteInput
                        optionText="title"
                        optionValue="id"
                        onChange={(newValue) => {
                           //console.log(newValue);
                           setContestId(newValue)
                        }}
                        noOptionsText="Contest does'nt exist."
                     />
                  </ReferenceInput>
               </Box>
            </Box>
         )}
         {/* Datetime */}
         {TypeCheck && (
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
               <DateInput
                  source={`datetime`}
                  type="date"
                  fullWidth
                  variant="outlined"
                  onChange={(e: any) => {
                     const dateValue = e.target.value
                     const formate = new Date(dateValue).toISOString()
                     //console.log(formate);
                     setDateTime(formate)
                  }}
               />
            </Box>
         )}
         {/* xAmountofTime */}
         {type === 'InactiveForXAmountOfTime' && (
            <Box flex={1} mr={{ xs: 0, sm: '0.5em' }}>
               <NumberInput
                  source="xAmountOfDays"
                  onChange={(e: any) => {
                     const Value = parseInt(e.target.value)
                     setAmountOfDays(Value)
                     //console.log(Value);
                  }}
                  variant="outlined"
               />
            </Box>
         )}

         <Box my={2}>
            <Button
               size="large"
               variant="contained"
               onClick={() => {
                  sendNoti({
                     variables: {
                        title: title,
                        goto: goto,
                        type: type,
                        destination: {
                           ...(ProjectId !== undefined && {
                              id: ProjectId,
                           }),
                           ...(UserId !== undefined && { id: UserId }),
                           ...(ContestId !== undefined && {
                              id: ContestId,
                           }),
                           ...(commentId !== undefined && {
                              optionalId: commentId,
                           }),
                        },
                        text: text,
                        ...(dateTime !== undefined && {
                           datetime: dateTime,
                        }),
                        ...(amountOfDays !== undefined && {
                           xAmountOfDays: amountOfDays,
                        }),
                     },
                  })
               }}
               disabled={checkValidations() || loading}
            >
               {loading ? (
                  <Box
                     sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                     }}
                  >
                     <CircularProgress
                        size={15}
                        sx={{ mx: 1 }}
                        color="primary"
                     />
                     <span>Sending</span>
                  </Box>
               ) : (
                  'Send Notification'
               )}
            </Button>
         </Box>
      </>
   )
}

export default SendPushNotificationToUser
