import * as React from 'react';
import { Link, FieldProps, useRecordContext } from 'react-admin';

import IdField from './IdField';
import { Project } from '../types';

const ProjectLinkField = (_: FieldProps<Project>) => {
   const record = useRecordContext<Project>();
   if (!record) {
      return null;
   }
   return (
      <Link to={`/projects/${record.id}`}>
         <IdField size="40" />
      </Link>
   );
};

ProjectLinkField.defaultProps = {
   source: 'id',
};

export default ProjectLinkField;
