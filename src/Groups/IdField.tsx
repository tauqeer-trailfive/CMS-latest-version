import * as React from 'react';
import { SxProps, Typography } from '@mui/material';
import { memo } from 'react';

import { FieldProps, useRecordContext } from 'react-admin';
import { Group } from '../types';

interface Props extends FieldProps<Group> {
   size?: string;
   sx?: SxProps;
}

const IdField = (props: Props) => {
   const { size } = props;
   const record = useRecordContext<Group>();
   return record ? (
      <Typography
         variant="body2"
         display="flex"
         flexWrap="nowrap"
         alignItems="center"
         component="div"
         sx={props.sx}
      >
         {record.id}
      </Typography>
   ) : null;
};

IdField.defaultProps = {
   source: 'name' as const,
   label: 'resources.groups.fields.id',
};

export default memo<Props>(IdField);
