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
        borderRadius: 0.4,
        // border: "1px solid #909090",
        width: 600,
        margin: "auto",
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
          {/* <ReferenceField reference="commands" source="command_id" link={false}> */}
          <Basket />
          {/* <Table>
            <TableHead>
              <TableRow>
                <TableCell>Contest</TableCell>
                <TableCellRight>Project</TableCellRight>
                <TableCellRight>Highlighted</TableCellRight>
              </TableRow>
            </TableHead>
            <TableBody></TableBody>
          </Table> */}
          {/* </ReferenceField> */}
        </Box>
        {/* <Box margin="10px 0">
          <Stack direction="row" gap={1} flexWrap="wrap">
            {record.submittedProjects.map((sp) => (
              <Chip key={sp.id} label={sp.highlighted} />
            ))}
          </Stack>
        </Box> */}
      </CardContent>
    </Card>
  );
};

const ContestDescriptionField = () => {
  const record = useRecordContext<Contest>();
  return record ? (
    <>
      <Typography variant="h6" align="left" fontWeight={"400"}>
        Description :
      </Typography>
      <Typography variant="body2" align="left" fontWeight={"300"}>
        <br />
        {record.description}
        {/* <br />
      {record.description}, {record.description} */}
      </Typography>
    </>
  ) : null;
};

export default ContestShow;
