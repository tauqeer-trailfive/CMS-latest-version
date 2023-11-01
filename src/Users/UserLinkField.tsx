import * as React from 'react'
import { Link, FieldProps, useRecordContext } from 'react-admin'

import NameField from './NameField'
import { User } from '../types'

const UserLinkField = (_: FieldProps<User>) => {
   const record = useRecordContext<User>()
   if (!record) {
      return null
   }
   return (
      <Link to={`/users/${record.id}`}>
         <NameField size="40" />
      </Link>
   )
}

UserLinkField.defaultProps = {
   source: 'id',
}

export default UserLinkField
