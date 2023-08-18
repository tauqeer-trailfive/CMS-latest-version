import * as React from "react";
import { ReferenceField, ReferenceFieldProps } from "react-admin";

import FullNameField from "./NameField";

const CustomerReferenceField = (
  props: Omit<ReferenceFieldProps, "reference" | "children" | "source"> & {
    source?: string;
  }
) => (
  <ReferenceField source="id" reference="users" {...props}>
    <FullNameField />
  </ReferenceField>
);

CustomerReferenceField.defaultProps = {
  source: "customer_id",
};

export default CustomerReferenceField;
