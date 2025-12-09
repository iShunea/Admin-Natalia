// material-ui
import Grid from '@mui/material/Grid';
import EditJobsPage from 'sections/forms/edit-forms/jobs';

// project-imports

// ==============================|| FORMS WIZARD ||============================== //

export default function FormEditJobs() {
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={6} lg={7}>
        <EditJobsPage />
      </Grid>
    </Grid>
  );
}
