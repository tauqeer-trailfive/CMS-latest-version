import * as React from 'react'
import { ReferenceField, ReferenceFieldProps } from 'react-admin'

import IdField from './IdField'

const UserReferenceField = (
   props: Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
      source?: string
   }
) => (
   <ReferenceField source="id" reference="contests" {...props}>
      <IdField />
   </ReferenceField>
)

UserReferenceField.defaultProps = {
   source: 'id',
}

export default UserReferenceField
