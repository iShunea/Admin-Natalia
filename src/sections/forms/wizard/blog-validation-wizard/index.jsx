import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import Review from './Review';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import TextForm from './TextForm';
import ImageForm from './ImageForm';
import axiosInstance from 'api/axios-instance';
import { CircularProgress } from '@mui/material';

// step options
const steps = ['Add Text', 'Add Images', 'Review Page'];

const getStepContent = (step, handleNext, handleBack, setErrorIndex, data, setData) => {
  switch (step) {
    case 0:
      return <TextForm handleNext={handleNext} setErrorIndex={setErrorIndex} data={data} setData={setData} />;
    case 1:
      return <ImageForm handleNext={handleNext} handleBack={handleBack} setErrorIndex={setErrorIndex} data={data} setData={setData} />;
    case 2:
      return <Review data={data} />;
    default:
      throw new Error('Unknown step');
  }
};

// ==============================|| FORMS WIZARD - VALIDATION ||============================== //

function checkPreviousState(prevState) {
  if (prevState) {
    return prevState;
  }
  return {};
}

export default function AddBlogPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState(checkPreviousState);
  const [errorIndex, setErrorIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    setErrorIndex(null);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      
      const formData = new FormData();
      
      if (data.titleImagePath && data.titleImagePath instanceof File) {
        formData.append('image', data.titleImagePath);
      }
      
      formData.append('blogTitleEn', data.blogTitleEn || '');
      formData.append('blogTitleRo', data.blogTitleRo || '');
      formData.append('blogTitleRu', data.blogTitleRu || '');
      
      formData.append('blogIntroEn', data.blogIntroEn || '');
      formData.append('blogIntroRo', data.blogIntroRo || '');
      formData.append('blogIntroRu', data.blogIntroRu || '');
      
      formData.append('firstSubheadingTitleEn', data.firstSubheadingTitleEn || '');
      formData.append('firstSubheadingTitleRo', data.firstSubheadingTitleRo || '');
      formData.append('firstSubheadingTitleRu', data.firstSubheadingTitleRu || '');
      formData.append('firstSubheadingTextEn', data.firstSubheadingTextEn || '');
      formData.append('firstSubheadingTextRo', data.firstSubheadingTextRo || '');
      formData.append('firstSubheadingTextRu', data.firstSubheadingTextRu || '');
      
      formData.append('secondSubheadingTitleEn', data.secondSubheadingTitleEn || '');
      formData.append('secondSubheadingTitleRo', data.secondSubheadingTitleRo || '');
      formData.append('secondSubheadingTitleRu', data.secondSubheadingTitleRu || '');
      formData.append('secondSubheadingTextEn', data.secondSubheadingTextEn || '');
      formData.append('secondSubheadingTextRo', data.secondSubheadingTextRo || '');
      formData.append('secondSubheadingTextRu', data.secondSubheadingTextRu || '');
      
      formData.append('thirdSubheadingTitleEn', data.thirdSubheadingTitleEn || '');
      formData.append('thirdSubheadingTitleRo', data.thirdSubheadingTitleRo || '');
      formData.append('thirdSubheadingTitleRu', data.thirdSubheadingTitleRu || '');
      formData.append('thirdSubheadingTextEn', data.thirdSubheadingTextEn || '');
      formData.append('thirdSubheadingTextRo', data.thirdSubheadingTextRo || '');
      formData.append('thirdSubheadingTextRu', data.thirdSubheadingTextRu || '');
      
      formData.append('conclusionEn', data.conclusionEn || '');
      formData.append('conclusionRo', data.conclusionRo || '');
      formData.append('conclusionRu', data.conclusionRu || '');
      
      formData.append('metaDescriptionEn', data.metaDescriptionEn || '');
      formData.append('metaDescriptionRo', data.metaDescriptionRo || '');
      formData.append('metaDescriptionRu', data.metaDescriptionRu || '');
      
      formData.append('metaKeywordsEn', data.metaKeywordsEn || '');
      formData.append('metaKeywordsRo', data.metaKeywordsRo || '');
      formData.append('metaKeywordsRu', data.metaKeywordsRu || '');
      
      formData.append('titleImageAltTextEn', data.titleImageAltTextEn || '');
      formData.append('titleImageAltTextRo', data.titleImageAltTextRo || '');
      formData.append('titleImageAltTextRu', data.titleImageAltTextRu || '');
      
      formData.append('label', data.label || '');
      formData.append('publishingDate', data.publishingDate || new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: '2-digit' }));
      
      const response = await axiosInstance.post('/api/blog-posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      console.log('response:', response);
      setErrorMessage('');
    } catch (error) {
      console.error('Error:', error);
      const errorMsg = error.response?.data?.error || error.response?.data?.message || 'Something went wrong!';
      setErrorMessage(errorMsg);
    } finally {
      setIsLoading(false);
      handleNext();
      setData({});
    }
  };

  return (
    <MainCard title="Add blog page">
      <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
        {steps.map((label, index) => {
          const labelProps = {};

          if (index === errorIndex) {
            labelProps.optional = (
              <Typography variant="caption" color="error">
                Error
              </Typography>
            );

            labelProps.error = true;
          }

          return (
            <Step key={label}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <>
        {activeStep === steps.length ? (
          <>
            {!errorMessage ? (
              <>
                <Typography variant="h5" gutterBottom>
                  You successfully added a new page!
                </Typography>
              </>
            ) : (
              <Typography variant="h6" color="error" gutterBottom>
                {errorMessage}
              </Typography>
            )}
            <Stack direction="row" justifyContent="flex-end">
              <AnimateButton>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    setData({});
                    setActiveStep(0);
                  }}
                  sx={{ my: 3, ml: 1 }}
                >
                  Back to wizard
                </Button>
              </AnimateButton>
            </Stack>
          </>
        ) : (
          <>
            {getStepContent(activeStep, handleNext, handleBack, setErrorIndex, data, setData)}
            {activeStep === steps.length - 1 && (
              <Stack direction="row" justifyContent={activeStep !== 0 ? 'space-between' : 'flex-end'}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
                <AnimateButton>
                  <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{ my: 3, ml: 1 }}
                    disabled={isLoading} // Button remains clickable
                  >
                    {isLoading ? (
                      <>
                        <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} /> {/* Spinner added here */}
                        Loading...
                      </>
                    ) : activeStep === steps.length - 1 ? (
                      'Submit'
                    ) : (
                      'Next'
                    )}
                  </Button>
                </AnimateButton>
              </Stack>
            )}
          </>
        )}
      </>
    </MainCard>
  );
}
