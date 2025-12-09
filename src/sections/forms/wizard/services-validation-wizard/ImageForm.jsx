import PropTypes from 'prop-types';
// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
// import Checkbox from '@mui/material/Checkbox';
// import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
// import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
// import { Input } from '@mui/material';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import DragDropFileUpload from 'components/DragDropFileUpload';
// import DragDropFileUpload from 'components/DragDropFileUpload';

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
  const formik = useFormik({
    initialValues: {
      imageLabelSrc: data.imageLabelSrc || null,
      firstIconPath: data.firstIconPath || null,
      secondIconPath: data.secondIconPath || null,
      imageTitlePath: data.imageTitlePath || null
    },
    validationSchema,
    onSubmit: (values) => {
      setData({
        ...data,
        imageLabelSrc: values.imageLabelSrc,
        firstIconPath: values.firstIconPath,
        secondIconPath: values.secondIconPath,
        imageTitlePath: values.imageTitlePath
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

          {/* <Grid item xs={12}>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <InputLabel>Icon SVG</InputLabel>
                <DragDropFileUpload
                  onFileUpload={(file) => {
                    formik.setFieldValue('firstIconPath', file);
                  }}
                />
              </Stack>
            </Grid>
          </Grid> */}
          {/* <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Address 1</InputLabel>
              <TextField id="address1" name="address1" placeholder="Address line 1" fullWidth autoComplete="shipping address-line1" />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Address 2</InputLabel>
              <TextField id="address2" name="address2" placeholder="Address line 2" fullWidth autoComplete="shipping address-line2" />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Enter City</InputLabel>
              <TextField id="city" name="city" placeholder="City" fullWidth autoComplete="shipping address-level2" />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Enter State</InputLabel>
              <TextField id="state" name="state" placeholder="State/Province/Region" fullWidth />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Zip Code</InputLabel>
              <TextField id="zip" name="zip" placeholder="Zip / Postal code" fullWidth autoComplete="shipping postal-code" />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack spacing={1}>
              <InputLabel>Enter Country</InputLabel>
              <TextField id="country" name="country" placeholder="Country" fullWidth autoComplete="shipping country" />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox color="primary" name="saveAddress" value="yes" />}
              label="Use this address for payment details"
            />
          </Grid> */}
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
