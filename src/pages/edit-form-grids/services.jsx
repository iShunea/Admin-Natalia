// material-ui
import Grid from '@mui/material/Grid';
import EditServicePage from 'sections/forms/edit-forms/services';

// project-imports

// ==============================|| FORMS WIZARD ||============================== //

export default function FormEditServices() {
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={6} lg={7}>
        <EditServicePage />
      </Grid>
    </Grid>
  );
}
