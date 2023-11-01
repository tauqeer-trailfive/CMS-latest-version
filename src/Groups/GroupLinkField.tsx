import * as React from 'react'
import { Link, FieldProps, useRecordContext } from 'react-admin'

import IdField from './IdField'
import { Group } from '../types'

const GroupLinkField = (_: FieldProps<Group>) => {
   const record = useRecordContext<Group>()
   if (!record) {
      return null
   }
   return (
      <Link to={`/groups/${record.id}`}>
         <IdField size="40" />
      </Link>
   )
}

GroupLinkField.defaultProps = {
   source: 'id',
}

export default GroupLinkField
