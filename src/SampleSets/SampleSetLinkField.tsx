import * as React from 'react'
import { Link, FieldProps, useRecordContext } from 'react-admin'

import IdField from './IdField'
import { SampleSet } from '../types'

const EffectLinkField = (_: FieldProps<SampleSet>) => {
   const record = useRecordContext<SampleSet>()
   if (!record) {
      return null
   }
   return (
      <Link to={`/samplesets/${record.id}`}>
         <IdField size="40" />
      </Link>
   )
}

EffectLinkField.defaultProps = {
   source: 'id',
}

export default EffectLinkField
