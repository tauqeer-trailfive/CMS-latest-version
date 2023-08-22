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

import CardWithIcon from "./CardWithIcon";
import PianoTwoToneIcon from "@mui/icons-material/PianoTwoTone";
import { Genre } from "../types";
import { useQuery } from "@apollo/client/react/hooks";
import gql from "graphql-tag";
import React from "react";

const TotalGenres = () => {
  const translate = useTranslate();

  const { isLoading, data: genres } = useGetList<Genre>("genres", {
    sort: { field: "rank", order: "DESC" },
    pagination: { page: 1, perPage: 6 },
  });

  const GET_GENRES_COUNT = gql`
    query Genres {
      genresMeta {
        count
      }
    }
  `;

  const { data } = useQuery(GET_GENRES_COUNT);

  return (
    // <CardWithIcon
    //   to="/genres"
    //   icon={PianoTwoToneIcon}
    //   title={translate("pos.dashboard.new_genres")}
    //   subtitle={data ? data.genresMeta?.count : 0}
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
    //       {genres
    //         ? genres.map(
    //             (record: Genre, index) =>
    //               index < 6 && (
    //                 <ListItem
    //                   button
    //                   to={`/genres/${record.id}`}
    //                   component={Link}
    //                   key={record.id}
    //                   sx={{
    //                     flexDirection: "row",
    //                     display: "flex",
    //                     alignItems: "center",
    //                     justifyContent: "space-around",
    //                     width: "100%",
    //                   }}
    //                 >
    //                   <ListItemAvatar>
    //                     <Avatar sx={{ bgcolor: "lemonchiffon" }}>
    //                       <PianoTwoToneIcon color="primary" />
    //                     </Avatar>
    //                   </ListItemAvatar>
    //                   <ListItemText
    //                     primary={`${record.name} -> ${record.rank} `}
    //                   />
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
    //     to="/genres"
    //     size="small"
    //     color="primary"
    //   >
    //     <Box p={1} sx={{ color: "primary.main" }}>
    //       {translate("pos.dashboard.all_genres")}
    //     </Box>
    //   </Button>
    // </CardWithIcon>
    <CardWithIcon
      to="/genres"
      icon={PianoTwoToneIcon}
      title={translate("pos.dashboard.new_genres")}
      subtitle={data ? data.genresMeta?.count : 0}
    />
  );
};

export default TotalGenres;
