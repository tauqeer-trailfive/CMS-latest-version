import * as React from "react";
import { Link, FieldProps, useRecordContext } from "react-admin";

import NameField from "./NameField";
import { User } from "../types";

const CustomerLinkField = (_: FieldProps<User>) => {
  const record = useRecordContext<User>();
  if (!record) {
    return null;
  }
  return (
    <Link to={`/user/${record.id}`}>
      <NameField size="40" />
    </Link>
  );
};

CustomerLinkField.defaultProps = {
  source: "id",
};

export default CustomerLinkField;
