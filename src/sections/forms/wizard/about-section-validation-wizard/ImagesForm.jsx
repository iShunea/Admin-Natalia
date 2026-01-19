import { Box, Button, Grid } from '@mui/material';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';

export default function ImagesForm({ data, setData, handleNext, handleBack }) {
  const handleSubmit = () => {
    handleNext();
  };

  return (
    <MainCard title='Upload Images'>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Box sx={{ p: 3, border: '2px dashed #ddd', borderRadius: 2, textAlign: 'center' }}>
            Image upload - Coming soon
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleBack}>Back</Button>
            <AnimateButton><Button variant='contained' onClick={handleSubmit}>Next: Review</Button></AnimateButton>
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
}