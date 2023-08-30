import * as React from "react";
import { Link, FieldProps, useRecordContext } from "react-admin";

import IdField from "./IdField";
import { NewsItem } from "../types";

const NewsItemLinkField = (_: FieldProps<NewsItem>) => {
  const record = useRecordContext<NewsItem>();
  if (!record) {
    return null;
  }
  return (
    <Link to={`/newsitems/${record.id}`}>
      <IdField size="40" />
    </Link>
  );
};

NewsItemLinkField.defaultProps = {
  source: "id",
};

export default NewsItemLinkField;
