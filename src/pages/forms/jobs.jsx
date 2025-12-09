// material-ui
import Grid from '@mui/material/Grid';

// project-imports
import AddJobs from 'sections/forms/wizard/jobs-validation-wizard';

// ==============================|| FORMS WIZARD ||============================== //

export default function FormJobs() {
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={6} lg={7}>
        <AddJobs />
      </Grid>
    </Grid>
  );
}
