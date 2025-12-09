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
              Name
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.name}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Role / Specialization
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.role}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Bio / Description
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.bio}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Display Order
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.orderIndex}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Photo
            </Typography>
            <ImageDisplay file={data.imageUrl} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
