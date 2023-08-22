import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslate, useGetList, LinearProgress } from "react-admin";
import { subDays } from "date-fns";

import CardWithIcon from "./CardWithIcon";
import { Track } from "../types";

import LyricsTwoToneIcon from "@mui/icons-material/LyricsTwoTone";
import { useQuery } from "@apollo/client/react";
import gql from "graphql-tag";
import React from "react";

const TotalTracks = () => {
  const translate = useTranslate();

  const { isLoading, data: tracks } = useGetList<Track>("tracks", {
    sort: { field: "createdAt", order: "DESC" },
    pagination: { page: 1, perPage: 6 },
  });

  const GET_TRACKS_COUNT = gql`
    query AllTracks {
      trackMeta {
        count
      }
    }
  `;

  const { data } = useQuery(GET_TRACKS_COUNT);

  return (
    // <CardWithIcon
    //   to="/tracks"
    //   icon={LyricsTwoToneIcon}
    //   title={translate("pos.dashboard.new_tracks")}
    //   subtitle={data ? data.trackMeta?.count : 0}
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
    //       {tracks
    //         ? tracks.map(
    //             (record: Track, index) =>
    //               index < 6 && (
    //                 <ListItem
    //                   button
    //                   to={`/tracks/${record.id}`}
    //                   component={Link}
    //                   key={record.id}
    //                 >
    //                   <ListItemAvatar>
    //                     <Avatar sx={{ bgcolor: "lemonchiffon" }}>
    //                       <LyricsTwoToneIcon color="primary" />
    //                     </Avatar>
    //                   </ListItemAvatar>
    //                   <ListItemText primary={`${record.id}`} />
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
    //     to="/tracks"
    //     size="small"
    //     color="primary"
    //   >
    //     <Box p={1} sx={{ color: "primary.main" }}>
    //       {translate("pos.dashboard.all_tracks")}
    //     </Box>
    //   </Button>
    // </CardWithIcon>
    <CardWithIcon
      to="/tracks"
      icon={LyricsTwoToneIcon}
      title={translate("pos.dashboard.new_tracks")}
      subtitle={data ? data.trackMeta?.count : 0}
    />
  );
};

export default TotalTracks;
