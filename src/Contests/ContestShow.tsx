import * as React from "react";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import {
  ReferenceField,
  TextField,
  useRecordContext,
  List,
  ArrayField,
  ChipField,
  BooleanField,
} from "react-admin";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Stack, Chip } from "@mui/material";
import { TableCellRight } from "./TableCellRight";
import { Contest } from "../types";
import Basket from "./Basket";

const ContestShow = () => {
  const record = useRecordContext<Contest>();
  if (!record) return null;
  return (
    <Card
      sx={{
        boxShadow: 6,
        padding: 5,
        marginBottom: 5,
        borderRadius: 1,
        // border: "1px solid #909090",
        width: "auto",
        mx: 20,
        my: 1,
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          {/* <Grid item xs={6}>
            <Typography variant="h6" gutterBottom>
              DJANMINN CMS
            </Typography>
          </Grid> */}
          <Grid item xs={12}>
            <Typography
              variant="h5"
              gutterBottom
              align="left"
              fontWeight={"800"}
            >
              {record.title}
              {/* {record.submittedProjects} */}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} container alignContent="flex-end">
            <ContestDescriptionField />
          </Grid>
        </Grid>
        <Box height={20}>&nbsp;</Box>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              gutterBottom
              align="left"
              fontWeight={"400"}
            >
              Submitted Projects
            </Typography>
          </Grid>
        </Grid>
        <Box margin="10px 0">
          <Basket />
        </Box>
      </CardContent>
    </Card>
  );
};

const ContestDescriptionField = () => {
  const record = useRecordContext<Contest>();
  return record ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        justifyContent: "center",
        gap: 2,
      }}
    >
      <Typography variant="h6" align="left" fontWeight={"400"}>
        Description :
      </Typography>
      <Typography variant="body1" fontWeight={"200"}>
        {record.description}
      </Typography>
    </Box>
  ) : null;
};

export default ContestShow;
