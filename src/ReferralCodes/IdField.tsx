import * as React from 'react';
import { SxProps, Typography } from '@mui/material';
import { memo } from 'react';

import { FieldProps, useRecordContext } from 'react-admin';
import { ReferralCode } from '../types';

interface Props extends FieldProps<ReferralCode> {
   size?: string;
   sx?: SxProps;
}

const IdField = (props: Props) => {
   const { size } = props;
   const record = useRecordContext<ReferralCode>();
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
   source: 'code' as const,
   label: 'resources.ReferralCode.fields.code',
};

export default memo<Props>(IdField);
