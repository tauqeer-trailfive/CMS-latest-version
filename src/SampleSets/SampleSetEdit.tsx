import * as React from "react";
import {
  Edit,
  TextInput,
  SimpleForm,
  useTranslate,
  NumberInput,
  SelectInput,
  AutocompleteInput,
  ReferenceInput,
  ReferenceArrayInput,
  AutocompleteArrayInput,
  ArrayInput,
  SimpleFormIterator,
} from "react-admin";
import { Grid, Box, Typography } from "@mui/material";

import Aside from "./Aside";
import IdField from "./IdField";
import { validateForm } from "./SampleSetCreate";

const SampleSetEdit = () => {
  const translate = useTranslate();
  return (
    <Edit title={<SampleSetTitle />} aside={<Aside />}>
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
                {translate("resources.samplesets.fieldGroups.editSampleset")}
              </Typography>
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <ReferenceInput
                    label="User"
                    source="owner.id"
                    reference="users"
                    filter={{ role: ["SUPERADMIN", "ADMIN", "USER", "ANON"] }}
                  >
                    <AutocompleteInput
                      optionText={(choice) =>
                        `${choice.name}  /  (${choice.artistName})  /  (${choice.id})`
                      }
                      optionValue="id"
                    />
                  </ReferenceInput>
                </Box>
              </Box>

              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <TextInput source="name" isRequired fullWidth />
                </Box>
              </Box>
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <TextInput source="description" fullWidth />
                </Box>
              </Box>
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <ReferenceInput
                    label="Genre"
                    source="genre.id"
                    reference="genres"
                  >
                    <AutocompleteInput optionText="name" />
                  </ReferenceInput>
                </Box>
              </Box>

              <ArrayInput source="samples">
                <SimpleFormIterator disableReordering={true} fullWidth>
                  <ReferenceInput
                    label="Sample"
                    source="id"
                    reference="samples"
                  >
                    <AutocompleteInput
                      optionText={(choice) =>
                        `${choice.name}  /  (${choice.id})`
                      }
                      fullWidth
                    />
                  </ReferenceInput>
                </SimpleFormIterator>
              </ArrayInput>
              <Box mt="1em" />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
          </Grid>
        </div>
      </SimpleForm>
    </Edit>
  );
};

const SampleSetTitle = () => <IdField size="32" sx={{ margin: "5px 0" }} />;

export default SampleSetEdit;
