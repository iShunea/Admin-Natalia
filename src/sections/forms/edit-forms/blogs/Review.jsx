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
              Blog title
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.blogTitle}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Blog Image
            </Typography>
            <ImageDisplay file={data.titleImagePath} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Intro of blog
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.blogIntro}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Label of blog
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.label}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Subheading title
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.firstSubheadingTitle}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Subheading paragraph
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.firstSubheadingFirstText}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={3}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Carousel Image
            </Typography>
            <ImageDisplay file={data.carouselImagePath1} />
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Carousel Image
            </Typography>
            <ImageDisplay file={data.carouselImagePath2} />
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Carousel Image
            </Typography>
            <ImageDisplay file={data.carouselImagePath3} />
          </Stack>
        </Grid>
        <Grid item xs={3}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Carousel Image
            </Typography>
            <ImageDisplay file={data.carouselImagePath4} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Subheading paragraph
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.firstSubheadingFirstText}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Subheading image
            </Typography>
            <ImageDisplay file={data.firstSubheadingImage} />
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Subheading title
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.secondSubheadingTitle}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Subheading paragraph
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.secondSubheadingFirstText}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
