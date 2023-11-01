import * as React from 'react'
import { ReferenceField, ReferenceFieldProps } from 'react-admin'

import IdField from './IdField'

const PlaylistReferenceField = (
   props: Omit<ReferenceFieldProps, 'reference' | 'children' | 'source'> & {
      source?: string
   }
) => (
   <ReferenceField source="id" reference="playlists" {...props}>
      <IdField />
   </ReferenceField>
)

PlaylistReferenceField.defaultProps = {
   source: 'id',
}

export default PlaylistReferenceField
