import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Chip from '@mui/material/Chip';

export default function Review({ data }) {
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Summary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Patient Name
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.name}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Role / Occupation
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.role}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Testimonial Text
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.text}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Rating
            </Typography>
            <Rating value={data.rating} readOnly size="large" />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Status
            </Typography>
            <Chip 
              label={data.isActive ? 'Active' : 'Inactive'} 
              color={data.isActive ? 'success' : 'error'} 
              size="small" 
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
