import Grid from '@mui/material/Grid';
import AddTestimonial from 'sections/forms/wizard/testimonials-validation-wizard';

export default function FormTestimonials() {
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={6} lg={7}>
        <AddTestimonial />
      </Grid>
    </Grid>
  );
}
