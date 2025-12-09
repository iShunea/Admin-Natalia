// material-ui
import Grid from '@mui/material/Grid';

// project-imports
import SpecialOfferForm from 'sections/forms/special-offer/SpecialOfferForm';

// ==============================|| SPECIAL OFFER FORM ||============================== //

export default function SpecialOfferPage() {
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={10} lg={8}>
        <SpecialOfferForm />
      </Grid>
    </Grid>
  );
}
