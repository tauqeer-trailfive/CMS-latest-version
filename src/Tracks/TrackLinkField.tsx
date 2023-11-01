import * as React from 'react';
import { Link, FieldProps, useRecordContext } from 'react-admin';

import IdField from './IdField';
import { User } from '../types';

const TrackLinkField = (_: FieldProps<User>) => {
   const record = useRecordContext<User>();
   if (!record) {
      return null;
   }
   return (
      <Link to={`/tracks/${record.id}`}>
         <IdField size="40" />
      </Link>
   );
};

TrackLinkField.defaultProps = {
   source: 'id',
};

export default TrackLinkField;
