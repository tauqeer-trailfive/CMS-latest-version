import * as React from "react";
import { Link, FieldProps, useRecordContext } from "react-admin";

import IdField from "./IdField";
import { Sample } from "../types";

const SampleLinkField = (_: FieldProps<Sample>) => {
  const record = useRecordContext<Sample>();
  if (!record) {
    return null;
  }
  return (
    <Link to={`/samples/${record.id}`}>
      <IdField size="40" />
    </Link>
  );
};

SampleLinkField.defaultProps = {
  source: "id",
};

export default SampleLinkField;
