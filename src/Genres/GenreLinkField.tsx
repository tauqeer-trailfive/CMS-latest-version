import * as React from 'react';
import { Link, FieldProps, useRecordContext } from 'react-admin';

import IdField from './IdField';
import { Genre } from '../types';

const GenreLinkField = (_: FieldProps<Genre>) => {
   const record = useRecordContext<Genre>();
   if (!record) {
      return null;
   }
   return (
      <Link to={`/genres/${record.id}`}>
         <IdField size="40" />
      </Link>
   );
};

GenreLinkField.defaultProps = {
   source: 'id',
};

export default GenreLinkField;
