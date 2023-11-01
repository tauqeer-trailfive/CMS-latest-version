import * as React from 'react'
import { Link, FieldProps, useRecordContext } from 'react-admin'

import IdField from './IdField'
import { Genre } from '../types'

const EffectLinkField = (_: FieldProps<Genre>) => {
   const record = useRecordContext<Genre>()
   if (!record) {
      return null
   }
   return (
      <Link to={`/bpmTemp/${record.id}`}>
         <IdField size="40" />
      </Link>
   )
}

EffectLinkField.defaultProps = {
   source: 'id',
}

export default EffectLinkField
