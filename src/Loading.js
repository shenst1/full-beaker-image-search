import React from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Box from '@material-ui/core/Box';

export default () => (
  <Box>
    <Box mt={2}>
      <Skeleton variant="rect" width={210} height={118} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Box>
    <Box mt={2}>
      <Skeleton variant="rect" width={210} height={118} />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
      <Skeleton variant="text" />
    </Box>
  </Box>
)