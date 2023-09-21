import * as React from "react";
import {
  Edit,
  TextInput,
  SimpleForm,
  useTranslate,
  BooleanInput,
  ReferenceInput,
  AutocompleteInput,
  ArrayInput,
  SimpleFormIterator,
  useNotify,
  useRefresh,
  useRedirect,
  DateTimeInput,
  useGetOne,
  ImageField,
} from "react-admin";
import { Box, Typography, Divider } from "@mui/material";

import IdField from "./IdField";
import { validateForm } from "./PlaylistCreate";
import { useMutation, gql } from "@apollo/client";
import PECoverImageUploader from "./PECoverImageUploader/PECoverImageUploader";
import { useParams } from "react-router";

const UPDATE_PLAYLIST_PROJECT = gql`
  mutation updatePlaylistProjectsOrder(
    $playlistId: ID!
    $projects: [PlaylistProjectsReorderInput!]!
  ) {
    updatePlaylistProjectsOrder(playlistId: $playlistId, projects: $projects) {
      id
    }
  }
`;

const PlaylistEdit = () => {
  const { id } = useParams();
  const translate = useTranslate();
  const { data: playlist } = useGetOne("playlists", { id: id });
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const [checked, setChecked] = React.useState(false);

  const [update_project_playlist, { error: prjectsError }] = useMutation(
    UPDATE_PLAYLIST_PROJECT
  );

  function reordering_projects(projects) {
    const idProjects = projects;
    const arrOfId: any[] = [];
    let playlistProjectId;
    let DropDate;
    let AdditionDate;
    let loopcount = 0;
    if (idProjects && idProjects.length !== 0) {
      for (const id of idProjects) {
        if (id.dropDate) {
          DropDate = new Date(id.dropDate).toISOString();
        } else {
          DropDate = null;
        }
        if (id.additionDate) {
          AdditionDate = new Date(id.additionDate).toISOString();
        } else {
          AdditionDate = null;
        }
        playlistProjectId = id.id;
        if (playlistProjectId) {
          playlistProjectId: id.id;
        }
        if (playlistProjectId == undefined) {
          playlistProjectId = "";
        }
        arrOfId.push({
          playlistProjectId: playlistProjectId,
          sortOrder: loopcount,
          dropDate: DropDate,
          additionDate: AdditionDate,
          projectId: id.project.id,
        });
        loopcount++;
      }
    }
    return arrOfId;
  }

  const onSuccess = (data, projects) => {
    let reordered_list = reordering_projects(projects.data.orderedProjects);
    if (projects.data.update_playlist_projects) {
      update_project_playlist({
        variables: {
          playlistId: data.id,
          projects: reordered_list,
        },
      });
      if (prjectsError) {
        notify(`${prjectsError}`);
        redirect(`/playlists`);
      }
    }
    refresh();
    notify(`Changes saved`);
    redirect(`/playlists`);
    refresh();
  };

  return (
    <Edit
      title={<PlaylistTitle />}
      mutationOptions={{ onSuccess }}
      mutationMode="pessimistic"
    >
      <SimpleForm validate={validateForm} maxWidth={500} sx={{ mx: 2, my: 2 }}>
        <Typography
          variant="h4"
          gutterBottom
          color={"primary"}
          align="left"
          fontWeight={"900"}
        >
          {translate("resources.playlists.fieldGroups.editPlaylist")}
        </Typography>

        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="name" isRequired fullWidth />
          </Box>
        </Box>
        <Separator />
        <ImageField source="imageUrl" />
        <Separator />
        <PECoverImageUploader PlaylistID={id} ownerID={playlist?.owner?.id} />
        <Separator />
        <BooleanInput source="public" fullWidth color="primary" />
        <Separator />

        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <ReferenceInput label="User" source="owner.id" reference="users">
              <AutocompleteInput
                optionText={(choice) =>
                  `${choice.name}  /  (${choice.artistName})  /  (${choice.id})`
                }
                optionValue="id"
              />
            </ReferenceInput>
          </Box>
        </Box>

        <Separator />
        <Divider variant="fullWidth" component="br" />

        <Typography variant="button" display={"block"} color="primary">
          {translate("resources.playlists.fields.update")}
        </Typography>
        <Divider variant="fullWidth" component="br" />

        <BooleanInput
          source="update_playlist_projects"
          fullWidth
          checked={checked}
          onChange={(event: React.ChangeEvent<any>) => {
            setChecked(event.target.checked);
          }}
          color="primary"
        />

        <Divider variant="fullWidth" component="br" />
        {checked ? (
          <>
            {" "}
            <ArrayInput source="orderedProjects">
              <SimpleFormIterator fullWidth>
                <ReferenceInput
                  label="Project"
                  source="project.id"
                  reference="projects"
                  filter={{ status: "PUBLISHED" }}
                >
                  <AutocompleteInput
                    source="id"
                    filterToQuery={(searchText) => ({ name: `${searchText}` })}
                    optionText={(choice) =>
                      `${choice.name}  /  (${choice.owner.artistName})  /  (${choice.id})`
                    }
                    optionValue="id"
                    fullWidth
                  />
                </ReferenceInput>
                <DateTimeInput
                  label="Addition Date"
                  source="additionDate"
                  defaultValue={new Date()}
                  fullWidth
                />
                <DateTimeInput
                  label="Drop Date"
                  source="dropDate"
                  defaultValue={""}
                  fullWidth
                />
              </SimpleFormIterator>
            </ArrayInput>
          </>
        ) : (
          <></>
        )}
      </SimpleForm>
    </Edit>
  );
};

const PlaylistTitle = () => <IdField size="32" sx={{ margin: "5px 0" }} />;

const Separator = () => <Box pt="1em" />;

export default PlaylistEdit;
