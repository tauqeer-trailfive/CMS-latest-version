import * as React from "react";
import { Link, FieldProps, useRecordContext } from "react-admin";

import IdField from "./IdField";
import { Genre } from "../types";

const ProjectCategoryLinkField = (_: FieldProps<Genre>) => {
  const record = useRecordContext<Genre>();
  if (!record) {
    return null;
  }
  return (
    <Link to={`/projectcategories/${record.id}`}>
      <IdField size="40" />
    </Link>
  );
};

ProjectCategoryLinkField.defaultProps = {
  source: "id",
};

export default ProjectCategoryLinkField;
