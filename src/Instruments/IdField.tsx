import * as React from 'react'
import { SxProps, Typography } from '@mui/material'
import { memo } from 'react'

import { FieldProps, useRecordContext } from 'react-admin'
import { User } from '../types'

interface Props extends FieldProps<User> {
   size?: string
   sx?: SxProps
}

const IdField = (props: Props) => {
   const { size } = props
   const record = useRecordContext<User>()
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
   ) : null
}

IdField.defaultProps = {
   source: 'id' as const,
   label: 'resources.customers.fields.id',
}

export default memo<Props>(IdField)
