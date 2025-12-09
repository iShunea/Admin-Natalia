import PropTypes from 'prop-types';
// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';

const validationSchema = yup.object({
  id: yup.string().required('Page ID is required'),
  jobTitle: yup.string().required('Title of page is required'),
  location: yup.string().required('Location is required'),
  type: yup.string().required('Type of of job is required'),
  metaDescription: yup.string().required('Meta description is required'),
  metaKeywords: yup.string().required('Meta keywords is required'),
  firstSectionHeading: yup.string().required('First section heading is required'),
  firstSectionList: yup.string().required('First section list is required'),
  secondSectionHeading: yup.string().required('Second section heading is required'),
  secondSectionList: yup.string().required('Second section list is required'),
  thirdSectionHeading: yup.string().required('Third section heading is required'),
  thirdSectionList: yup.string().required('Third section list is required'),
  isInternship: yup.boolean().required('Internship status is required')
});

// ==============================|| VALIDATION WIZARD - TEXT  ||============================== //

export default function TextForm({ data, setData, handleNext, setErrorIndex }) {
  const formik = useFormik({
    initialValues: {
      id: data.id ?? '',
      jobTitle: data.jobTitle ?? '', // Match this with form field name
      location: data.location ?? '',
      type: data.type ?? '',
      metaDescription: data.metaDescription ?? '',
      metaKeywords: data.metaKeywords ?? '',
      firstSectionHeading: data.firstSectionHeading ?? '',
      firstSectionList: data.firstSectionList ? data.firstSectionList.join('\n') : '',
      secondSectionHeading: data.secondSectionHeading ?? '',
      secondSectionList: data.secondSectionList ? data.secondSectionList.join('\n') : '',
      thirdSectionHeading: data.thirdSectionHeading ?? '',
      thirdSectionList: data.thirdSectionList ? data.thirdSectionList.join('\n') : '',
      fourthSectionHeading: data.fourthSectionHeading ?? '',
      fourthSectionList: data.fourthSectionList ? data.fourthSectionList.join('\n') : '',
      isInternship: data.isInternship ?? false
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      setData({
        ...data,
        id: values.id,
        jobTitle: values.jobTitle,
        date: new Date().toISOString().split('T')[0],
        location: values.location,
        type: values.type,
        metaDescription: values.metaDescription,
        metaKeywords: values.metaKeywords,
        firstSectionHeading: values.firstSectionHeading,
        firstSectionList: values.firstSectionList.split('\n'),
        secondSectionHeading: values.secondSectionHeading,
        secondSectionList: values.secondSectionList.split('\n'),
        thirdSectionHeading: values.thirdSectionHeading,
        thirdSectionList: values.thirdSectionList.split('\n'),
        fourthSectionHeading: values.fourthSectionHeading,
        fourthSectionList: values.fourthSectionList.split('\n'),
        isInternship: values.isInternship
      });
      handleNext();
    }
  });

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Text Information on page
      </Typography>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Page ID</InputLabel>
              <TextField
                id="id"
                name="id"
                placeholder="Page ID *"
                multiline
                value={formik.values.id}
                onChange={formik.handleChange}
                error={formik.touched.id && Boolean(formik.errors.id)}
                helperText={formik.touched.id && formik.errors.id}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Internship Status</InputLabel>
              <RadioGroup
                aria-label="internship-status"
                name="isInternship"
                value={formik.values.isInternship ? 'true' : 'false'}
                onChange={(e) => formik.setFieldValue('isInternship', e.target.value === 'true')}
              >
                <FormControlLabel value="false" control={<Radio />} label="Full-time Job" />
                <FormControlLabel value="true" control={<Radio />} label="Internship" />
              </RadioGroup>
              {formik.touched.isInternship && formik.errors.isInternship && (
                <Typography variant="body2" color="error">
                  {formik.errors.isInternship}
                </Typography>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Meta description</InputLabel>
              <TextField
                id="metaDescription"
                name="metaDescription"
                placeholder="Meta description *"
                multiline
                value={formik.values.metaDescription}
                onChange={formik.handleChange}
                error={formik.touched.metaDescription && Boolean(formik.errors.metaDescription)}
                helperText={formik.touched.metaDescription && formik.errors.metaDescription}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Meta description</InputLabel>
              <TextField
                id="metaDescription"
                name="metaDescription"
                placeholder="Meta description *"
                multiline
                value={formik.values.metaDescription}
                onChange={formik.handleChange}
                error={formik.touched.metaDescription && Boolean(formik.errors.metaDescription)}
                helperText={formik.touched.metaDescription && formik.errors.metaDescription}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Meta keywords</InputLabel>
              <TextField
                id="metaKeywords"
                name="metaKeywords"
                placeholder="Meta keywords *"
                multiline
                value={formik.values.metaKeywords}
                onChange={formik.handleChange}
                error={formik.touched.metaKeywords && Boolean(formik.errors.metaKeywords)}
                helperText={formik.touched.metaKeywords && formik.errors.metaKeywords}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Job</InputLabel>
              <TextField
                id="jobTitle"
                name="jobTitle"
                placeholder="Job *"
                multiline
                value={formik.values.jobTitle}
                onChange={formik.handleChange}
                error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
                helperText={formik.touched.jobTitle && formik.errors.jobTitle}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Location</InputLabel>
              <TextField
                id="location"
                name="location"
                placeholder="Location *"
                multiline
                value={formik.values.location}
                onChange={formik.handleChange}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Job type</InputLabel>
              <TextField
                id="type"
                name="type"
                placeholder="Job type *"
                multiline
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
                helperText={formik.touched.type && formik.errors.type}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>First section heading</InputLabel>
              <TextField
                id="firstSectionHeading"
                name="firstSectionHeading"
                multiline
                placeholder="First section heading *"
                value={formik.values.firstSectionHeading}
                onChange={formik.handleChange}
                error={formik.touched.firstSectionHeading && Boolean(formik.errors.firstSectionHeading)}
                helperText={formik.touched.firstSectionHeading && formik.errors.firstSectionHeading}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>First section list</InputLabel>
              <TextField
                id="firstSectionList"
                name="firstSectionList"
                multiline
                minRows={3}
                placeholder="First section list (Insert by newline)*"
                value={formik.values.firstSectionList}
                onChange={formik.handleChange}
                error={formik.touched.firstSectionList && Boolean(formik.errors.firstSectionList)}
                helperText={formik.touched.firstSectionList && formik.errors.firstSectionList}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Second section heading</InputLabel>
              <TextField
                id="secondSectionHeading"
                name="secondSectionHeading"
                multiline
                placeholder="Second section heading *"
                value={formik.values.secondSectionHeading}
                onChange={formik.handleChange}
                error={formik.touched.secondSectionHeading && Boolean(formik.errors.secondSectionHeading)}
                helperText={formik.touched.secondSectionHeading && formik.errors.secondSectionHeading}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Second section list</InputLabel>
              <TextField
                id="secondSectionList"
                name="secondSectionList"
                multiline
                minRows={3}
                placeholder="Second section list (Insert by newline)*"
                value={formik.values.secondSectionList}
                onChange={formik.handleChange}
                error={formik.touched.secondSectionList && Boolean(formik.errors.secondSectionList)}
                helperText={formik.touched.secondSectionList && formik.errors.secondSectionList}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Third section heading</InputLabel>
              <TextField
                id="thirdSectionHeading"
                name="thirdSectionHeading"
                placeholder="Third section heading *"
                multiline
                value={formik.values.thirdSectionHeading}
                onChange={formik.handleChange}
                error={formik.touched.thirdSectionHeading && Boolean(formik.errors.thirdSectionHeading)}
                helperText={formik.touched.thirdSectionHeading && formik.errors.thirdSectionHeading}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Third section list</InputLabel>
              <TextField
                id="thirdSectionList"
                name="thirdSectionList"
                multiline
                minRows={3}
                placeholder="Third section list (Insert by newline)*"
                value={formik.values.thirdSectionList}
                onChange={formik.handleChange}
                error={formik.touched.thirdSectionList && Boolean(formik.errors.thirdSectionList)}
                helperText={formik.touched.thirdSectionList && formik.errors.thirdSectionList}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Fourth section heading</InputLabel>
              <TextField
                id="fourthSectionHeading"
                name="fourthSectionHeading"
                placeholder="Fourth section heading *"
                multiline
                value={formik.values.fourthSectionHeading}
                onChange={formik.handleChange}
                error={formik.touched.fourthSectionHeading && Boolean(formik.errors.fourthSectionHeading)}
                helperText={formik.touched.fourthSectionHeading && formik.errors.fourthSectionHeading}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Fourth section list</InputLabel>
              <TextField
                id="fourthSectionList"
                name="fourthSectionList"
                multiline
                minRows={3}
                placeholder="Fourth section list (Insert by newline)*"
                value={formik.values.fourthSectionList}
                onChange={formik.handleChange}
                error={formik.touched.fourthSectionList && Boolean(formik.errors.fourthSectionList)}
                helperText={formik.touched.fourthSectionList && formik.errors.fourthSectionList}
                fullWidth
                autoComplete="off"
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
