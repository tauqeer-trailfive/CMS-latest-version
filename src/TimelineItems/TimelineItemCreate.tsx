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
  if (!values.text) {
    errors.text = "ra.validation.required";
  }
  if (!values.type) {
    errors.type = "ra.validation.required";
  }
  return errors;
};

const TimelineItemCreate = () => {
  const translate = useTranslate();
  return (
    <Create redirect="list">
      <SimpleForm
        sx={{ maxWidth: 500, mx: 2, my: 2 }}
        defaultValues={{
          text: "",
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
          {translate("resources.timelineitems.fieldGroups.createTimelineitem")}
        </Typography>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <TextInput source="text" isRequired fullWidth />
          </Box>
        </Box>
        <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
          <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
            <SelectInput
              source="type"
              isRequired
              fullWidth
              choices={[
                { id: "NEWRECORDING", name: "NEWRECORDING" },
                { id: "NEWPROJECT", name: "NEWPROJECT" },
                { id: "NEWUSER", name: "NEWUSER" },
                { id: "NEWFOLLOWER", name: "NEWFOLLOWER" },
                { id: "NEWDERIVATIVE", name: "NEWDERIVATIVE" },
                { id: "LISTENPROJECT", name: "LISTENPROJECT" },
                { id: "DJAMMPROJECT", name: "DJAMMPROJECT" },
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

export default TimelineItemCreate;
