// material-ui
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import React from 'react';
import ImageDisplay from 'components/ImageDisplay';
import { List, ListItem, ListItemText } from '@mui/material';

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
              Label image
            </Typography>
            <ImageDisplay file={data.imageLabelSrc} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Work title image
            </Typography>
            <ImageDisplay file={data.titleImagePath} />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Work tags
            </Typography>
            <List>
              {data.workTags.map((tag, index) => (
                <ListItem key={index}>
                  <ListItemText primary={tag} />
                </ListItem>
              ))}
            </List>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Title of page
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.title}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Title paragraph
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.titleParagraph}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Visit website link
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.visitWebsiteLink}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Call to action title
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.callToActionTitle}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Call to action paragraph
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.callToActionParagraph}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              First column
            </Typography>
            {data.firstColumnProjects.map((project, index) => (
              <Stack key={index} spacing={1}>
                <Typography variant="body" gutterBottom>
                  {project.text}
                </Typography>
                <ImageDisplay file={project.imagePath} />
              </Stack>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Second column
            </Typography>
            {data.secondColumnProjects.map((project, index) => (
              <Stack key={index} spacing={1}>
                <Typography variant="body" gutterBottom>
                  {project.text}
                </Typography>
                <ImageDisplay file={project.imagePath} />
              </Stack>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Third column
            </Typography>
            {data.firstColumnProjects.map((project, index) => (
              <Stack key={index} spacing={1}>
                <Typography variant="body">{project.text}</Typography>
                <ImageDisplay file={project.imagePath} />
              </Stack>
            ))}
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Fourth column
            </Typography>
            {data.fourthColumnProjects.map((project, index) => (
              <Stack key={index} spacing={1}>
                <Typography variant="body" gutterBottom>
                  {project.text}
                </Typography>
                <ImageDisplay file={project.imagePath} />
              </Stack>
            ))}
          </Stack>
        </Grid>

        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Review text
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.review.text}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Review author
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.review.author}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Review position
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.review.position}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Review portrait image
            </Typography>
            <ImageDisplay file={data.review.imageSrc} />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
