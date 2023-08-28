import * as React from "react";
import { Link, FieldProps, useRecordContext } from "react-admin";
import IdField from "./IdField";
import { ReferralCode } from "../types";

const ReferralCodeLinkField = (_: FieldProps<ReferralCode>) => {
  const record = useRecordContext<ReferralCode>();
  if (!record) {
    return null;
  }
  return (
    <Link to={`/referralcode/${record.id}`}>
      <IdField size="40" />
    </Link>
  );
};

ReferralCodeLinkField.defaultProps = {
  source: "id",
};

export default ReferralCodeLinkField;
