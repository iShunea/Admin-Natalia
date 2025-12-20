import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { useFormik } from 'formik';
import * as yup from 'yup';

import AnimateButton from 'components/@extended/AnimateButton';
import DragDropFileUpload from 'components/DragDropFileUpload';

const validationSchema = yup.object({
  heroImage: yup
    .mixed()
    .nullable()
    .test('fileType', 'Only image files are allowed', (value) => {
      if (!value) return true;
      if (typeof value === 'string') return true;
      return value.type && value.type.startsWith('image/');
    }),
  firstIconPath: yup
    .mixed()
    .nullable()
    .test('fileType', 'Only image files are allowed', (value) => {
      if (!value) return true;
      if (typeof value === 'string') return true;
      return value.type && value.type.startsWith('image/');
    }),
  secondIconPath: yup
    .mixed()
    .nullable()
    .test('fileType', 'Only image files are allowed', (value) => {
      if (!value) return true;
      if (typeof value === 'string') return true;
      return value.type && value.type.startsWith('image/');
    })
});

export default function ImageForm({ data, setData, handleNext, handleBack }) {
  const formik = useFormik({
    initialValues: {
      heroImage: data.heroImage || null,
      firstIconPath: data.firstIconPath || null,
      secondIconPath: data.secondIconPath || null
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setData({
        ...data,
        heroImage: values.heroImage,
        firstIconPath: values.firstIconPath,
        secondIconPath: values.secondIconPath
      });
      handleNext();
    }
  });

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Service Images (Optional)
      </Typography>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Hero Image</InputLabel>
              <DragDropFileUpload
                formik={formik}
                name="heroImage"
                existingImageUrl={typeof data.heroImage === 'string' ? data.heroImage : null}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel>First Icon</InputLabel>
              <DragDropFileUpload
                formik={formik}
                name="firstIconPath"
                existingImageUrl={typeof data.firstIconPath === 'string' ? data.firstIconPath : null}
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel>Second Icon</InputLabel>
              <DragDropFileUpload
                formik={formik}
                name="secondIconPath"
                existingImageUrl={typeof data.secondIconPath === 'string' ? data.secondIconPath : null}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                Back
              </Button>
              <AnimateButton>
                <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }}>
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

ImageForm.propTypes = {
  data: PropTypes.any,
  setData: PropTypes.func,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func
};
