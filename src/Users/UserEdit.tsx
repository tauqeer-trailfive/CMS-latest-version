import * as React from "react";
import {
  Edit,
  TextInput,
  SimpleForm,
  useTranslate,
  SelectInput,
} from "react-admin";
import { Grid, Box, Typography } from "@mui/material";

import Aside from "./Aside";
import FullNameField from "./NameField";
import { validateForm } from "./UserCreate";

const VisitorEdit = () => {
  const translate = useTranslate();
  return (
    <Edit title={<VisitorTitle />} aside={<Aside />}>
      <SimpleForm validate={validateForm}>
        <div>
          <Grid container width={{ xs: "100%", xl: 800 }} spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                {translate("resources.customers.fieldGroups.identity")}
              </Typography>
              <Box display={{ xs: "block", sm: "flex" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <TextInput source="name" label="Name" isRequired fullWidth />
                </Box>
                <Box flex={1} ml={{ xs: 0, sm: "0.5em" }}>
                  <TextInput
                    source="artistName"
                    label="Artist Name"
                    isRequired
                    fullWidth
                  />
                </Box>
              </Box>
              <TextInput type="email" source="email" isRequired fullWidth />

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
              <Box display={{ xs: "block", sm: "flex" }}>
                <Box flex={1}>
                  <TextInput source="bio" multiline rows={5} fullWidth />
                </Box>
              </Box>

              <Box mt="1em" />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
          </Grid>
        </div>
      </SimpleForm>
    </Edit>
  );
};

const VisitorTitle = () => <FullNameField size="32" sx={{ margin: "5px 0" }} />;

export default VisitorEdit;
