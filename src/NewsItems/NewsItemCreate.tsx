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
  if (!values.title) {
    errors.title = "ra.validation.required";
  }
  if (!values.url) {
    errors.url = "ra.validation.required";
  }
  return errors;
};

const NewsItemCreate = () => {
  const translate = useTranslate();
  return (
    <Create redirect="list">
      <SimpleForm
        sx={{ maxWidth: 500, mx: 2, my: 2 }}
        defaultValues={{
          title: "",
          description: "",
          url: "",
          imageCoverPath: "",
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
          {translate("resources.newsitems.fieldGroups.CreateNewsItem")}
        </Typography>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="title" isRequired fullWidth />
          </Box>
        </Box>
        <TextInput source="description" isRequired fullWidth />
        <TextInput source="url" isRequired fullWidth />
        <TextInput source="imageCoverPath" isRequired fullWidth />
        <Separator />
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

export default NewsItemCreate;
