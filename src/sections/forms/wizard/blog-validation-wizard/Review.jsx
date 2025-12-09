import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import ImageDisplay from 'components/ImageDisplay';
import MultiLanguageTabs from 'components/forms/MultiLanguageTabs';

export default function Review({ data }) {
  const [currentLang, setCurrentLang] = useState('en');

  const handleLangChange = (event, newValue) => {
    setCurrentLang(newValue);
  };

  const getLocalizedField = (fieldBase) => {
    const langSuffix = currentLang === 'en' ? 'En' : currentLang === 'ro' ? 'Ro' : 'Ru';
    return data[`${fieldBase}${langSuffix}`] || '';
  };

  const langLabel = currentLang === 'en' ? 'English' : currentLang === 'ro' ? 'Romanian' : 'Russian';

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Review Blog Article
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Page URL / ID
            </Typography>
            <Typography variant="body1" gutterBottom>
              {data.id || 'Not set'}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Label / Category
            </Typography>
            <Typography variant="body1" gutterBottom>
              {data.label || 'Not set'}
            </Typography>
          </Stack>
        </Grid>

        <Grid item xs={12} sm={6}>
          <Stack spacing={1}>
            <Typography variant="h6" gutterBottom>
              Publishing Date
            </Typography>
            <Typography variant="body1" gutterBottom>
              {data.publishingDate || 'Not set'}
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
          <Divider sx={{ my: 2 }} />
          <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
            Multi-Language Content Preview
          </Typography>
          <MultiLanguageTabs value={currentLang} onChange={handleLangChange} />
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
            <Typography variant="subtitle2" color="primary" gutterBottom>
              {langLabel} Content
            </Typography>

            <Stack spacing={3}>
              <Box>
                <Typography variant="h6" gutterBottom>
                  Image Alt Text ({langLabel})
                </Typography>
                <Typography variant="body1">
                  {getLocalizedField('titleImageAltText') || 'Not set'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Blog Title ({langLabel})
                </Typography>
                <Typography variant="body1">
                  {getLocalizedField('blogTitle') || 'Not set'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Blog Intro ({langLabel})
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {getLocalizedField('blogIntro') || 'Not set'}
                </Typography>
              </Box>

              {getLocalizedField('firstSubheadingTitle') && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    First Subheading ({langLabel})
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {getLocalizedField('firstSubheadingTitle')}
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mt: 1 }}>
                    {getLocalizedField('firstSubheadingText') || 'No text'}
                  </Typography>
                </Box>
              )}

              {getLocalizedField('secondSubheadingTitle') && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Second Subheading ({langLabel})
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {getLocalizedField('secondSubheadingTitle')}
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mt: 1 }}>
                    {getLocalizedField('secondSubheadingText') || 'No text'}
                  </Typography>
                </Box>
              )}

              {getLocalizedField('thirdSubheadingTitle') && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Third Subheading ({langLabel})
                  </Typography>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {getLocalizedField('thirdSubheadingTitle')}
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', mt: 1 }}>
                    {getLocalizedField('thirdSubheadingText') || 'No text'}
                  </Typography>
                </Box>
              )}

              {getLocalizedField('conclusion') && (
                <Box>
                  <Typography variant="h6" gutterBottom>
                    Conclusion ({langLabel})
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {getLocalizedField('conclusion')}
                  </Typography>
                </Box>
              )}

              <Divider />

              <Box>
                <Typography variant="h6" gutterBottom>
                  Meta Description ({langLabel})
                </Typography>
                <Typography variant="body1">
                  {getLocalizedField('metaDescription') || 'Not set'}
                </Typography>
              </Box>

              <Box>
                <Typography variant="h6" gutterBottom>
                  Meta Keywords ({langLabel})
                </Typography>
                <Typography variant="body1">
                  {getLocalizedField('metaKeywords') || 'Not set'}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
