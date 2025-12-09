// material-ui
import Grid from '@mui/material/Grid';
import EditWorkPage from 'sections/forms/edit-forms/works';

// project-imports

// ==============================|| FORMS WIZARD ||============================== //

export default function FormEditWorks() {
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={6} lg={7}>
        <EditWorkPage />
      </Grid>
    </Grid>
  );
}
