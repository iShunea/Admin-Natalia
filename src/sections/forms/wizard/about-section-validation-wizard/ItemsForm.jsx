import { useState } from 'react';
import { Box, Button, IconButton, TextField, Grid, MenuItem, Typography } from '@mui/material';
import { Trash } from 'iconsax-react';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';

export default function ItemsForm({ data, setData, handleNext, handleBack }) {
  const [items, setItems] = useState(data.items || []);

  const handleSubmit = () => {
    setData({ ...data, items });
    handleNext();
  };

  return (
    <MainCard title='Items/Lists'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>Items management - Coming soon</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleBack}>Back</Button>
            <AnimateButton><Button variant='contained' onClick={handleSubmit}>Next: Images</Button></AnimateButton>
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
}