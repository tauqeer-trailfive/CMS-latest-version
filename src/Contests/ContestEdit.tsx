import * as React from "react";
import {
  Edit,
  TextInput,
  SimpleForm,
  useTranslate,
  BooleanInput,
  DateInput,
} from "react-admin";
import { useParams } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
import Aside from "./Aside";
import IdField from "./IdField";
import { validateForm } from "./ContestCreate";

const ContestEdit = () => {
  const translate = useTranslate();
  const { id } = useParams();

  return (
    <Edit title={<UserTitle />} aside={<Aside />}>
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
                {translate("resources.contests.fieldGroups.EditContest")}
              </Typography>
              <TextInput source="title" isRequired fullWidth />
              <TextInput
                source="termsAndConds"
                multiline
                isRequired
                fullWidth
              />
              <TextInput source="prize" multiline isRequired fullWidth />
              <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
              >
                <Grid item xs={6}>
                  <DateInput
                    source="startDate"
                    type="date"
                    defaultValue={new Date()}
                  />
                </Grid>
                <Grid item xs={6}>
                  <DateInput
                    source="endDate"
                    type="date"
                    defaultValue={new Date()}
                  />
                </Grid>
              </Grid>
              {/* <TextInput source="baseProject" fullWidth /> */}
              <BooleanInput
                label="Allow Track Upload"
                source="allowTrackUpload"
              />
              <SectionTitle label="resources.contests.fields.contestMedia" />
            </Grid>
          </Grid>
          <Box mt="1em" />
        </div>
      </SimpleForm>
    </Edit>
  );
};

const UserTitle = () => <IdField size="32" sx={{ margin: "5px 0" }} />;

const SectionTitle = ({ label }: { label: string }) => {
  const translate = useTranslate();

  return (
    <Typography variant="button" gutterBottom color={"lightpink"}>
      {translate(label as string)}
    </Typography>
  );
};

export default ContestEdit;
