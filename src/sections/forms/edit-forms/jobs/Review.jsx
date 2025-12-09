// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import React from 'react';

import { List, ListItem } from '@mui/material';

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
              Job
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.jobTitle}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Internship Status
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.isInternship ? 'Yes' : 'No'}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Meta Description
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.metaDescription}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Meta Keywords
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.metaKeywords}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Location
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.location}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Job type
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.type}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              First section heading
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.firstSectionHeading}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              First section list
            </Typography>
            <List>
              {data.firstSectionList.map((d, index) => (
                <ListItem key={index}>{d}</ListItem>
              ))}
            </List>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Second section heading
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.secondSectionHeading}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Second section list
            </Typography>
            <List>
              {data.secondSectionList.map((d, index) => (
                <ListItem key={index}>{d}</ListItem>
              ))}
            </List>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Third section heading
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.thirdSectionList}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Third section list
            </Typography>
            <List>
              {data.thirdSectionList.map((d, index) => (
                <ListItem key={index}>{d}</ListItem>
              ))}
            </List>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Fourth section heading
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.fourthSectionHeading}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Fourth section list
            </Typography>
            <List>
              {data.fourthSectionList.map((d, index) => (
                <ListItem key={index}>{d}</ListItem>
              ))}
            </List>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
