import * as React from 'react'
import { ReferenceField, ReferenceFieldProps } from 'react-admin'

import IdField from './IdField'

const SampleReferenceField = (
   props: Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
      source?: string
   }
) => (
   <ReferenceField source="id" reference="samples" {...props}>
      <IdField />
   </ReferenceField>
)

SampleReferenceField.defaultProps = {
   source: 'id',
}

export default SampleReferenceField
