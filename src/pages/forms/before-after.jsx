import Grid from '@mui/material/Grid';

import AddBeforeAfterPage from 'sections/forms/wizard/before-after-wizard';

export default function FormBeforeAfter() {
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={8} lg={9}>
        <AddBeforeAfterPage />
      </Grid>
    </Grid>
  );
}
