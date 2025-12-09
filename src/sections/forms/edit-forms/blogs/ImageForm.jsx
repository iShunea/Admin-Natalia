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
import returnImageObject from 'api/fetchData';
import { useEffect, useState } from 'react';

const validationSchema = yup.object({
  titleImagePath: yup
    .mixed()
    .required('Image is required')
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && value.type && value.type.startsWith('image/');
    }),
  carouselImagePath1: yup
    .mixed()
    .required('Image is required')
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && value.type && value.type.startsWith('image/');
    }),
  carouselImagePath2: yup
    .mixed()
    .required('Image is required')
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && value.type && value.type.startsWith('image/');
    }),
  carouselImagePath3: yup
    .mixed()
    .required('Image is required')
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && value.type && value.type.startsWith('image/');
    }),
  carouselImagePath4: yup
    .mixed()
    .required('Image is required')
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && value.type && value.type.startsWith('image/');
    }),
  firstSubheadingImage: yup
    .mixed()
    .required('Image is required')
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && value.type && value.type.startsWith('image/');
    })
});

// ==============================|| VALIDATION WIZARD - TEXT  ||============================== //
export default function ImageForm({ data, setData, handleNext, handleBack }) {
  const [initialValues, setInitialValues] = useState({
    titleImagePath: null,
    carouselImagePath1: null,
    carouselImagePath2: null,
    carouselImagePath3: null,
    carouselImagePath4: null,
    firstSubheadingImage: null
  });

  useEffect(() => {
    const fetchInitialValues = async () => {
      const titleImagePath = await returnImageObject(data.titleImagePath);
      const carouselImagePath1 = await returnImageObject(data.carouselImagePath1);
      const carouselImagePath2 = await returnImageObject(data.carouselImagePath2);
      const carouselImagePath3 = await returnImageObject(data.carouselImagePath3);
      const carouselImagePath4 = await returnImageObject(data.carouselImagePath4);
      const firstSubheadingImage = await returnImageObject(data.firstSubheadingImage);

      setInitialValues({
        titleImagePath,
        carouselImagePath1,
        carouselImagePath2,
        carouselImagePath3,
        carouselImagePath4,
        firstSubheadingImage
      });
    };

    fetchInitialValues();
  }, [data]);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema,
    enableReinitialize: true,
    onSubmit: async (values) => {
      const resolvedValues = {
        titleImagePath: await values.titleImagePath,
        carouselImagePath1: await values.carouselImagePath1,
        carouselImagePath2: await values.carouselImagePath2,
        carouselImagePath3: await values.carouselImagePath3,
        carouselImagePath4: await values.carouselImagePath4,
        firstSubheadingImage: await values.firstSubheadingImage
      };
      setData({
        ...data,
        ...resolvedValues
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
