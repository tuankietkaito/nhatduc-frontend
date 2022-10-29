import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Maintainance = () => {
  return (
    <Box sx={{ width: '100%', my: '30px', textAlign: 'center' }}>
      <Typography sx={{ fontSize: '30px', m: '10px' }}>Chức năng đang phát triển</Typography>
      <Typography>Vui lòng quay lại sau</Typography>
    </Box>
  );
};

export default Maintainance;
