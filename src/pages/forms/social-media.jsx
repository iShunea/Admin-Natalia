import Grid from '@mui/material/Grid';
import AddSocialMediaPost from 'sections/forms/wizard/social-media-validation-wizard';

export default function FormSocialMedia() {
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={6} lg={7}>
        <AddSocialMediaPost />
      </Grid>
    </Grid>
  );
}
