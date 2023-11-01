import * as React from 'react';
import { ReferenceField, ReferenceFieldProps } from 'react-admin';

import IdField from './IdField';

const GroupReferenceField = (
   props: Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
      source?: string;
   }
) => (
   <ReferenceField source="id" reference="groups" {...props}>
      <IdField />
   </ReferenceField>
);

GroupReferenceField.defaultProps = {
   source: 'id',
};

export default GroupReferenceField;
