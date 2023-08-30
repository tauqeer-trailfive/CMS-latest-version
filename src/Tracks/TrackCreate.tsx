import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  useTranslate,
  PasswordInput,
  email,
  SelectInput,
  AutocompleteInput,
  BooleanInput,
  NumberInput,
  ReferenceInput,
} from "react-admin";
import { Box, Typography } from "@mui/material";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;
  if (!values.order) {
    errors.order = "ra.validation.required";
  }
  if (!values.pan) {
    errors.pan = "ra.validation.required";
  }
  if (!values.volume) {
    errors.volume = "ra.validation.required";
  }
  // if (!values.project.id) {
  //   errors.project.id = "ra.validation.required";
  // }
  return errors;
};

const TrackCreate = () => {
  const translate = useTranslate();
  return (
    <Create redirect="list">
      <SimpleForm
        sx={{ maxWidth: 500 }}
        // Here for the GQL provider
        defaultValues={{
          order: 0,
          volume: 0,
          pan: 0,
          isMuted: false,
          isSolo: false,
        }}
        validate={validateForm}
      >
        <Typography
          variant="h4"
          gutterBottom
          color={"primary"}
          align="left"
          fontWeight={"800"}
        >
          {translate("resources.tracks.fieldGroups.createTrack")}
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
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <ReferenceInput
              label="Project"
              source="project"
              reference="projects"
              isRequired
            >
              <AutocompleteInput
                optionText={(choice) => `${choice.name}  /  (${choice.id})`}
                optionValue="id"
              />
            </ReferenceInput>
          </Box>
        </Box>
      </SimpleForm>
    </Create>
  );
};

const SectionTitle = ({ label }: { label: string }) => {
  const translate = useTranslate();

  return (
    <Typography variant="h6" gutterBottom>
      {translate(label as string)}
    </Typography>
  );
};

const Separator = () => <Box pt="1em" />;

export default TrackCreate;
