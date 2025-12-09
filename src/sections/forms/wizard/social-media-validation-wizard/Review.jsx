import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Chip from '@mui/material/Chip';

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
              Platform
            </Typography>
            <Chip label={data.platform === 'instagram' ? 'Instagram' : 'TikTok'} color="primary" />
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Video URL
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.videoUrl}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Display Order
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.displayOrder}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Title (Romanian)
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.titleRo}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Title (Russian)
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.titleRu}
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Title (English)
            </Typography>
            <Typography variant="body" gutterBottom>
              {data.titleEn}
            </Typography>
          </Stack>
        </Grid>
        {data.descriptionRo && (
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant="h6" gutterBottom>
                Description (Romanian)
              </Typography>
              <Typography variant="body" gutterBottom>
                {data.descriptionRo}
              </Typography>
            </Stack>
          </Grid>
        )}
        {data.descriptionRu && (
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant="h6" gutterBottom>
                Description (Russian)
              </Typography>
              <Typography variant="body" gutterBottom>
                {data.descriptionRu}
              </Typography>
            </Stack>
          </Grid>
        )}
        {data.descriptionEn && (
          <Grid item xs={12}>
            <Stack spacing={1}>
              <Typography variant="h6" gutterBottom>
                Description (English)
              </Typography>
              <Typography variant="body" gutterBottom>
                {data.descriptionEn}
              </Typography>
            </Stack>
          </Grid>
        )}
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Status
            </Typography>
            <Chip 
              label={data.isActive ? 'Active' : 'Inactive'} 
              color={data.isActive ? 'success' : 'error'} 
              size="small" 
            />
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
