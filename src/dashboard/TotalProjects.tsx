import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  CircularProgress,
  Stack,
} from "@mui/material";
import UserIcon from "@mui/icons-material/PersonAdd";
import { Link } from "react-router-dom";
import { useTranslate, useGetList, LinearProgress } from "react-admin";
import { subDays } from "date-fns";

import CardWithIcon from "./CardWithIcon";
import GroupWorkTwoToneIcon from "@mui/icons-material/GroupWorkTwoTone";
import { Project } from "../types";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";

const TotalProjects = () => {
  const translate = useTranslate();

  const { isLoading, data: projects } = useGetList<Project>("projects", {
    filter: {
      status: "PUBLISHED",
      owner: {
        role: "USER",
      },
    },
    sort: { field: "createdAt", order: "DESC" },
    pagination: { page: 1, perPage: 6 },
  });

  const GET_PROJECTS_COUNT = gql`
    query AllProjects {
      projectsMeta {
        count
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_PROJECTS_COUNT);

  const project_count = projects ? projects.reduce((nb: number) => ++nb, 0) : 0;

  return (
    // <CardWithIcon
    //   to="/projects"
    //   icon={GroupWorkTwoToneIcon}
    //   title={translate("pos.dashboard.new_projects")}
    //   subtitle={data ? data.projectsMeta?.count : 0}
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
    //       {projects
    //         ? projects.map(
    //             (record: Project, index) =>
    //               index < 6 && (
    //                 <ListItem
    //                   button
    //                   to={`/projects/${record.id}`}
    //                   component={Link}
    //                   key={record.id}
    //                 >
    //                   <ListItemAvatar>
    //                     <Avatar
    //                       sx={{ bgcolor: "lemonchiffon" }}
    //                       src={`${record.mixdownScreen} ${record.status}`}
    //                     >
    //                       <GroupWorkTwoToneIcon color="primary" />
    //                     </Avatar>
    //                   </ListItemAvatar>
    //                   <ListItemText primary={`${record.name}`} />
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
    //     to="/projects"
    //     size="small"
    //     color={"info"}
    //   >
    //     <Box p={1} sx={{ color: "primary.main" }}>
    //       {translate("pos.dashboard.all_projects")}
    //     </Box>
    //   </Button>
    // </CardWithIcon>
    <CardWithIcon
      to="/projects"
      icon={GroupWorkTwoToneIcon}
      title={translate("pos.dashboard.new_projects")}
      subtitle={data ? data.projectsMeta?.count : 0}
    />
  );
};

export default TotalProjects;
