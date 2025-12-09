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
      
      formData.append('title', data.blogTitleEn || '');
      formData.append('titleRo', data.blogTitleRo || '');
      formData.append('titleRu', data.blogTitleRu || '');
      
      const contentEn = [
        data.blogIntroEn || '',
        data.firstSubheadingTitleEn ? `\n\n## ${data.firstSubheadingTitleEn}\n${data.firstSubheadingTextEn || ''}` : '',
        data.secondSubheadingTitleEn ? `\n\n## ${data.secondSubheadingTitleEn}\n${data.secondSubheadingTextEn || ''}` : '',
        data.thirdSubheadingTitleEn ? `\n\n## ${data.thirdSubheadingTitleEn}\n${data.thirdSubheadingTextEn || ''}` : '',
        data.conclusionEn ? `\n\n${data.conclusionEn}` : ''
      ].join('');
      
      const contentRo = [
        data.blogIntroRo || '',
        data.firstSubheadingTitleRo ? `\n\n## ${data.firstSubheadingTitleRo}\n${data.firstSubheadingTextRo || ''}` : '',
        data.secondSubheadingTitleRo ? `\n\n## ${data.secondSubheadingTitleRo}\n${data.secondSubheadingTextRo || ''}` : '',
        data.thirdSubheadingTitleRo ? `\n\n## ${data.thirdSubheadingTitleRo}\n${data.thirdSubheadingTextRo || ''}` : '',
        data.conclusionRo ? `\n\n${data.conclusionRo}` : ''
      ].join('');
      
      const contentRu = [
        data.blogIntroRu || '',
        data.firstSubheadingTitleRu ? `\n\n## ${data.firstSubheadingTitleRu}\n${data.firstSubheadingTextRu || ''}` : '',
        data.secondSubheadingTitleRu ? `\n\n## ${data.secondSubheadingTitleRu}\n${data.secondSubheadingTextRu || ''}` : '',
        data.thirdSubheadingTitleRu ? `\n\n## ${data.thirdSubheadingTitleRu}\n${data.thirdSubheadingTextRu || ''}` : '',
        data.conclusionRu ? `\n\n${data.conclusionRu}` : ''
      ].join('');
      
      formData.append('content', contentEn);
      formData.append('contentRo', contentRo);
      formData.append('contentRu', contentRu);
      
      formData.append('excerpt', data.metaDescriptionEn || '');
      formData.append('excerptRo', data.metaDescriptionRo || '');
      formData.append('excerptRu', data.metaDescriptionRu || '');
      
      formData.append('category', data.label || 'General');
      formData.append('author', 'CristAlex Dent');
      
      const slug = data.id ? data.id.replace('Blog/', '') : '';
      formData.append('slug', slug);
      
      formData.append('metaKeywords', data.metaKeywordsEn || '');
      formData.append('metaKeywordsRo', data.metaKeywordsRo || '');
      formData.append('metaKeywordsRu', data.metaKeywordsRu || '');
      
      formData.append('titleImageAltTextEn', data.titleImageAltTextEn || '');
      formData.append('titleImageAltTextRo', data.titleImageAltTextRo || '');
      formData.append('titleImageAltTextRu', data.titleImageAltTextRu || '');
      
      formData.append('publishingDate', data.publishingDate || new Date().toISOString());
      
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
