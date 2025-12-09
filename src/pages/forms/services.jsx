// material-ui
import Grid from '@mui/material/Grid';

// project-imports
// import BasicWizard from 'sections/forms/wizard/basic-wizard';
import AddServicesPages from 'sections/forms/wizard/services-validation-wizard';

// ==============================|| FORMS WIZARD ||============================== //

export default function FormServices() {
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={6} lg={7}>
        <AddServicesPages />
      </Grid>
    </Grid>
  );
}
