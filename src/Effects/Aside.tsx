import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useTranslate, useRecordContext } from 'react-admin';

import { User } from '../types';
import { Card, CardContent, Chip } from '@mui/material';

const Aside = () => {
   const translate = useTranslate();
   const record = useRecordContext<User>();

   return (
      <Box width={400} display={{ xs: 'none', lg: 'block' }} ml={1}>
         <Card>
            <CardContent>
               <Typography variant="h6" gutterBottom fontWeight={'700'}>
                  {translate('resources.customers.fieldGroups.history')}
               </Typography>
               <Typography variant="body2" fontWeight="400" my={1}>
                  Created At
               </Typography>
               {/* <Chip label={record.createdAt} variant="outlined" /> */}
            </CardContent>
         </Card>
      </Box>
   );
};

export default Aside;
