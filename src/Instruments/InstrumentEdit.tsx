import * as React from "react";
import {
  Edit,
  TextInput,
  SimpleForm,
  useTranslate,
  NumberInput,
} from "react-admin";
import { Grid, Box, Typography } from "@mui/material";

import Aside from "./Aside";
import FullNameField from "./IdField";
import { validateForm } from "./InstrumentCreate";

const InstrumentEdit = () => {
  const translate = useTranslate();
  return (
    <Edit title={<VisitorTitle />} aside={<Aside />}>
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
                {translate(
                  "resources.musicalInstruments.fieldGroups.editInstrument"
                )}
              </Typography>
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <TextInput source="name" isRequired fullWidth />
                </Box>
              </Box>
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <NumberInput
                    label="Rank"
                    source="rank"
                    min={0}
                    max={2}
                    fullWidth
                    isRequired
                  />
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

export default InstrumentEdit;
