import { Rating } from "@mui/material";
import React from "react";
import { useRecordContext } from "react-admin";

const RatingField = (props) => {
  const record = useRecordContext(props);
  return (
    <>
      <Rating
        name="simple-controlled"
        value={record.rating}
        max={5}
        size="small"
        readOnly
        color="primary"
      />
    </>
  );
};

export default RatingField;
