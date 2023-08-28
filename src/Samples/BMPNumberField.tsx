import * as React from "react";
import { useRecordContext, NumberField, NumberFieldProps } from "react-admin";
import { Sample } from "../types";

const BPMNumberField = (props: NumberFieldProps) => {
  const record = useRecordContext<Sample>();
  if (!record || !props.source) {
    return null;
  }

  const arrayDta = record[props.source].map((item, i) => {
    return item.value;
  });

  return arrayDta.length > 1 ? <p>*****</p> : <p>Single BPM</p>;
};

BPMNumberField.defaultProps = NumberField.defaultProps;

export default BPMNumberField;
