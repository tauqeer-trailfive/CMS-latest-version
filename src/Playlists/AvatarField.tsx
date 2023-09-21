import * as React from "react";
import { Avatar, SxProps } from "@mui/material";
import { FieldProps, useRecordContext } from "react-admin";
import { Playlist } from "../types";

interface Props extends FieldProps<Playlist> {
  sx?: SxProps;
  size?: string;
}

const AvatarField = ({ size = "25", sx }: Props) => {
  const record = useRecordContext<Playlist>();
  if (!record) return null;
  return (
    <Avatar
      src={`${record.imageUrl}?size=${size}x${size}`}
      style={{ width: parseInt(size, 10), height: parseInt(size, 10) }}
      sx={sx}
      alt={`${record.name}`}
    />
  );
};

export default AvatarField;
