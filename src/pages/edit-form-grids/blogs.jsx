// material-ui
import Grid from '@mui/material/Grid';
import EditBlogPage from 'sections/forms/edit-forms/blogs';

// project-imports

// ==============================|| FORMS WIZARD ||============================== //

export default function FormEditBlog() {
  return (
    <Grid container spacing={2.5} justifyContent="center">
      <Grid item xs={12} md={6} lg={7}>
        <EditBlogPage />
      </Grid>
    </Grid>
  );
}
