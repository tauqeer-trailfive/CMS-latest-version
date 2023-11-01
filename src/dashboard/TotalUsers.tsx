import {
   Avatar,
   Box,
   Button,
   List,
   ListItem,
   ListItemAvatar,
   ListItemText,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslate, useGetList, LinearProgress } from 'react-admin';

import CardWithIcon from './CardWithIcon';
import SupervisedUserCircleTwoToneIcon from '@mui/icons-material/SupervisedUserCircleTwoTone';
import { User } from '../types';
import { gql, useQuery } from '@apollo/client';
import React from 'react';

const GET_USERS_COUNT = gql`
   query AllUsers {
      usersMeta {
         count
      }
   }
`;

const TotalUsers = () => {
   const translate = useTranslate();

   const { data } = useQuery(GET_USERS_COUNT);
   const { isLoading, data: users } = useGetList<User>('users', {
      filter: {
         role: 'USER',
      },
      sort: { field: 'createdAt', order: 'DESC' },
      pagination: { page: 1, perPage: 6 },
   });

   return (
      // <CardWithIcon
      //   to="/users"
      //   icon={SupervisedUserCircleTwoToneIcon}
      //   title={translate("pos.dashboard.new_users")}
      //   subtitle={data ? data.usersMeta?.count : 0}
      // >
      //   {isLoading ? (
      //     <Box
      //       sx={{
      //         display: "flex",
      //         alignItems: "center",
      //         justifyContent: "center",
      //         marginTop: "2em",
      //       }}
      //     >
      //       <LinearProgress />
      //     </Box>
      //   ) : (
      //     <List sx={{ display: isLoading ? "none" : "block" }}>
      //       {users
      //         ? users.map(
      //             (record: User, index) =>
      //               index < 6 && (
      //                 <ListItem
      //                   to={`/users/${record.id}`}
      //                   component={Link}
      //                   key={record.id}
      //                 >
      //                   <ListItemAvatar>
      //                     <Avatar
      //                       sx={{ bgcolor: "lemonchiffon" }}
      //                       src={`${
      //                         record.avatarUrl ? record.avatarUrl : record.avatar
      //                       }`}
      //                     >
      //                       <SupervisedUserCircleTwoToneIcon color="primary" />
      //                     </Avatar>
      //                   </ListItemAvatar>
      //                   <ListItemText primary={`${record.artistName}`} />
      //                 </ListItem>
      //               )
      //           )
      //         : null}
      //     </List>
      //   )}

      //   <Box flexGrow={1}>&nbsp;</Box>
      //   <Button
      //     sx={{ borderRadius: 0 }}
      //     component={Link}
      //     to="/users"
      //     size="small"
      //     color="primary"
      //   >
      //     <Box p={1} sx={{ color: "primary.main" }}>
      //       {translate("pos.dashboard.all_users")}
      //     </Box>
      //   </Button>
      // </CardWithIcon>
      <CardWithIcon
         to="/users"
         icon={SupervisedUserCircleTwoToneIcon}
         title={translate('pos.dashboard.new_users')}
         subtitle={data ? data.usersMeta?.count : 0}
      />
   );
};

export default TotalUsers;
