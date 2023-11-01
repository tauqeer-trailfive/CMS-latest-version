import * as React from 'react';
import { Link, FieldProps, useRecordContext } from 'react-admin';

import IdField from './IdField';
import { TimeLineItem } from '../types';

const TimelineItemLinkField = (_: FieldProps<TimeLineItem>) => {
   const record = useRecordContext<TimeLineItem>();
   if (!record) {
      return null;
   }
   return (
      <Link to={`/timelineitems/${record.id}`}>
         <IdField size="40" />
      </Link>
   );
};

TimelineItemLinkField.defaultProps = {
   source: 'id',
};

export default TimelineItemLinkField;
