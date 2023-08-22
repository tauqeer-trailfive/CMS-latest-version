import * as React from "react";
import { Link, FieldProps, useRecordContext } from "react-admin";

import IdField from "./IdField";
import { User } from "../types";

const InstrumentLinkField = (_: FieldProps<User>) => {
  const record = useRecordContext<User>();
  if (!record) {
    return null;
  }
  return (
    <Link to={`/musicalInstruments/${record.id}`}>
      <IdField size="40" />
    </Link>
  );
};

InstrumentLinkField.defaultProps = {
  source: "id",
};

export default InstrumentLinkField;
