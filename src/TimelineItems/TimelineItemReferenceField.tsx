import * as React from "react";
import { ReferenceField, ReferenceFieldProps } from "react-admin";

import IdField from "./IdField";

const TimelineItemReferenceField = (
  props: Omit<ReferenceFieldProps, "reference" | "children" | "source"> & {
    source?: string;
  }
) => (
  <ReferenceField source="id" reference="gernes" {...props}>
    <IdField />
  </ReferenceField>
);

TimelineItemReferenceField.defaultProps = {
  source: "id",
};

export default TimelineItemReferenceField;
