import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Grid,
  tableCellClasses,
  Typography,
} from "@mui/material";
import {
  ReferenceField,
  TextField,
  useRecordContext,
  List,
  Link,
  useTranslate,
} from "react-admin";
import { Stack, Chip } from "@mui/material";
import { Sample } from "../types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

import { TableCellRight } from "./TableCellRight";
import { TableCellLeft } from "./TableCellLeft";

const Separator = () => <Box pt="1em" />;

const AudioInput = (props) => {
  return <audio src={props.source} controls />;
};

const SampleShow = () => {
  const record = useRecordContext<Sample>();
  const translate = useTranslate();
  if (!record) return null;
  return (
    <Card
      sx={{
        margin: "auto",
        boxShadow: 6,
        borderRadius: 1,
        // border: "1px solid #909090",
        // paddingY: 1,
        // paddingX: 5,
        width: "auto",
        mx: 20,
        my: 1,
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              fontWeight={"900"}
              variant="h5"
              gutterBottom
              align="center"
            >
              {record.name}
            </Typography>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              fontWeight={"400"}
              variant="h6"
              gutterBottom
              align="center"
            >
              SampleSets Linked
            </Typography>
          </Grid>
        </Grid>
        <Box
          margin="10px 0"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack direction="row" gap={1} flexWrap="wrap">
            {record.sets.map((set) => (
              <Chip
                key={set.id}
                label={set.name}
                variant="outlined"
                color="primary"
              />
            ))}
          </Stack>
        </Box>
        <Box height={20}>&nbsp;</Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              fontWeight={"400"}
              variant="h6"
              gutterBottom
              align="center"
            >
              BPM Values Linked
            </Typography>
          </Grid>
        </Grid>
        <Box margin="10px 0">
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  {translate("resources.samples.fields.basket.id")}
                </TableCell>
                <TableCellRight>
                  {translate("resources.samples.fields.basket.value")}
                </TableCellRight>
                <TableCellRight>
                  {translate("resources.samples.fields.basket.audioUrl")}
                </TableCellRight>
                {/* <TableCellRight>
                  {translate("resources.samples.fields.basket.mp3Url")}
                </TableCellRight> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {record.bpmTemp.map((bpm: any) => (
                <TableRow key={bpm.id}>
                  <TableCell>
                    <Link to={`/bpmTemp/${bpm.id}`}>{bpm.id}</Link>
                  </TableCell>
                  <TableCellRight>{bpm.value}</TableCellRight>
                  <TableCellRight>
                    {bpm.audioUrl ? (
                      // <AudioPlayer audioUrl={bpm.audioUrl} title="Audio Play" />
                      <AudioInput source={bpm.audioUrl} />
                    ) : (
                      <p>File Not Available</p>
                    )}
                  </TableCellRight>
                  {/* <TableCellRight>
                    {bpm.mp3Url ? (
                      // <audio src={bpm.audioUrl} controls />
                      <AudioPlayer audioUrl={bpm.mp3Url} title="Audio Play" />
                    ) : (
                      <p>File Not Available</p>
                    )}
                  </TableCellRight> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* <Stack direction="row" gap={1} flexWrap="wrap">
            {record.bpmTemp.map((bpm) => (
              //   <Chip key={`${bpm.id}`} label={`${bpm.value}`} />
              <Chip key={bpm.id} label={bpm.value} />
            ))}
          </Stack> */}
        </Box>
      </CardContent>
      {/* <AudioInput source={""} label={""} /> */}
    </Card>
  );
};

export default SampleShow;
