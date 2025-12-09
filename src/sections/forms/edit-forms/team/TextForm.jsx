import PropTypes from 'prop-types';
// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// third-party
import { useFormik } from 'formik';
import * as yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';

const validationSchema = yup.object({
  fullName: yup.string().required('Full Name is required'),
  metaDescription: yup.string().required('Meta description is required'),
  metaKeywords: yup.string().required('Meta keywords is required'),
  job: yup.string().required('Job is required'),
  facebook: yup.string().required('Facebook link is required'),
  linkedin: yup.string().required('LinkedIn link is required'),
  twitter: yup.string().required('Twitter link is required')
});

// ==============================|| VALIDATION WIZARD - TEXT  ||============================== //

export default function TextForm({ data, setData, handleNext, setErrorIndex }) {
  const formik = useFormik({
    initialValues: {
      fullName: data.fullName,
      job: data.job,
      metaDescription: data.metaDescription ?? '',
      metaKeywords: data.metaKeywords ?? '',
      facebook: data.socialMedia && data.socialMedia.facebook ? data.socialMedia.facebook : '',
      linkedin: data.socialMedia && data.socialMedia.linkedin ? data.socialMedia.linkedin : '',
      twitter: data.socialMedia && data.socialMedia.twitter ? data.socialMedia.twitter : ''
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      setData({
        ...data,
        fullName: values.fullName,
        job: values.job,
        metaDescription: values.metaDescription,
        metaKeywords: values.metaKeywords,
        socialMedia: {
          facebook: values.facebook,
          linkedin: values.linkedin,
          twitter: values.twitter
        }
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
              <InputLabel>Full Name</InputLabel>
              <TextField
                id="fullName"
                name="fullName"
                placeholder="Full Name *"
                value={formik.values.fullName}
                onChange={formik.handleChange}
                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                helperText={formik.touched.fullName && formik.errors.fullName}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Job</InputLabel>
              <TextField
                id="job"
                name="job"
                placeholder="Job *"
                value={formik.values.job}
                onChange={formik.handleChange}
                error={formik.touched.job && Boolean(formik.errors.job)}
                helperText={formik.touched.job && formik.errors.job}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Facebook Link</InputLabel>
              <TextField
                id="facebook"
                name="facebook"
                placeholder="Facebook Link *"
                value={formik.values.facebook}
                onChange={formik.handleChange}
                error={formik.touched.facebook && Boolean(formik.errors.facebook)}
                helperText={formik.touched.facebook && formik.errors.facebook}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Linkedin link</InputLabel>
              <TextField
                id="linkedin"
                name="linkedin"
                placeholder="Linkedin link *"
                value={formik.values.linkedin}
                onChange={formik.handleChange}
                error={formik.touched.linkedin && Boolean(formik.errors.linkedin)}
                helperText={formik.touched.linkedin && formik.errors.linkedin}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Twitter Link</InputLabel>
              <TextField
                id="twitter"
                name="twitter"
                placeholder="Twitter Link *"
                value={formik.values.twitter}
                onChange={formik.handleChange}
                error={formik.touched.twitter && Boolean(formik.errors.twitter)}
                helperText={formik.touched.twitter && formik.errors.twitter}
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
