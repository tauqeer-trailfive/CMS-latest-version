import * as React from "react";
import { SxProps, Typography } from "@mui/material";
import { memo } from "react";

import { FieldProps, useRecordContext } from "react-admin";
import { Track } from "../types";

interface Props extends FieldProps<Track> {
  size?: string;
  sx?: SxProps;
}

const IdField = (props: Props) => {
  const { size } = props;
  const record = useRecordContext<Track>();
  return record ? (
    <Typography
      variant="body2"
      display="flex"
      flexWrap="nowrap"
      alignItems="center"
      component="div"
      sx={props.sx}
    >
      {record.id}
    </Typography>
  ) : null;
};

IdField.defaultProps = {
  source: "id" as const,
  label: "resources.tracks.fields.id",
};

export default memo<Props>(IdField);
