import * as React from 'react';
import { Link, FieldProps, useRecordContext } from 'react-admin';

import IdField from './IdField';
import { Playlist } from '../types';

const PlaylistLinkField = (_: FieldProps<Playlist>) => {
   const record = useRecordContext<Playlist>();
   if (!record) {
      return null;
   }
   return (
      <Link to={`/playlists/${record.id}`}>
         <IdField size="40" />
      </Link>
   );
};

PlaylistLinkField.defaultProps = {
   source: 'id',
};

export default PlaylistLinkField;
