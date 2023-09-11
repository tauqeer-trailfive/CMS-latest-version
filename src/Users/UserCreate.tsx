import * as React from "react";
import {
  Create,
  SimpleForm,
  TextInput,
  useTranslate,
  PasswordInput,
  email,
  SelectInput,
} from "react-admin";
import { Box, Typography } from "@mui/material";

export const validateForm = (
  values: Record<string, any>
): Record<string, any> => {
  const errors = {} as any;
  if (!values.name) {
    errors.name = "ra.validation.required";
  }
  if (!values.role) {
    errors.role = "ra.validation.required";
  }
  if (!values.artistName) {
    errors.artistName = "ra.validation.required";
  }
  // if (!values.avatarUrl) {
  //   errors.avatarUrl = "ra.validation.required";
  // }
  if (!values.email) {
    errors.email = "ra.validation.required";
  } else {
    const error = email()(values.email);
    if (error) {
      errors.email = error;
    }
  }
  return errors;
};

const UserCreate = () => {
  const translate = useTranslate();
  return (
    <Create redirect="list">
      <SimpleForm
        sx={{ maxWidth: 500, mx: 2, my: 2 }}
        // Here for the GQL provider
        defaultValues={{
          name: "",
          artistName: "",
          email: "",
          role: "",
          password: "",
          // avatarUrl: "",
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
          {translate("resources.users.fieldGroups.createUser")}
        </Typography>
        <TextInput source="name" isRequired fullWidth />
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box display={{ xs: "block", sm: "flex" }}>
            <Box flex={1}>
              <SelectInput
                source="role"
                isRequired
                fullWidth
                choices={[
                  { id: "QA", name: "QA" },
                  { id: "SUPERADMIN", name: "SUPERADMIN" },
                  { id: "CONTENTCREATOR", name: "CONTENTCREATOR" },
                  { id: "SERVICE", name: "SERVICE" },
                  { id: "ADMIN", name: "ADMIN" },
                  { id: "USER", name: "USER" },
                  { id: "ANON", name: "ANON" },
                ]}
              />
            </Box>
          </Box>
          <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="artistName" isRequired fullWidth />
          </Box>
        </Box>
        <TextInput type="email" source="email" isRequired fullWidth />
        <Separator />
        <PasswordInput source="password" fullWidth />
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

export default UserCreate;
