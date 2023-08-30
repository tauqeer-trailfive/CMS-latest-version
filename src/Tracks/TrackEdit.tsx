import * as React from "react";
import {
  Edit,
  SimpleForm,
  useTranslate,
  useGetOne,
  BooleanInput,
  NumberInput,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import { useParams } from "react-router-dom";
import { Grid, Box, Typography, Modal } from "@mui/material";

import Aside from "./Aside";
import FullNameField from "./IdField";
import { validateForm } from "./TrackCreate";

const TrackEdit = () => {
  const translate = useTranslate();

  return (
    <Edit title={<UserTitle />} aside={<Aside />}>
      <SimpleForm validate={validateForm}>
        <div>
          <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography
                variant="h4"
                gutterBottom
                color={"primary"}
                align="left"
                fontWeight={"800"}
              >
                {translate("resources.tracks.fieldGroups.editTrack")}
              </Typography>
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <NumberInput source="order" fullWidth />
                </Box>

                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <NumberInput source="volume" fullWidth />
                </Box>
              </Box>
              <Separator />
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <BooleanInput
                    source="isMuted"
                    label="resources.tracks.fields.is_muted"
                    defaultValue={false}
                    color="primary"
                  />
                </Box>

                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <BooleanInput
                    source="isSolo"
                    label="resources.tracks.fields.is_solo"
                    defaultValue={false}
                    color="primary"
                  />
                </Box>
              </Box>
              <Separator />
              <NumberInput source="pan" fullWidth />
              <Separator />
              <ReferenceInput
                label="Project"
                source="project.id"
                reference="projects"
              >
                <AutocompleteInput
                  optionText={(choice) => `${choice.name}  /  (${choice.id})`}
                  optionValue="id"
                />
              </ReferenceInput>
            </Grid>
          </Grid>
          <Box mt="1em" />
          {/*  */}
        </div>
      </SimpleForm>
    </Edit>
  );
};

const UserTitle = () => <FullNameField size="32" sx={{ margin: "5px 0" }} />;
const Separator = () => <Box pt="1em" />;

export default TrackEdit;
