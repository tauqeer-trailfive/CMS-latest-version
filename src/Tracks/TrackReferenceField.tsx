import * as React from 'react'
import { ReferenceField, ReferenceFieldProps } from 'react-admin'

import IdField from './IdField'

const TrackReferenceField = (
   props: Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
      source?: string
   }
) => (
   <ReferenceField source="id" reference="tracks" {...props}>
      <IdField />
   </ReferenceField>
)

TrackReferenceField.defaultProps = {
   source: 'id',
}

export default TrackReferenceField
