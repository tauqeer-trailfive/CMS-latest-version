import * as React from "react";
import {
  Edit,
  TextInput,
  SimpleForm,
  useTranslate,
  NumberInput,
  SelectInput,
} from "react-admin";
import { Grid, Box, Typography } from "@mui/material";

import Aside from "./Aside";
import IdField from "./IdField";
import { validateForm } from "./ProjectCreate";

const typesofEffects = [
  { id: "DELAYBPM", name: "DELAYBPM" },
  { id: "DELAY", name: "DELAY" },
  { id: "REVERB", name: "REVERB" },
  { id: "EQUALIZER", name: "EQUALIZER" },
  { id: "COMPRESSOR", name: "COMPRESSOR" },
  {
    id: "COMPRESSORMASTERBUS",
    name: "COMPRESSORMASTERBUS",
  },
  { id: "LIMITER", name: "LIMITER" },
];
const ProjectEdit = () => {
  const translate = useTranslate();
  return (
    <Edit title={<ProjectTitle />} aside={<Aside />}>
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
                {translate("resources.effects.fieldGroups.EditEffect")}
              </Typography>
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <TextInput source="name" isRequired fullWidth />
                </Box>
              </Box>
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <TextInput source="effectValues" isRequired fullWidth />
                </Box>
              </Box>

              <SelectInput
                source="typeOfEffect"
                isRequired
                fullWidth
                choices={typesofEffects}
              />
              <Box mt="1em" />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
          </Grid>
        </div>
      </SimpleForm>
    </Edit>
  );
};

const ProjectTitle = () => <IdField size="32" sx={{ margin: "5px 0" }} />;

export default ProjectEdit;
