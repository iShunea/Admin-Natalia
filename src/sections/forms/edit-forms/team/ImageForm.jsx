import PropTypes from 'prop-types';
// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import DragDropFileUpload from 'components/DragDropFileUpload';

const validationSchema = yup.object({
  imageUrl: yup
    .mixed()
    .nullable()
    .test('fileType', 'Only image files are allowed', (value) => {
      if (!value) return true;
      // Allow string URLs (existing images) or File objects
      if (typeof value === 'string') return true;
      return value.type && value.type.startsWith('image/');
    })
});

// ==============================|| VALIDATION WIZARD - IMAGE  ||============================== //
export default function ImageForm({ data, setData, handleNext, handleBack, setErrorIndex }) {
  const formik = useFormik({
    initialValues: {
      imageUrl: data.imageUrl || null
    },
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      setData({
        ...data,
        imageUrl: values.imageUrl
      });
      handleNext();
    }
  });

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Team Member Photo
      </Typography>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel>Member photo</InputLabel>
              <DragDropFileUpload
                formik={formik}
                name="imageUrl"
                existingImageUrl={typeof data.imageUrl === 'string' ? data.imageUrl : null}
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="space-between">
              <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                Back
              </Button>
              <AnimateButton>
                <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex && setErrorIndex(1)}>
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
  handleBack: PropTypes.func,
  setErrorIndex: PropTypes.func
};
