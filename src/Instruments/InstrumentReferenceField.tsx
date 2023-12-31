import * as React from 'react';
import { ReferenceField, ReferenceFieldProps } from 'react-admin';

import FullNameField from './IdField';

const InstrumentReferenceField = (
   props: Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
      source?: string;
   }
) => (
   <ReferenceField source="id" reference="musicalInstruments" {...props}>
      <FullNameField />
   </ReferenceField>
);

InstrumentReferenceField.defaultProps = {
   source: 'id',
};

export default InstrumentReferenceField;
