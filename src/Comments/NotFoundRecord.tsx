import { Box, Typography } from "@mui/material";
import React from "react";
import ErrorIcon from "@mui/icons-material/ErrorRounded";

type Props = {};

const NotFoundRecord = (props: Props) => {
  return (
    <Box
      textAlign="center"
      m={1}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mx: "auto",
        my: "auto",
        py: 2,
      }}
    >
      <ErrorIcon sx={{ fontSize: 50 }} />
      <Typography variant="h6" paragraph fontWeight={"800"}>
        No Comments Records Found.
      </Typography>
    </Box>
  );
};

export default NotFoundRecord;
