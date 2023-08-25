import * as React from "react";
import { Link, FieldProps, useRecordContext } from "react-admin";

import IdField from "./IdField";
import { Contest } from "../types";

const ContestLinkField = (_: FieldProps<Contest>) => {
  const record = useRecordContext<Contest>();
  if (!record) {
    return null;
  }
  return (
    <Link to={`/contests/${record.id}`}>
      <IdField size="40" />
    </Link>
  );
};

ContestLinkField.defaultProps = {
  source: "id",
};

export default ContestLinkField;
