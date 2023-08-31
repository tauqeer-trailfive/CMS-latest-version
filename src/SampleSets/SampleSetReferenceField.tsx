import * as React from "react";
import { ReferenceField, ReferenceFieldProps } from "react-admin";

import IdField from "./IdField";

const SampleSetReferenceField = (
  props: Omit<ReferenceFieldProps, "reference" | "children" | "source"> & {
    source?: string;
  }
) => (
  <ReferenceField source="id" reference="samplesets" {...props}>
    <IdField />
  </ReferenceField>
);

SampleSetReferenceField.defaultProps = {
  source: "id",
};

export default SampleSetReferenceField;
