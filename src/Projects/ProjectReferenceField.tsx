import * as React from "react";
import { ReferenceField, ReferenceFieldProps } from "react-admin";

import IdField from "./IdField";

const ProjectReferenceField = (
  props: Omit<ReferenceFieldProps, "reference" | "children" | "source"> & {
    source?: string;
  }
) => (
  <ReferenceField source="id" reference="projects" {...props}>
    <IdField />
  </ReferenceField>
);

ProjectReferenceField.defaultProps = {
  source: "id",
};

export default ProjectReferenceField;
