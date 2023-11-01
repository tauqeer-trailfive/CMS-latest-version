import * as React from 'react';
import { ReferenceField, ReferenceFieldProps } from 'react-admin';

import FullNameField from './NameField';

const UserReferenceField = (
   props: Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
      source?: string;
   }
) => (
   <ReferenceField source="id" reference="users" {...props}>
      <FullNameField />
   </ReferenceField>
);

UserReferenceField.defaultProps = {
   source: 'id',
};

export default UserReferenceField;
