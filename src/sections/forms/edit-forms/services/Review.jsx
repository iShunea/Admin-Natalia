// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import React from 'react';
import ImageDisplay from 'components/ImageDisplay';

// ==============================|| VALIDATION WIZARD - REVIEW  ||============================== //

export default function Review({ data }) {
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Summary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Page ID
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.id}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Meta description
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.metaDescription}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Meta keywords
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.metaKeywords}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Label Image of page
            </Typography>
            <ImageDisplay file={data.imageLabelSrc} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Title of the page
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.title}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Subheading
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.titleDescription}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              First icon title
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.firstIconTitle}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Icon
            </Typography>
            <ImageDisplay file={data.firstIconPath} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              First icon description
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.firstIconDescription}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Second icon title
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.secondIconTitle}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Icon
            </Typography>
            <ImageDisplay file={data.secondIconPath} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Second icon description
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.secondIconDescription}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Main image title
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.imageTitle}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Main image
            </Typography>
            <ImageDisplay file={data.imageTitlePath} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Main image description
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.imageTitleDescription}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
