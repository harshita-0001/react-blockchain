import * as React from 'react';
import Switch from '@mui/joy/Switch';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/joy/Typography';

export default function SwitchButton() {
  return (
    <Stack direction="row" spacing={2} mx={1}>
      <Switch
        slotProps={{
          track: {
            children: (
              <React.Fragment>
                <Typography component="div" level="inherit" sx={{ ml: '10px'}}>
                  
                </Typography>
                <Typography component="div" level="inherit" sx={{ mr: '8px' }}>
                  
                </Typography>
              </React.Fragment>
            ),
          },
        }}
        sx={{
          '--Switch-thumbSize': '37px',
          '--Switch-trackWidth': '110px',
          '--Switch-trackHeight': '45px',
        }}
      />
     
    </Stack>
  );
}
