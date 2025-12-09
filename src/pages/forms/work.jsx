// material-ui
import Grid from '@mui/material/Grid';

// project-imports
import AddWorkPage from 'sections/forms/wizard/works-validation-wizard';

// ==============================|| FORMS WIZARD ||============================== //

export default function FormWork() {
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={6} lg={7}>
        <AddWorkPage />
      </Grid>
    </Grid>
  );
}
