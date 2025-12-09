import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useFormik } from 'formik';
import * as yup from 'yup';

import AnimateButton from 'components/@extended/AnimateButton';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  role: yup.string().required('Role/Occupation is required'),
  text: yup.string().required('Testimonial text is required'),
  rating: yup.number().required('Rating is required').min(1).max(5)
});

export default function TextForm({ data, setData, handleNext, setErrorIndex }) {
  const formik = useFormik({
    initialValues: {
      name: data.name ?? '',
      role: data.role ?? '',
      text: data.text ?? '',
      rating: data.rating ?? 5,
      isActive: data.isActive ?? true
    },
    validationSchema,
    onSubmit: (values) => {
      setData({
        ...data,
        name: values.name,
        role: values.role,
        text: values.text,
        rating: values.rating,
        isActive: values.isActive
      });
      handleNext();
    }
  });

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Testimonial Information
      </Typography>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Patient Name</InputLabel>
              <TextField
                id="name"
                name="name"
                placeholder="Full name *"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Role / Occupation</InputLabel>
              <TextField
                id="role"
                name="role"
                placeholder="Occupation (e.g., Entrepreneur) *"
                value={formik.values.role}
                onChange={formik.handleChange}
                error={formik.touched.role && Boolean(formik.errors.role)}
                helperText={formik.touched.role && formik.errors.role}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Testimonial Text</InputLabel>
              <TextField
                id="text"
                name="text"
                placeholder="Review text *"
                multiline
                rows={4}
                value={formik.values.text}
                onChange={formik.handleChange}
                error={formik.touched.text && Boolean(formik.errors.text)}
                helperText={formik.touched.text && formik.errors.text}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Rating (1-5 stars)</InputLabel>
              <Rating
                name="rating"
                value={formik.values.rating}
                onChange={(event, newValue) => {
                  formik.setFieldValue('rating', newValue);
                }}
                size="large"
              />
              {formik.touched.rating && formik.errors.rating && (
                <Typography variant="caption" color="error">
                  {formik.errors.rating}
                </Typography>
              )}
            </Stack>
          </Grid>
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
