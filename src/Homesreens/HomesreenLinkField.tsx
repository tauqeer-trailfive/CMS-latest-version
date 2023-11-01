import * as React from 'react';
import { Link, FieldProps, useRecordContext } from 'react-admin';

import IdField from './IdField';
import { Homescreen } from '../types';

const HomesreenLinkField = (_: FieldProps<Homescreen>) => {
   const record = useRecordContext<Homescreen>();
   if (!record) {
      return null;
   }
   return (
      <Link to={`/homescreens/${record.id}`}>
         <IdField size="40" />
      </Link>
   );
};

HomesreenLinkField.defaultProps = {
   source: 'id',
};

export default HomesreenLinkField;
