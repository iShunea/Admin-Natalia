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
  name: yup.string().required('Name is required'),
  role: yup.string().required('Role is required'),
  bio: yup.string().required('Bio is required'),
  orderIndex: yup.number().required('Order Index is required').min(0)
});

// ==============================|| VALIDATION WIZARD - TEXT  ||============================== //

export default function TextForm({ data, setData, handleNext, setErrorIndex }) {
  const formik = useFormik({
    initialValues: {
      name: data.name ?? '',
      role: data.role ?? '',
      bio: data.bio ?? '',
      orderIndex: data.orderIndex ?? 0
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      setData({
        ...data,
        name: values.name,
        role: values.role,
        bio: values.bio,
        orderIndex: values.orderIndex
      });
      handleNext();
    }
  });

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Team Member Information
      </Typography>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Name</InputLabel>
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
              <InputLabel>Role / Specialization</InputLabel>
              <TextField
                id="role"
                name="role"
                placeholder="Role or specialization (e.g., Periodontist) *"
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
              <InputLabel>Bio / Description</InputLabel>
              <TextField
                id="bio"
                name="bio"
                placeholder="Bio or short description *"
                multiline
                rows={4}
                value={formik.values.bio}
                onChange={formik.handleChange}
                error={formik.touched.bio && Boolean(formik.errors.bio)}
                helperText={formik.touched.bio && formik.errors.bio}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Display Order</InputLabel>
              <TextField
                id="orderIndex"
                name="orderIndex"
                placeholder="Order index (0, 1, 2...) *"
                type="number"
                value={formik.values.orderIndex}
                onChange={formik.handleChange}
                error={formik.touched.orderIndex && Boolean(formik.errors.orderIndex)}
                helperText={formik.touched.orderIndex && formik.errors.orderIndex}
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
