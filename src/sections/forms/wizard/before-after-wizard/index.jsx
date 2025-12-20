import { useState } from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';

import { useFormik } from 'formik';
import * as yup from 'yup';

import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import MultiLanguageTabs from 'components/forms/MultiLanguageTabs';
import DragDropFileUpload from 'components/DragDropFileUpload';
import axiosInstance from 'api/axios-instance';

const validationSchema = yup.object({
  serviceNameEn: yup.string().required('English service name is required'),
  serviceNameRo: yup.string().required('Romanian service name is required'),
  serviceNameRu: yup.string().required('Russian service name is required'),
  seoDescriptionEn: yup.string().max(160, 'Max 160 characters'),
  seoDescriptionRo: yup.string().max(160, 'Max 160 characters'),
  seoDescriptionRu: yup.string().max(160, 'Max 160 characters'),
  orderIndex: yup.number().min(0, 'Must be positive'),
  beforeImage: yup.mixed().required('Before image is required'),
  afterImage: yup.mixed().required('After image is required')
});

export default function AddBeforeAfterPage() {
  const [currentLang, setCurrentLang] = useState('en');
  const [isLoading, setIsLoading] = useState(false);
  const [submitResult, setSubmitResult] = useState({ success: false, message: '' });

  const formik = useFormik({
    initialValues: {
      serviceNameEn: '',
      serviceNameRo: '',
      serviceNameRu: '',
      seoDescriptionEn: '',
      seoDescriptionRo: '',
      seoDescriptionRu: '',
      orderIndex: 0,
      isActive: true,
      beforeImage: null,
      afterImage: null
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        const formData = new FormData();

        formData.append('serviceNameEn', values.serviceNameEn);
        formData.append('serviceNameRo', values.serviceNameRo);
        formData.append('serviceNameRu', values.serviceNameRu);
        formData.append('seoDescriptionEn', values.seoDescriptionEn || '');
        formData.append('seoDescriptionRo', values.seoDescriptionRo || '');
        formData.append('seoDescriptionRu', values.seoDescriptionRu || '');
        formData.append('orderIndex', values.orderIndex);
        formData.append('isActive', values.isActive);

        if (values.beforeImage instanceof File) {
          formData.append('beforeImage', values.beforeImage);
        }
        if (values.afterImage instanceof File) {
          formData.append('afterImage', values.afterImage);
        }

        const response = await axiosInstance.post('/api/before-after', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        console.log('Response:', response);
        setSubmitResult({ success: true, message: 'Before/After item created successfully!' });
        formik.resetForm();
      } catch (error) {
        console.error('Error:', error);
        const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Something went wrong!';
        setSubmitResult({ success: false, message: errorMsg });
      } finally {
        setIsLoading(false);
      }
    }
  });

  const getServiceNameField = () => {
    const fieldMap = { en: 'serviceNameEn', ro: 'serviceNameRo', ru: 'serviceNameRu' };
    return fieldMap[currentLang];
  };

  const getSeoDescField = () => {
    const fieldMap = { en: 'seoDescriptionEn', ro: 'seoDescriptionRo', ru: 'seoDescriptionRu' };
    return fieldMap[currentLang];
  };

  if (submitResult.message) {
    return (
      <MainCard title="Add Before/After">
        <Stack alignItems="center" spacing={2} sx={{ py: 3 }}>
          <Typography variant="h5" color={submitResult.success ? 'success.main' : 'error.main'}>
            {submitResult.message}
          </Typography>
          <AnimateButton>
            <Button
              variant="contained"
              onClick={() => setSubmitResult({ success: false, message: '' })}
            >
              Add Another
            </Button>
          </AnimateButton>
        </Stack>
      </MainCard>
    );
  }

  return (
    <MainCard title="Add Before/After">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Service Information
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <MultiLanguageTabs value={currentLang} onChange={(e, newValue) => setCurrentLang(newValue)} />
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Service Name ({currentLang.toUpperCase()}) *</InputLabel>
              <TextField
                id={getServiceNameField()}
                name={getServiceNameField()}
                placeholder="e.g., Teeth Whitening, Dental Implants"
                value={formik.values[getServiceNameField()]}
                onChange={formik.handleChange}
                error={formik.touched[getServiceNameField()] && Boolean(formik.errors[getServiceNameField()])}
                helperText={formik.touched[getServiceNameField()] && formik.errors[getServiceNameField()]}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>SEO Description ({currentLang.toUpperCase()})</InputLabel>
              <TextField
                id={getSeoDescField()}
                name={getSeoDescField()}
                placeholder="Brief description for SEO (max 160 chars)"
                multiline
                minRows={2}
                value={formik.values[getSeoDescField()]}
                onChange={formik.handleChange}
                error={formik.touched[getSeoDescField()] && Boolean(formik.errors[getSeoDescField()])}
                helperText={formik.touched[getSeoDescField()] && formik.errors[getSeoDescField()]}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
              Images
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Before Image *</InputLabel>
              <DragDropFileUpload
                formik={formik}
                name="beforeImage"
              />
              {formik.touched.beforeImage && formik.errors.beforeImage && (
                <Typography color="error" variant="caption">{formik.errors.beforeImage}</Typography>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>After Image *</InputLabel>
              <DragDropFileUpload
                formik={formik}
                name="afterImage"
              />
              {formik.touched.afterImage && formik.errors.afterImage && (
                <Typography color="error" variant="caption">{formik.errors.afterImage}</Typography>
              )}
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h5" gutterBottom>
              Settings
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Order Index</InputLabel>
              <TextField
                id="orderIndex"
                name="orderIndex"
                type="number"
                placeholder="0"
                value={formik.values.orderIndex}
                onChange={formik.handleChange}
                error={formik.touched.orderIndex && Boolean(formik.errors.orderIndex)}
                helperText={formik.touched.orderIndex && formik.errors.orderIndex}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Status</InputLabel>
              <FormControlLabel
                control={
                  <Switch
                    checked={formik.values.isActive}
                    onChange={(e) => formik.setFieldValue('isActive', e.target.checked)}
                    name="isActive"
                  />
                }
                label={formik.values.isActive ? 'Active' : 'Inactive'}
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isLoading}
                  sx={{ my: 3, ml: 1 }}
                >
                  {isLoading ? (
                    <>
                      <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                      Saving...
                    </>
                  ) : (
                    'Create Before/After'
                  )}
                </Button>
              </AnimateButton>
            </Stack>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
}
