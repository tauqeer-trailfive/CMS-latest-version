import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  useTranslate,
  ImageField,
  ArrayInput,
  SimpleFormIterator,
  ReferenceInput,
  AutocompleteInput,
  BooleanInput,
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

const GroupCreate = () => {
  const translate = useTranslate();
  return (
    <Create redirect="list">
      <SimpleForm
        sx={{ maxWidth: 500, mx: 2, my: 2 }}
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
          {translate("resources.groups.fieldGroups.CreateGroup")}
        </Typography>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                <TextInput source="name" isRequired fullWidth />
              </Box>
            </Box>
          </Box>
        </Box>
        <Separator />
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                <TextInput
                  source="description"
                  isRequired
                  fullWidth
                  multiline
                  rows={5}
                />
              </Box>
            </Box>
          </Box>
        </Box>
        <Separator />
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
              <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                <ImageField source="avatarUrl" />
              </Box>
            </Box>
          </Box>
        </Box>
        <Separator />
        <ArrayInput source="members">
          <SimpleFormIterator disableReordering fullWidth>
            <ReferenceInput label="User" source="user.id" reference="users">
              <AutocompleteInput
                source="id"
                filterToQuery={(searchText) => ({
                  artistName: `${searchText}`,
                })}
                optionText={(choice) =>
                  `${choice.name}  /  (${choice.artistName})  /  (${choice.id})`
                }
                optionValue="id"
                fullWidth
              />
            </ReferenceInput>
          </SimpleFormIterator>
        </ArrayInput>
        <Separator />
        <BooleanInput source="isPublic" />
      </SimpleForm>
    </Create>
  );
};

const Separator = () => <Box pt="1em" />;

export default GroupCreate;
