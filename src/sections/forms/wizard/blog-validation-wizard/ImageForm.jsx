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
  titleImagePath: yup
    .mixed()
    .required('Title image is required')
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && value.type && value.type.startsWith('image/');
    }),
  carouselImagePath1: yup
    .mixed()
    .nullable()
    .test('fileType', 'Only image files are allowed', (value) => {
      return !value || (value.type && value.type.startsWith('image/'));
    }),
  carouselImagePath2: yup
    .mixed()
    .nullable()
    .test('fileType', 'Only image files are allowed', (value) => {
      return !value || (value.type && value.type.startsWith('image/'));
    }),
  carouselImagePath3: yup
    .mixed()
    .nullable()
    .test('fileType', 'Only image files are allowed', (value) => {
      return !value || (value.type && value.type.startsWith('image/'));
    }),
  carouselImagePath4: yup
    .mixed()
    .nullable()
    .test('fileType', 'Only image files are allowed', (value) => {
      return !value || (value.type && value.type.startsWith('image/'));
    }),
  firstSubheadingImage: yup
    .mixed()
    .nullable()
    .test('fileType', 'Only image files are allowed', (value) => {
      return !value || (value.type && value.type.startsWith('image/'));
    })
});

// ==============================|| VALIDATION WIZARD - TEXT  ||============================== //

export default function ImageForm({ data, setData, handleNext, handleBack, setErrorIndex }) {
  const formik = useFormik({
    initialValues: {
      titleImagePath: data.titleImagePath || null,
      carouselImagePath1: data.carouselImagePath1 || null,
      carouselImagePath2: data.carouselImagePath2 || null,
      carouselImagePath3: data.carouselImagePath3 || null,
      carouselImagePath4: data.carouselImagePath4 || null,
      firstSubheadingImage: data.firstSubheadingImage || null
    },
    validationSchema,
    onSubmit: (values) => {
      setData({
        ...data,
        titleImagePath: values.titleImagePath,
        carouselImagePath1: values.carouselImagePath1,
        carouselImagePath2: values.carouselImagePath2,
        carouselImagePath3: values.carouselImagePath3,
        carouselImagePath4: values.carouselImagePath4,
        firstSubheadingImage: values.firstSubheadingImage
      });
      handleNext();
    }
  });

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Images of the page
      </Typography>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel>Title image</InputLabel>
              <DragDropFileUpload
                formik={formik} // Pass the formik object
                name="titleImagePath" // The name of the field
              />
            </Stack>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={3}>
            <Stack spacing={1}>
              <InputLabel>Carousel Image</InputLabel>
              <DragDropFileUpload
                formik={formik} // Pass the formik object
                name="carouselImagePath1" // The name of the field
              />
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack spacing={1}>
              <InputLabel>Carousel Image</InputLabel>
              <DragDropFileUpload
                formik={formik} // Pass the formik object
                name="carouselImagePath2" // The name of the field
              />
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack spacing={1}>
              <InputLabel>Carousel Image</InputLabel>
              <DragDropFileUpload
                formik={formik} // Pass the formik object
                name="carouselImagePath3" // The name of the field
              />
            </Stack>
          </Grid>
          <Grid item xs={3}>
            <Stack spacing={1}>
              <InputLabel>Carousel Image</InputLabel>
              <DragDropFileUpload
                formik={formik} // Pass the formik object
                name="carouselImagePath4" // The name of the field
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel>First subheading image</InputLabel>
              <DragDropFileUpload
                formik={formik} // Pass the formik object
                name="firstSubheadingImage" // The name of the field
              />
            </Stack>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
              Back
            </Button>
            <AnimateButton>
              <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(1)}>
                Next
              </Button>
            </AnimateButton>
          </Stack>
        </Grid>
      </form>
    </>
  );
}

ImageForm.propTypes = {
  data: PropTypes.any,
  setData: PropTypes.func,
  handleNext: PropTypes.func,
  setErrorIndex: PropTypes.func
};
