import * as React from "react";
import {
  Edit,
  TextInput,
  SimpleForm,
  useTranslate,
  NumberInput,
  SelectInput,
  DateInput,
} from "react-admin";
import { Grid, Box, Typography } from "@mui/material";

import Aside from "./Aside";
import IdField from "./IdField";
import { validateForm } from "./NewsItemCreate";

const NewsItemEdit = () => {
  const translate = useTranslate();
  return (
    <Edit title={<NewsItemTitle />}>
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
                {translate("resources.newsitems.fieldGroups.EditNewsItem")}
              </Typography>
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <TextInput source="title" isRequired fullWidth />
                </Box>
              </Box>
              <TextInput source="description" isRequired fullWidth />
              <TextInput source="url" isRequired fullWidth />
              <TextInput source="imageCoverPath" isRequired fullWidth />
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <DateInput source="publicationStart" type="date" />
                </Box>
              </Box>
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <DateInput source="publicationEnd" type="date" />
                </Box>
              </Box>
              <Box mt="1em" />
            </Grid>
          </Grid>
        </div>
      </SimpleForm>
    </Edit>
  );
};

const NewsItemTitle = () => <IdField size="32" sx={{ margin: "5px 0" }} />;

export default NewsItemEdit;
