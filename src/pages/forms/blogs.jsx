// material-ui
import Grid from '@mui/material/Grid';
import AddBlogPage from 'sections/forms/wizard/blog-validation-wizard';

// project-imports

// ==============================|| FORMS WIZARD ||============================== //

export default function FormBlog() {
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={6} lg={7}>
        <AddBlogPage />
      </Grid>
    </Grid>
  );
}
