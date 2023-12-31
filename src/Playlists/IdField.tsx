import * as React from 'react';
import { SxProps, Typography } from '@mui/material';
import { memo } from 'react';

import { FieldProps, useRecordContext } from 'react-admin';
import { Playlist } from '../types';
import AvatarField from './AvatarField';

interface Props extends FieldProps<Playlist> {
   size?: string;
   sx?: SxProps;
}

const IdField = (props: Props) => {
   const { size } = props;
   const record = useRecordContext<Playlist>();
   return record ? (
      <Typography
         variant="body2"
         display="flex"
         flexWrap="nowrap"
         alignItems="center"
         component="div"
         sx={props.sx}
      >
         <AvatarField
            record={record}
            size={size}
            sx={{
               mr: 1,
               mt: -0.5,
               mb: -0.5,
            }}
         />
         {record.name}
      </Typography>
   ) : null;
};

IdField.defaultProps = {
   source: 'name' as const,
   label: 'resources.Genre.fields.id',
};

export default memo<Props>(IdField);
