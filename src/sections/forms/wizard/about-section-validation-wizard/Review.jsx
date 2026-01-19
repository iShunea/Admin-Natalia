import { Box, Button, Grid, Typography, Alert } from '@mui/material';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';

export default function Review({ data, handleSubmit, handleBack, isLoading, errorMessage }) {
  return (
    <MainCard title='Review & Submit'>
      <Grid container spacing={3}>
        {errorMessage && (
          <Grid item xs={12}>
            <Alert severity='error'>{errorMessage}</Alert>
          </Grid>
        )}
        <Grid item xs={12}>
          <Typography variant='h6'>Section Type:</Typography>
          <Typography>{data.sectionType}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Title (RO):</Typography>
          <Typography>{data.titleRo || 'N/A'}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h6'>Display Order:</Typography>
          <Typography>{data.displayOrder}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
            <Button onClick={handleBack} disabled={isLoading}>Back</Button>
            <AnimateButton>
              <Button variant='contained' onClick={handleSubmit} disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Section'}
              </Button>
            </AnimateButton>
          </Box>
        </Grid>
      </Grid>
    </MainCard>
  );
}