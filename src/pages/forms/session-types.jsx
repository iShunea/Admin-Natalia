import { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Chip,
  Alert,
  CircularProgress,
  FormControlLabel,
  Switch
} from '@mui/material';
import { Add, Trash } from 'iconsax-react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import axios from 'utils/axios';
import { useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
  iconType: yup.string().required('Icon type is required'),
  titleEn: yup.string().required('English title is required'),
  titleRo: yup.string().required('Romanian title is required'),
  titleRu: yup.string().required('Russian title is required'),
  locationEn: yup.string().required('English location is required'),
  locationRo: yup.string().required('Romanian location is required'),
  locationRu: yup.string().required('Russian location is required'),
  duration: yup.string().required('Duration is required'),
  descriptionEn: yup.string().required('English description is required'),
  descriptionRo: yup.string().required('Romanian description is required'),
  descriptionRu: yup.string().required('Russian description is required')
});

export default function SessionTypesForm() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Benefits state
  const [benefitEn, setBenefitEn] = useState('');
  const [benefitRo, setBenefitRo] = useState('');
  const [benefitRu, setBenefitRu] = useState('');

  const formik = useFormik({
    initialValues: {
      iconType: 'building',
      titleEn: '',
      titleRo: '',
      titleRu: '',
      locationEn: '',
      locationRo: '',
      locationRu: '',
      duration: '50 minute',
      descriptionEn: '',
      descriptionRo: '',
      descriptionRu: '',
      benefitsEn: [],
      benefitsRo: [],
      benefitsRu: [],
      isActive: true,
      displayOrder: 0
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        const response = await axios.post('/api/session-types', values);

        setSuccessMessage('Session type created successfully!');
        console.log('Session type created:', response.data);

        // Redirect to list after 2 seconds
        setTimeout(() => {
          navigate('/tables/session-types');
        }, 2000);
      } catch (error) {
        console.error('Error creating session type:', error);
        setErrorMessage(error.response?.data?.message || 'Error creating session type');
      } finally {
        setIsLoading(false);
      }
    }
  });

  const addBenefit = (lang) => {
    const fieldName = `benefits${lang}`;
    const stateMap = { En: benefitEn, Ro: benefitRo, Ru: benefitRu };
    const setStateMap = { En: setBenefitEn, Ro: setBenefitRo, Ru: setBenefitRu };

    const value = stateMap[lang];
    if (value.trim()) {
      formik.setFieldValue(fieldName, [...formik.values[fieldName], value.trim()]);
      setStateMap[lang]('');
    }
  };

  const removeBenefit = (lang, index) => {
    const fieldName = `benefits${lang}`;
    const newBenefits = formik.values[fieldName].filter((_, i) => i !== index);
    formik.setFieldValue(fieldName, newBenefits);
  };

  return (
    <MainCard title="Add Session Type">
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

          {/* Icon Type */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Icon Type *</InputLabel>
              <Select
                id="iconType"
                name="iconType"
                value={formik.values.iconType}
                onChange={formik.handleChange}
                error={formik.touched.iconType && Boolean(formik.errors.iconType)}
              >
                <MenuItem value="building">Building (Ședință la cabinet)</MenuItem>
                <MenuItem value="video">Video (Ședință online)</MenuItem>
                <MenuItem value="message">Message (Prima consultație)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              id="duration"
              name="duration"
              label="Duration *"
              placeholder="e.g., 50 minute"
              value={formik.values.duration}
              onChange={formik.handleChange}
              error={formik.touched.duration && Boolean(formik.errors.duration)}
              helperText={formik.touched.duration && formik.errors.duration}
            />
          </Grid>

          {/* Titles */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Titles
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="titleEn"
              name="titleEn"
              label="Title (English) *"
              value={formik.values.titleEn}
              onChange={formik.handleChange}
              error={formik.touched.titleEn && Boolean(formik.errors.titleEn)}
              helperText={formik.touched.titleEn && formik.errors.titleEn}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="titleRo"
              name="titleRo"
              label="Title (Romanian) *"
              value={formik.values.titleRo}
              onChange={formik.handleChange}
              error={formik.touched.titleRo && Boolean(formik.errors.titleRo)}
              helperText={formik.touched.titleRo && formik.errors.titleRo}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="titleRu"
              name="titleRu"
              label="Title (Russian) *"
              value={formik.values.titleRu}
              onChange={formik.handleChange}
              error={formik.touched.titleRu && Boolean(formik.errors.titleRu)}
              helperText={formik.touched.titleRu && formik.errors.titleRu}
            />
          </Grid>

          {/* Locations */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Locations
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="locationEn"
              name="locationEn"
              label="Location (English) *"
              placeholder="e.g., Cabinet or online"
              value={formik.values.locationEn}
              onChange={formik.handleChange}
              error={formik.touched.locationEn && Boolean(formik.errors.locationEn)}
              helperText={formik.touched.locationEn && formik.errors.locationEn}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="locationRo"
              name="locationRo"
              label="Location (Romanian) *"
              placeholder="e.g., Cabinet sau online"
              value={formik.values.locationRo}
              onChange={formik.handleChange}
              error={formik.touched.locationRo && Boolean(formik.errors.locationRo)}
              helperText={formik.touched.locationRo && formik.errors.locationRo}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              id="locationRu"
              name="locationRu"
              label="Location (Russian) *"
              placeholder="e.g., Кабинет или онлайн"
              value={formik.values.locationRu}
              onChange={formik.handleChange}
              error={formik.touched.locationRu && Boolean(formik.errors.locationRu)}
              helperText={formik.touched.locationRu && formik.errors.locationRu}
            />
          </Grid>

          {/* Descriptions */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Descriptions
            </Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="descriptionEn"
              name="descriptionEn"
              label="Description (English) *"
              value={formik.values.descriptionEn}
              onChange={formik.handleChange}
              error={formik.touched.descriptionEn && Boolean(formik.errors.descriptionEn)}
              helperText={formik.touched.descriptionEn && formik.errors.descriptionEn}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="descriptionRo"
              name="descriptionRo"
              label="Description (Romanian) *"
              value={formik.values.descriptionRo}
              onChange={formik.handleChange}
              error={formik.touched.descriptionRo && Boolean(formik.errors.descriptionRo)}
              helperText={formik.touched.descriptionRo && formik.errors.descriptionRo}
            />
          </Grid>

          <Grid item xs={12} sm={4}>
            <TextField
              fullWidth
              multiline
              rows={4}
              id="descriptionRu"
              name="descriptionRu"
              label="Description (Russian) *"
              value={formik.values.descriptionRu}
              onChange={formik.handleChange}
              error={formik.touched.descriptionRu && Boolean(formik.errors.descriptionRu)}
              helperText={formik.touched.descriptionRu && formik.errors.descriptionRu}
            />
          </Grid>

          {/* Benefits */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Benefits (Check marks)
            </Typography>
          </Grid>

          {/* English Benefits */}
          <Grid item xs={12} sm={4}>
            <Box>
              <TextField
                fullWidth
                label="Add Benefit (English)"
                value={benefitEn}
                onChange={(e) => setBenefitEn(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addBenefit('En');
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => addBenefit('En')} color="primary">
                      <Add />
                    </IconButton>
                  )
                }}
              />
              <List dense sx={{ mt: 1 }}>
                {formik.values.benefitsEn.map((benefit, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => removeBenefit('En', index)}>
                        <Trash size="16" />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={`✓ ${benefit}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>

          {/* Romanian Benefits */}
          <Grid item xs={12} sm={4}>
            <Box>
              <TextField
                fullWidth
                label="Add Benefit (Romanian)"
                value={benefitRo}
                onChange={(e) => setBenefitRo(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addBenefit('Ro');
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => addBenefit('Ro')} color="primary">
                      <Add />
                    </IconButton>
                  )
                }}
              />
              <List dense sx={{ mt: 1 }}>
                {formik.values.benefitsRo.map((benefit, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => removeBenefit('Ro', index)}>
                        <Trash size="16" />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={`✓ ${benefit}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>

          {/* Russian Benefits */}
          <Grid item xs={12} sm={4}>
            <Box>
              <TextField
                fullWidth
                label="Add Benefit (Russian)"
                value={benefitRu}
                onChange={(e) => setBenefitRu(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addBenefit('Ru');
                  }
                }}
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => addBenefit('Ru')} color="primary">
                      <Add />
                    </IconButton>
                  )
                }}
              />
              <List dense sx={{ mt: 1 }}>
                {formik.values.benefitsRu.map((benefit, index) => (
                  <ListItem
                    key={index}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => removeBenefit('Ru', index)}>
                        <Trash size="16" />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={`✓ ${benefit}`} />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>

          {/* Display Settings */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Display Settings
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControlLabel
              control={
                <Switch
                  checked={formik.values.isActive}
                  onChange={(e) => formik.setFieldValue('isActive', e.target.checked)}
                  name="isActive"
                />
              }
              label="Active (visible on website)"
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              type="number"
              id="displayOrder"
              name="displayOrder"
              label="Display Order"
              value={formik.values.displayOrder}
              onChange={formik.handleChange}
              helperText="Lower numbers appear first"
            />
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <AnimateButton>
              <Button type="submit" variant="contained" disabled={isLoading} sx={{ mt: 2 }}>
                {isLoading ? (
                  <>
                    <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                    Creating...
                  </>
                ) : (
                  'Create Session Type'
                )}
              </Button>
            </AnimateButton>
          </Grid>
        </Grid>
      </form>
    </MainCard>
  );
}
