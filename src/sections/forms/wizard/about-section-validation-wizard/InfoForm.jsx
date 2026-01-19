import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Grid,
  Typography
} from '@mui/material';
import MainCard from 'components/MainCard';
import MultiLanguageTabs from 'components/forms/MultiLanguageTabs';
import AnimateButton from 'components/@extended/AnimateButton';

const validationSchema = yup.object({
  sectionType: yup.string().required('Section type is required'),
  titleEn: yup.string().required('English title required'),
  titleRo: yup.string().required('Romanian title required'),
  titleRu: yup.string().required('Russian title required'),
  displayOrder: yup.number().required('Display order required')
});

const sectionTypes = [
  { value: 'hero', label: 'Hero Section', order: 1 },
  { value: 'approach', label: 'Therapeutic Approach', order: 2 },
  { value: 'values', label: 'Values', order: 3 },
  { value: 'expertise', label: 'Expertise Areas', order: 4 },
  { value: 'qualifications', label: 'Qualifications', order: 5 },
  { value: 'diaspora', label: 'Diaspora Section', order: 6 },
  { value: 'cta', label: 'Call-to-Action', order: 7 }
];

export default function InfoForm({ data, setData, handleNext }) {
  const [currentLang, setCurrentLang] = useState('en');

  const formik = useFormik({
    initialValues: {
      sectionType: data.sectionType || 'hero',
      titleEn: data.titleEn || '',
      titleRo: data.titleRo || '',
      titleRu: data.titleRu || '',
      subtitleEn: data.subtitleEn || '',
      subtitleRo: data.subtitleRo || '',
      subtitleRu: data.subtitleRu || '',
      contentEn: data.contentEn || '',
      contentRo: data.contentRo || '',
      contentRu: data.contentRu || '',
      displayOrder: data.displayOrder || 0,
      backgroundColor: data.backgroundColor || 'bg-background'
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      setData({ ...data, ...values });
      handleNext();
    }
  });

  const getTitleField = () => {
    const fieldMap = { en: 'titleEn', ro: 'titleRo', ru: 'titleRu' };
    return fieldMap[currentLang];
  };

  const getSubtitleField = () => {
    const fieldMap = { en: 'subtitleEn', ro: 'subtitleRo', ru: 'subtitleRu' };
    return fieldMap[currentLang];
  };

  const getContentField = () => {
    const fieldMap = { en: 'contentEn', ro: 'contentRo', ru: 'contentRu' };
    return fieldMap[currentLang];
  };

  const currentSection = sectionTypes.find(s => s.value === formik.values.sectionType);
  const sectionLabel = currentSection ? currentSection.label : 'Unknown Section';

  return (
    <form onSubmit={formik.handleSubmit}>
      <MainCard title={`About Page - ${sectionLabel}`}>
        <Grid container spacing={3}>
          {/* Section Type - Hidden but kept in form data */}
          <Grid item xs={12}>
            <Typography variant="h6" sx={{ mb: 1, color: 'primary.main' }}>
              Section {currentSection?.order || ''}: {sectionLabel}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Fill in the content for this section as it appears on the About page
            </Typography>
          </Grid>

          {/* Display Order */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              type="number"
              id="displayOrder"
              name="displayOrder"
              label="Display Order"
              value={formik.values.displayOrder}
              onChange={formik.handleChange}
              error={formik.touched.displayOrder && Boolean(formik.errors.displayOrder)}
              helperText={formik.touched.displayOrder && formik.errors.displayOrder}
            />
          </Grid>

          {/* Background Color */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              id="backgroundColor"
              name="backgroundColor"
              label="Background CSS Class"
              value={formik.values.backgroundColor}
              onChange={formik.handleChange}
              placeholder="bg-secondary, bg-card, etc."
            />
          </Grid>

          {/* Language Tabs */}
          <Grid item xs={12}>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Multilingual Content
            </Typography>
            <MultiLanguageTabs
              value={currentLang}
              onChange={(e, newValue) => setCurrentLang(newValue)}
            />
          </Grid>

          {/* Title */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id={getTitleField()}
              name={getTitleField()}
              label={`Title (${currentLang.toUpperCase()})`}
              value={formik.values[getTitleField()]}
              onChange={formik.handleChange}
              error={formik.touched[getTitleField()] && Boolean(formik.errors[getTitleField()])}
              helperText={formik.touched[getTitleField()] && formik.errors[getTitleField()]}
            />
          </Grid>

          {/* Subtitle */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              id={getSubtitleField()}
              name={getSubtitleField()}
              label={`Subtitle (${currentLang.toUpperCase()})`}
              value={formik.values[getSubtitleField()]}
              onChange={formik.handleChange}
            />
          </Grid>

          {/* Content */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              rows={8}
              id={getContentField()}
              name={getContentField()}
              label={`Content (${currentLang.toUpperCase()})`}
              value={formik.values[getContentField()]}
              onChange={formik.handleChange}
              helperText="You can use HTML tags for formatting"
            />
          </Grid>

          {/* Submit */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <AnimateButton>
                <Button type="submit" variant="contained">
                  Next: {['values', 'expertise', 'qualifications'].includes(formik.values.sectionType) ? 'Items/Lists' : 'Images'}
                </Button>
              </AnimateButton>
            </Box>
          </Grid>
        </Grid>
      </MainCard>
    </form>
  );
}
