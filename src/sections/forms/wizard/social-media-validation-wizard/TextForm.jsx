import PropTypes from 'prop-types';
import { useState } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useFormik } from 'formik';
import * as yup from 'yup';

import AnimateButton from 'components/@extended/AnimateButton';
import MultiLanguageTabs from 'components/forms/MultiLanguageTabs';

const validationSchema = yup.object({
  platform: yup.string().required('Platform is required'),
  videoUrl: yup.string().url('Must be a valid URL').required('Video URL is required'),
  titleRo: yup.string().required('Romanian title is required'),
  titleRu: yup.string().required('Russian title is required'),
  titleEn: yup.string().required('English title is required'),
  displayOrder: yup.number().required('Display order is required').min(0, 'Display order cannot be negative')
});

export default function TextForm({ data, setData, handleNext, setErrorIndex }) {
  const [currentLang, setCurrentLang] = useState('ro');

  const formik = useFormik({
    initialValues: {
      platform: data.platform ?? 'instagram',
      videoUrl: data.videoUrl ?? '',
      titleRo: data.titleRo ?? '',
      titleRu: data.titleRu ?? '',
      titleEn: data.titleEn ?? '',
      descriptionRo: data.descriptionRo ?? '',
      descriptionRu: data.descriptionRu ?? '',
      descriptionEn: data.descriptionEn ?? '',
      displayOrder: data.displayOrder ?? 0,
      isActive: data.isActive ?? true
    },
    validationSchema,
    onSubmit: (values) => {
      setData({
        ...data,
        ...values
      });
      handleNext();
    }
  });

  const handleLangChange = (event, newValue) => {
    setCurrentLang(newValue);
  };

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Social Media Post Information
      </Typography>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Platform *</InputLabel>
              <FormControl fullWidth>
                <Select
                  id="platform"
                  name="platform"
                  value={formik.values.platform}
                  onChange={formik.handleChange}
                  error={formik.touched.platform && Boolean(formik.errors.platform)}
                >
                  <MenuItem value="instagram">Instagram</MenuItem>
                  <MenuItem value="tiktok">TikTok</MenuItem>
                </Select>
              </FormControl>
              {formik.touched.platform && formik.errors.platform && (
                <Typography variant="caption" color="error">
                  {formik.errors.platform}
                </Typography>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Display Order *</InputLabel>
              <TextField
                id="displayOrder"
                name="displayOrder"
                placeholder="0, 1, 2..."
                type="number"
                value={formik.values.displayOrder}
                onChange={formik.handleChange}
                error={formik.touched.displayOrder && Boolean(formik.errors.displayOrder)}
                helperText={formik.touched.displayOrder && formik.errors.displayOrder}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Video URL *</InputLabel>
              <TextField
                id="videoUrl"
                name="videoUrl"
                placeholder="https://www.instagram.com/p/..."
                value={formik.values.videoUrl}
                onChange={formik.handleChange}
                error={formik.touched.videoUrl && Boolean(formik.errors.videoUrl)}
                helperText={formik.touched.videoUrl && formik.errors.videoUrl}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 2, mt: 2 }}>Multi-Language Titles</Typography>
            <MultiLanguageTabs value={currentLang} onChange={handleLangChange} />
          </Grid>

          {currentLang === 'ro' && (
            <>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Title (Romanian) *</InputLabel>
                  <TextField
                    name="titleRo"
                    value={formik.values.titleRo}
                    onChange={formik.handleChange}
                    error={formik.touched.titleRo && Boolean(formik.errors.titleRo)}
                    helperText={formik.touched.titleRo && formik.errors.titleRo}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Description (Romanian - Optional)</InputLabel>
                  <TextField
                    name="descriptionRo"
                    multiline
                    rows={3}
                    value={formik.values.descriptionRo}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>
            </>
          )}

          {currentLang === 'ru' && (
            <>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Title (Russian) *</InputLabel>
                  <TextField
                    name="titleRu"
                    value={formik.values.titleRu}
                    onChange={formik.handleChange}
                    error={formik.touched.titleRu && Boolean(formik.errors.titleRu)}
                    helperText={formik.touched.titleRu && formik.errors.titleRu}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Description (Russian - Optional)</InputLabel>
                  <TextField
                    name="descriptionRu"
                    multiline
                    rows={3}
                    value={formik.values.descriptionRu}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>
            </>
          )}

          {currentLang === 'en' && (
            <>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Title (English) *</InputLabel>
                  <TextField
                    name="titleEn"
                    value={formik.values.titleEn}
                    onChange={formik.handleChange}
                    error={formik.touched.titleEn && Boolean(formik.errors.titleEn)}
                    helperText={formik.touched.titleEn && formik.errors.titleEn}
                    fullWidth
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel>Description (English - Optional)</InputLabel>
                  <TextField
                    name="descriptionEn"
                    multiline
                    rows={3}
                    value={formik.values.descriptionEn}
                    onChange={formik.handleChange}
                    fullWidth
                  />
                </Stack>
              </Grid>
            </>
          )}

          <Grid item xs={12}>
            <Stack spacing={1}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.isActive}
                    onChange={(e) => formik.setFieldValue('isActive', e.target.checked)}
                    name="isActive"
                  />
                }
                label="Active (visible on website)"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button variant="contained" sx={{ my: 3, ml: 1 }} type="submit" onClick={() => setErrorIndex(0)}>
                  Next
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </>
  );
}

TextForm.propTypes = {
  data: PropTypes.any,
  setData: PropTypes.func,
  handleNext: PropTypes.func,
  setErrorIndex: PropTypes.func
};
