// material-ui
import Grid from '@mui/material/Grid';

// project-imports
import AddTeamMember from 'sections/forms/wizard/team-validation-wizard';

// ==============================|| FORMS WIZARD ||============================== //

export default function FormTeam() {
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={6} lg={7}>
        <AddTeamMember />
      </Grid>
    </Grid>
  );
}
