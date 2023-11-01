import * as React from 'react';
import { ReferenceField, ReferenceFieldProps } from 'react-admin';

import IdField from './IdField';

const CommentReferenceField = (
   props: Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
      source?: string;
   }
) => (
   <ReferenceField source="id" reference="comments" {...props}>
      <IdField />
   </ReferenceField>
);

CommentReferenceField.defaultProps = {
   source: 'id',
};

export default CommentReferenceField;
