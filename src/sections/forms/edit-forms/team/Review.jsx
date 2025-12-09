// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import React from 'react';
import ImageDisplay from 'components/ImageDisplay';

// ==============================|| VALIDATION WIZARD - REVIEW  ||============================== //

export default function Review({ data }) {
  console.log(data.imageLabelSrc);

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Summary
      </Typography>
      <Grid container spacing={3}>
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
              Full Name of member
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.fullName}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Job
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.job}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Portrait image of member
            </Typography>
            <ImageDisplay file={data.imageSrc} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Facebook link
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.socialMedia?.facebook}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Linkedin link
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.socialMedia?.linkedin}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Twitter link
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.socialMedia?.twitter}
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
