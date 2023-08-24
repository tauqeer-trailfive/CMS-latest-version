import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  useTranslate,
  PasswordInput,
  email,
  SelectInput,
  NumberInput,
} from "react-admin";
import { Box, Typography } from "@mui/material";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;
  if (!values.name) {
    errors.name = "ra.validation.required";
  }
  return errors;
};

const EffectCreate = () => {
  const translate = useTranslate();
  return (
    <Create redirect="list">
      <SimpleForm
        sx={{ maxWidth: 500 }}
        defaultValues={{
          name: "",
        }}
        validate={validateForm}
      >
        <Typography
          variant="h4"
          gutterBottom
          color={"primary"}
          align="left"
          fontWeight={"900"}
        >
          {translate("resources.effects.fieldGroups.CreateEffect")}
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
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <SelectInput
              source="typeOfEffect"
              isRequired
              fullWidth
              choices={[
                { id: "DELAYBPM", name: "DELAYBPM" },
                { id: "DELAY", name: "DELAY" },
                { id: "REVERB", name: "REVERB" },
                { id: "EQUALIZER", name: "EQUALIZER" },
                { id: "COMPRESSOR", name: "COMPRESSOR" },
                { id: "COMPRESSORMASTERBUS", name: "COMPRESSORMASTERBUS" },
                { id: "LIMITER", name: "LIMITER" },
              ]}
            />
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

export default EffectCreate;
