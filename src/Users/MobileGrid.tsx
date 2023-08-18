// in src/comments.js
import * as React from "react";
import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import {
  DateField,
  EditButton,
  useTranslate,
  NumberField,
  RecordContextProvider,
  useListContext,
  ChipField,
  ArrayField,
  SingleFieldList,
} from "react-admin";

import AvatarField from "./AvatarField";
import { User } from "../types";

const MobileGrid = () => {
  const translate = useTranslate();
  const { data, isLoading } = useListContext<User>();

  if (isLoading || data.length === 0) {
    return null;
  }

  return (
    <Box margin="0.5em">
      {data.map((record) => (
        <RecordContextProvider key={record.id} value={record}>
          <Card sx={{ margin: "0.5rem 0" }}>
            <CardHeader
              title={`${record.artistName}`}
              subheader={
                <>
                  Created At&nbsp; &#45;&gt; &nbsp;
                  <DateField source="createdAt" />
                </>
              }
              avatar={<AvatarField size="45" />}
              action={<EditButton />}
            />
            <CardContent sx={{ pt: 0 }}>
              <Typography variant="body2">
                Email :&nbsp;
                <NumberField source="email" />
              </Typography>
              <Typography variant="body2">
                Role :&nbsp;
                <ChipField source="role" />
              </Typography>
              <Typography variant="body2">
                Musical Instrument :
                <ArrayField source="musicalInstruments">
                  <SingleFieldList linkType={false}>
                    <ChipField source="name" size="small" />
                  </SingleFieldList>
                </ArrayField>
              </Typography>
            </CardContent>
          </Card>
        </RecordContextProvider>
      ))}
    </Box>
  );
};

export default MobileGrid;
