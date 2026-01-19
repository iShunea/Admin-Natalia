import { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
  CircularProgress,
  Alert
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import axios from 'utils/axios';

const validationSchema = yup.object({
  phoneNumber: yup.string().required('Phone number is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  addressEn: yup.string(),
  addressRo: yup.string(),
  addressRu: yup.string()
});

export default function ContactsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      phoneNumber: '',
      secondaryPhoneNumber: '',
      whatsappNumber: '',
      email: '',
      secondaryEmail: '',
      addressEn: '',
      addressRo: '',
      addressRu: '',
      workingHoursEn: '',
      workingHoursRo: '',
      workingHoursRu: '',
      facebookUrl: '',
      instagramUrl: '',
      linkedinUrl: '',
      twitterUrl: '',
      latitude: '',
      longitude: '',
      emergencyContact: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        const response = await axios.put('/api/contacts', values);

        setSuccessMessage('Contact information updated successfully!');
        console.log('Contact updated:', response.data);
      } catch (error) {
        console.error('Error updating contact:', error);
        setErrorMessage(error.response?.data?.message || 'Error updating contact information');
      } finally {
        setIsLoading(false);
      }
    }
  });

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setIsFetching(true);
        const response = await axios.get('/api/contacts');

        if (response.data) {
          formik.setValues(response.data);
        }
      } catch (error) {
        console.error('Error fetching contact:', error);
        setErrorMessage('Error loading contact information');
      } finally {
        setIsFetching(false);
      }
    };

    fetchContact();
  }, []);

  if (isFetching) {
    return (
      <MainCard title="Contact Information">
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      </MainCard>
    );
  }

  return (
    <MainCard title="Contact Information">
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          {successMessage && (
            <Grid item xs={12}>
              <Alert severity="success" onClose={() => setSuccessMessage('')}>
                {successMessage}
              </Alert>
            </Grid>
          )}

          {errorMessage && (
            <Grid item xs={12}>
              <Alert severity="error" onClose={() => setErrorMessage('')}>
                {errorMessage}
              </Alert>
            </Grid>
          )}

          {/* Phone Numbers Section */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Phone Numbers
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="phoneNumber"
              name="phoneNumber"
              label="Primary Phone Number *"
              value={formik.values.phoneNumber}
              onChange={formik.handleChange}
              error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
              helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="secondaryPhoneNumber"
              name="secondaryPhoneNumber"
              label="Secondary Phone Number"
              value={formik.values.secondaryPhoneNumber}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="whatsappNumber"
              name="whatsappNumber"
              label="WhatsApp Number"
              value={formik.values.whatsappNumber}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="emergencyContact"
              name="emergencyContact"
              label="Emergency Contact"
              value={formik.values.emergencyContact}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Email Section */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
              Email Addresses
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="email"
              name="email"
              label="Primary Email *"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="secondaryEmail"
              name="secondaryEmail"
              label="Secondary Email"
              type="email"
              value={formik.values.secondaryEmail}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Address Section */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
              Physical Address
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="addressEn"
              name="addressEn"
              label="Address (English)"
              multiline
              rows={3}
              value={formik.values.addressEn}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="addressRo"
              name="addressRo"
              label="Address (Romanian)"
              multiline
              rows={3}
              value={formik.values.addressRo}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="addressRu"
              name="addressRu"
              label="Address (Russian)"
              multiline
              rows={3}
              value={formik.values.addressRu}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Working Hours Section */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
              Working Hours
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="workingHoursEn"
              name="workingHoursEn"
              label="Working Hours (English)"
              multiline
              rows={3}
              value={formik.values.workingHoursEn}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="workingHoursRo"
              name="workingHoursRo"
              label="Working Hours (Romanian)"
              multiline
              rows={3}
              value={formik.values.workingHoursRo}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="workingHoursRu"
              name="workingHoursRu"
              label="Working Hours (Russian)"
              multiline
              rows={3}
              value={formik.values.workingHoursRu}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Social Media Section */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
              Social Media Links
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="facebookUrl"
              name="facebookUrl"
              label="Facebook URL"
              value={formik.values.facebookUrl}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="instagramUrl"
              name="instagramUrl"
              label="Instagram URL"
              value={formik.values.instagramUrl}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="linkedinUrl"
              name="linkedinUrl"
              label="LinkedIn URL"
              value={formik.values.linkedinUrl}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="twitterUrl"
              name="twitterUrl"
              label="Twitter URL"
              value={formik.values.twitterUrl}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Map Coordinates Section */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2, mt: 2 }}>
              Map Coordinates
            </Typography>
            <Divider />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="latitude"
              name="latitude"
              label="Latitude"
              value={formik.values.latitude}
              onChange={formik.handleChange}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="longitude"
              name="longitude"
              label="Longitude"
              value={formik.values.longitude}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <AnimateButton>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{ mt: 2 }}
              >
                {isLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                    Saving...
                  </>
                ) : (
                  'Save Contact Information'
                )}
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
}
