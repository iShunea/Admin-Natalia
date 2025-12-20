import Grid from '@mui/material/Grid';

import EditBeforeAfterPage from 'sections/forms/edit-forms/before-after';

export default function EditFormBeforeAfter() {
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={8} lg={9}>
        <EditBeforeAfterPage />
      </Grid>
    </Grid>
  );
}
