// material-ui
import Grid from '@mui/material/Grid';
import EditTeamPage from 'sections/forms/edit-forms/team';

// project-imports

// ==============================|| FORMS WIZARD ||============================== //

export default function FormEditTeam() {
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={6} lg={7}>
        <EditTeamPage />
      </Grid>
    </Grid>
  );
}
