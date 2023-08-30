import * as React from "react";
import { Link, FieldProps, useRecordContext } from "react-admin";

import IdField from "./IdField";
import { Comment } from "../types";

const CommentLinkField = (_: FieldProps<Comment>) => {
  const record = useRecordContext<Comment>();
  if (!record) {
    return null;
  }
  return (
    <Link to={`/comments/${record.id}`}>
      <IdField size="40" />
    </Link>
  );
};

CommentLinkField.defaultProps = {
  source: "id",
};

export default CommentLinkField;
