import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import axios from 'utils/axios';

export default function SpecialOfferForm() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(3600);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      await axios.post('/api/forms/special-offer', values);
      setSubmitSuccess(true);
      setTimeout(() => {
        navigate('/tables/blogs');
      }, 2000);
    } catch (error) {
      setErrors({ submit: error.message || 'Failed to submit form' });
      setSubmitting(false);
    }
  };

  return (
    <MainCard title="Special Offer - Limited Time">
      <Box sx={{ mb: 3, textAlign: 'center' }}>
        <Typography variant="h2" color="error" sx={{ mb: 1 }}>
          {formatTime(timeLeft)}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Time remaining for this special offer
        </Typography>
      </Box>

      <Formik
        initialValues={{
          name: '',
          email: '',
          phone: '',
          company: '',
          message: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          name: Yup.string().max(255).required('Name is required'),
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          phone: Yup.string().max(20).required('Phone is required'),
          company: Yup.string().max(255),
          message: Yup.string().max(500)
        })}
        onSubmit={handleSubmit}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {submitSuccess && (
                <Grid item xs={12}>
                  <Alert severity="success">
                    Form submitted successfully! Redirecting to content...
                  </Alert>
                </Grid>
              )}

              {errors.submit && (
                <Grid item xs={12}>
                  <Alert severity="error">{errors.submit}</Alert>
                </Grid>
              )}

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1">Name *</Typography>
                  <TextField
                    fullWidth
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1">Email *</Typography>
                  <TextField
                    fullWidth
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1">Phone *</Typography>
                  <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={Boolean(touched.phone && errors.phone)}
                    helperText={touched.phone && errors.phone}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1">Company</Typography>
                  <TextField
                    fullWidth
                    id="company"
                    name="company"
                    placeholder="Enter your company name"
                    value={values.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1">Message</Typography>
                  <TextField
                    fullWidth
                    id="message"
                    name="message"
                    multiline
                    rows={4}
                    placeholder="Enter your message or special requirements"
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Stack>
              </Grid>

              <Grid item xs={12}>
                <Stack direction="row" justifyContent="flex-end" spacing={2}>
                  <AnimateButton>
                    <Button
                      variant="contained"
                      type="submit"
                      disabled={isSubmitting || timeLeft === 0}
                      size="large"
                    >
                      {timeLeft === 0 ? 'Offer Expired' : 'Submit Offer Request'}
                    </Button>
                  </AnimateButton>
                </Stack>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </MainCard>
  );
}
