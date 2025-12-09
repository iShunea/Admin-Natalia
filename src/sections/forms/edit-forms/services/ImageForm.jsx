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
import { useEffect, useState } from 'react';
import returnImageObject from 'api/fetchData';

const validationSchema = yup.object({
  imageLabelSrc: yup
    .mixed()
    .required('Image is required')
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && value.type && value.type.startsWith('image/');
    }),
  firstIconPath: yup
    .mixed()
    .required('First icon is required')
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && value.type && value.type.startsWith('image/');
    }),
  secondIconPath: yup
    .mixed()
    .required('Second icon is required')
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && value.type && value.type.startsWith('image/');
    }),
  imageTitlePath: yup
    .mixed()
    .required('Title image is required')
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
      const imageLabelSrc = await returnImageObject(data.imageLabelSrc);
      const firstIconPath = await returnImageObject(data.firstIconPath);
      const secondIconPath = await returnImageObject(data.secondIconPath);
      const imageTitlePath = await returnImageObject(data.imageTitlePath);

      setInitialValues({
        imageLabelSrc,
        firstIconPath,
        secondIconPath,
        imageTitlePath
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
        imageLabelSrc: (await values.imageLabelSrc) || null,
        firstIconPath: (await values.firstIconPath) || null,
        secondIconPath: (await values.secondIconPath) || null,
        imageTitlePath: (await values.imageTitlePath) || null
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
              <InputLabel>Label Image of page</InputLabel>
              <DragDropFileUpload
                formik={formik} // Pass the formik object
                name="imageLabelSrc" // The name of the field
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel>First Icon</InputLabel>
              <DragDropFileUpload
                formik={formik} // Pass the formik object
                name="firstIconPath" // The name of the field
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel>Second Icon</InputLabel>
              <DragDropFileUpload
                formik={formik} // Pass the formik object
                name="secondIconPath" // The name of the field
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel>Title Image</InputLabel>
              <DragDropFileUpload
                formik={formik} // Pass the formik object
                name="imageTitlePath" // The name of the field
              />
            </Stack>
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
