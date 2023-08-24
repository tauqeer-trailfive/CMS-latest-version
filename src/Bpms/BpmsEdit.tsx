import * as React from "react";
import {
  Edit,
  SimpleForm,
  useTranslate,
  NumberInput,
  useInput,
} from "react-admin";
import { Grid, Box, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import Aside from "./Aside";
import FullNameField from "./IdField";
import { validateForm } from "./BpmsCreate";
import BPMEAUDIOUploaders from "./BPMEUploaders/BPMEAUDIOUploaders";

const BpmsEdit = () => {
  const translate = useTranslate();
  const { id } = useParams();

  const AudioInput = ({ source, label }: any) => {
    const { id, field, fieldState } = useInput({ source });
    return (
      <label htmlFor={id}>
        {label}
        {/* <input id={id} {...field}/> */}
        <audio id={id} {...field} src={field.value} controls />
        {fieldState.error && <span>{fieldState.error.message}</span>}
      </label>
    );
  };
  return (
    <Edit title={<BpmsTitle />} aside={<Aside />}>
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
                {translate("resources.effects.fieldGroups.EditEffect")}
              </Typography>
              <Box display={{ xs: "block", sm: "flex", width: "100%" }}>
                <Box flex={1} mr={{ xs: 0, sm: "0.5em" }}>
                  <NumberInput source="value" isRequired fullWidth />
                </Box>
              </Box>
              <Box mt="1em" />
              <AudioInput source="audioUrl" label={""} />
              <BPMEAUDIOUploaders BPMId={id} />
            </Grid>
            <Grid item xs={12} md={4}></Grid>
          </Grid>
        </div>
      </SimpleForm>
    </Edit>
  );
};

const SectionTitle = ({ label }: { label: string }) => {
  const translate = useTranslate();

  return (
    <Typography variant="button" gutterBottom>
      {translate(label as string)}
    </Typography>
  );
};

const BpmsTitle = () => <FullNameField size="32" sx={{ margin: "5px 0" }} />;

export default BpmsEdit;
