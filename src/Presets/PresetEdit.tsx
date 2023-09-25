import * as React from "react";
import {
  Edit,
  TextInput,
  SimpleForm,
  useTranslate,
  NumberInput,
  SelectInput,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  AutocompleteInput,
} from "react-admin";
import { Grid, Box, Typography, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircleTwoTone";
import MinusIcon from "@mui/icons-material/RemoveCircleTwoTone";

import Aside from "./Aside";
import FullNameField from "./IdField";
import { validateForm } from "./PresetCreate";

const PresetEdit = () => {
  const translate = useTranslate();
  return (
    <Edit title={<PresetTitle />}>
      <SimpleForm validate={validateForm} sx={{ mx: 2, my: 2 }}>
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
                {translate("resources.presets.fieldGroups.editPreset")}
              </Typography>
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <TextInput source="name" isRequired fullWidth />
                </Box>
              </Box>

              <SelectInput
                source="category"
                isRequired
                fullWidth
                choices={[
                  { id: "GUITAR", name: "GUITAR" },
                  { id: "BASS", name: "BASS" },
                  { id: "DRAMM", name: "DRAMM" },
                  { id: "UKULELE", name: "UKULELE" },
                  { id: "MASTERBUS", name: "MASTERBUS" },
                ]}
              />
              <Box mt="1em" />
              <ArrayInput source="effects" label="Effects (Search by name)">
                <SimpleFormIterator
                  disableReordering={true}
                  fullWidth
                  addButton={
                    <IconButton title="Add Effect">
                      <AddIcon color="success" />
                    </IconButton>
                  }
                  removeButton={
                    <IconButton title="Remove Effect">
                      <MinusIcon color="secondary" />
                    </IconButton>
                  }
                  disableClear
                >
                  <ReferenceInput
                    label="effects"
                    source="id"
                    reference="effects"
                  >
                    <AutocompleteInput
                      optionText={(choice) =>
                        `${choice.name}  /  ${choice.typeOfEffect}  /  (${choice.id})`
                      }
                      optionValue="id"
                      label="Name / typeOfEffect / id"
                      fullWidth
                      noOptionsText="Effect does'nt exist."
                    />
                  </ReferenceInput>
                </SimpleFormIterator>
              </ArrayInput>
            </Grid>
            <Grid item xs={12} md={4}></Grid>
          </Grid>
        </div>
      </SimpleForm>
    </Edit>
  );
};

const PresetTitle = () => <FullNameField size="32" sx={{ margin: "5px 0" }} />;

export default PresetEdit;
