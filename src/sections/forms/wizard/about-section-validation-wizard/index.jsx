import { useState, useEffect } from 'react';
import { Stepper, Step, StepLabel, Box, Button, Typography, CircularProgress } from '@mui/material';
import axiosInstance from 'api/axios-instance';
import InfoForm from './InfoForm';
import ItemsForm from './ItemsForm';
import ImagesForm from './ImagesForm';
import Review from './Review';

const allSections = [
  { value: 'hero', label: 'Hero Section', order: 1 },
  { value: 'approach', label: 'Therapeutic Approach', order: 2 },
  { value: 'values', label: 'Values', order: 3 },
  { value: 'expertise', label: 'Expertise Areas', order: 4 },
  { value: 'qualifications', label: 'Qualifications', order: 5 },
  { value: 'diaspora', label: 'Diaspora Section', order: 6 },
  { value: 'cta', label: 'Call-to-Action', order: 7 }
];

export default function AboutSectionWizard() {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const currentSection = allSections[currentSectionIndex];

  const [data, setData] = useState({
    sectionType: currentSection.value,
    items: [],
    ctaButtons: [],
    displayOrder: currentSection.order,
    backgroundColor: 'bg-background',
    isActive: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingData, setIsFetchingData] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [existingSectionId, setExistingSectionId] = useState(null);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setCurrentSectionIndex(0);
    const firstSection = allSections[0];
    setData({
      sectionType: firstSection.value,
      items: [],
      ctaButtons: [],
      displayOrder: firstSection.order,
      backgroundColor: 'bg-background',
      isActive: true
    });
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleNextSection = () => {
    if (currentSectionIndex < allSections.length - 1) {
      const nextIndex = currentSectionIndex + 1;
      const nextSection = allSections[nextIndex];
      setCurrentSectionIndex(nextIndex);
      setActiveStep(0);
      setData({
        sectionType: nextSection.value,
        items: [],
        ctaButtons: [],
        displayOrder: nextSection.order,
        backgroundColor: 'bg-background',
        isActive: true
      });
      setErrorMessage('');
      setSuccessMessage('');
    }
  };

  const handlePreviousSection = () => {
    if (currentSectionIndex > 0) {
      const prevIndex = currentSectionIndex - 1;
      const prevSection = allSections[prevIndex];
      setCurrentSectionIndex(prevIndex);
      setActiveStep(0);
      setData({
        sectionType: prevSection.value,
        items: [],
        ctaButtons: [],
        displayOrder: prevSection.order,
        backgroundColor: 'bg-background',
        isActive: true
      });
      setErrorMessage('');
      setSuccessMessage('');
    }
  };

  const handleGoToSection = (index) => {
    const targetSection = allSections[index];
    setCurrentSectionIndex(index);
    setActiveStep(0);
    setErrorMessage('');
    setSuccessMessage('');
    // Data will be loaded by useEffect
  };

  // Fetch existing section data when section changes
  useEffect(() => {
    const fetchSectionData = async () => {
      try {
        setIsFetchingData(true);
        const response = await axiosInstance.get(`/api/about-sections/type/${currentSection.value}`);

        if (response.data) {
          // Section exists, populate with saved data
          setData({
            sectionType: response.data.sectionType,
            titleEn: response.data.titleEn || '',
            titleRo: response.data.titleRo || '',
            titleRu: response.data.titleRu || '',
            subtitleEn: response.data.subtitleEn || '',
            subtitleRo: response.data.subtitleRo || '',
            subtitleRu: response.data.subtitleRu || '',
            contentEn: response.data.contentEn || '',
            contentRo: response.data.contentRo || '',
            contentRu: response.data.contentRu || '',
            items: response.data.items || [],
            ctaButtons: response.data.ctaButtons || [],
            displayOrder: response.data.displayOrder || currentSection.order,
            backgroundColor: response.data.backgroundColor || 'bg-background',
            isActive: response.data.isActive !== undefined ? response.data.isActive : true,
            imageUrl: response.data.imageUrl || '',
            imageAltTextEn: response.data.imageAltTextEn || '',
            imageAltTextRo: response.data.imageAltTextRo || '',
            imageAltTextRu: response.data.imageAltTextRu || ''
          });
          setExistingSectionId(response.data.id || response.data._id);
        } else {
          // Section doesn't exist, use default data
          resetSectionData();
        }
      } catch (error) {
        // Section not found (404), use default data
        if (error.response?.status === 404) {
          resetSectionData();
        } else {
          console.error('Error fetching section data:', error);
        }
      } finally {
        setIsFetchingData(false);
      }
    };

    const resetSectionData = () => {
      setData({
        sectionType: currentSection.value,
        items: [],
        ctaButtons: [],
        displayOrder: currentSection.order,
        backgroundColor: 'bg-background',
        isActive: true
      });
      setExistingSectionId(null);
    };

    fetchSectionData();
  }, [currentSectionIndex]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData();

      // Append all text fields
      Object.keys(data).forEach(key => {
        if (key === 'items' || key === 'ctaButtons') {
          formData.append(key, JSON.stringify(data[key]));
        } else if (key === 'imageUrl' && data[key] instanceof File) {
          formData.append('imageUrl', data[key]);
        } else if (key === 'itemImages' && Array.isArray(data[key])) {
          data[key].forEach(file => {
            if (file instanceof File) {
              formData.append('itemImages', file);
            }
          });
        } else if (data[key] !== undefined && data[key] !== null) {
          formData.append(key, data[key]);
        }
      });

      let response;
      if (existingSectionId) {
        // Update existing section
        response = await axiosInstance.put(`/api/about-sections/${existingSectionId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        // Create new section
        response = await axiosInstance.post('/api/about-sections', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      if (response.status === 201 || response.status === 200) {
        setErrorMessage('');
        setSuccessMessage(`${currentSection.label} saved successfully!`);
        setExistingSectionId(response.data.id || response.data._id);
        handleNext(); // Success screen
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Failed to save section');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteSection = async () => {
    if (!existingSectionId) {
      setErrorMessage('No section to delete');
      return;
    }

    if (!window.confirm(`Are you sure you want to delete ${currentSection.label}? This will reset it to default mock data.`)) {
      return;
    }

    try {
      setIsLoading(true);
      await axiosInstance.delete(`/api/about-sections/${existingSectionId}`);

      setSuccessMessage(`${currentSection.label} deleted successfully! Reset to default.`);
      setExistingSectionId(null);

      // Reset to default data
      setData({
        sectionType: currentSection.value,
        items: [],
        ctaButtons: [],
        displayOrder: currentSection.order,
        backgroundColor: 'bg-background',
        isActive: true
      });
      setActiveStep(0);
    } catch (error) {
      setErrorMessage(error.response?.data?.error || 'Failed to delete section');
    } finally {
      setIsLoading(false);
    }
  };

  // Conditional step 2 (Items) - doar pentru values, expertise, qualifications
  const needsItemsStep = ['values', 'expertise', 'qualifications'].includes(data.sectionType);

  const getStepContent = (step) => {
    // Adjust steps based on sectionType
    let adjustedStep = step;
    if (!needsItemsStep && step > 0) {
      adjustedStep = step + 1; // Skip Items step
    }

    switch (adjustedStep) {
      case 0:
        return <InfoForm data={data} setData={setData} handleNext={handleNext} />;
      case 1:
        return <ItemsForm data={data} setData={setData} handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return <ImagesForm data={data} setData={setData} handleNext={handleNext} handleBack={handleBack} />;
      case 3:
        return <Review data={data} handleSubmit={handleSubmit} handleBack={handleBack} isLoading={isLoading} errorMessage={errorMessage} />;
      default:
        return 'Unknown step';
    }
  };

  const filteredSteps = needsItemsStep ? ['Section Info', 'Items/Lists', 'Images', 'Review'] : ['Section Info', 'Images', 'Review'];
  const steps = filteredSteps;

  if (isFetchingData) {
    return (
      <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
        <Typography sx={{ ml: 2 }}>Loading {currentSection.label}...</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%' }}>
      {/* Section Progress Indicator */}
      <Box sx={{ mb: 3, p: 2, backgroundColor: 'background.paper', borderRadius: 1, border: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h5">
            About Page Sections ({currentSectionIndex + 1} of {allSections.length})
          </Typography>
          {existingSectionId && (
            <Button
              variant="outlined"
              color="error"
              size="small"
              onClick={handleDeleteSection}
              disabled={isLoading}
            >
              Reset to Default
            </Button>
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          {allSections.map((section, index) => (
            <Box
              key={section.value}
              onClick={() => handleGoToSection(index)}
              sx={{
                px: 2,
                py: 0.5,
                borderRadius: 1,
                backgroundColor: index === currentSectionIndex ? 'primary.main' : index < currentSectionIndex ? 'success.light' : 'grey.200',
                color: index === currentSectionIndex ? 'white' : index < currentSectionIndex ? 'success.dark' : 'text.secondary',
                fontSize: '0.875rem',
                fontWeight: index === currentSectionIndex ? 'bold' : 'normal',
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 2,
                  backgroundColor: index === currentSectionIndex ? 'primary.dark' : index < currentSectionIndex ? 'success.main' : 'grey.300'
                }
              }}
            >
              {section.order}. {section.label}
            </Box>
          ))}
        </Box>
        {existingSectionId && (
          <Typography variant="caption" color="success.main" sx={{ mt: 1, display: 'block' }}>
            ✓ This section has saved data (editing existing content)
          </Typography>
        )}
      </Box>

      <Stepper activeStep={activeStep}>
        {filteredSteps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {activeStep === filteredSteps.length ? (
          <Box sx={{ textAlign: 'center' }}>
            <h2>{successMessage || 'Section Added Successfully!'}</h2>
            <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
              {currentSectionIndex < allSections.length - 1 ? (
                <>
                  <Button onClick={handlePreviousSection} variant="outlined" disabled={currentSectionIndex === 0}>
                    Previous Section
                  </Button>
                  <Button onClick={handleNextSection} variant="contained">
                    Next Section: {allSections[currentSectionIndex + 1]?.label}
                  </Button>
                </>
              ) : (
                <Button onClick={handleReset} variant="contained" sx={{ mt: 2 }}>
                  Return to First Section
                </Button>
              )}
            </Box>
          </Box>
        ) : (
          getStepContent(activeStep)
        )}
      </Box>
    </Box>
  );
}
