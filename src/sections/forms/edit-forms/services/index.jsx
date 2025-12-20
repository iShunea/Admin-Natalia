import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import Button from '@mui/material/Button';
import Step from '@mui/material/Step';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

import Review from './Review';
import MainCard from 'components/MainCard';
import AnimateButton from 'components/@extended/AnimateButton';
import TextForm from './TextForm';
import ImageForm from './ImageForm';
import axiosInstance from 'api/axios-instance';

const steps = ['Service Info & SEO', 'Images', 'Review'];

const getStepContent = (step, handleNext, handleBack, setErrorIndex, data, setData) => {
  switch (step) {
    case 0:
      return <TextForm handleNext={handleNext} setErrorIndex={setErrorIndex} data={data} setData={setData} />;
    case 1:
      return <ImageForm handleNext={handleNext} handleBack={handleBack} data={data} setData={setData} />;
    case 2:
      return <Review data={data} />;
    default:
      throw new Error('Unknown step');
  }
};

function checkPreviousState(prevState) {
  if (prevState) {
    return prevState;
  }
  return {};
}

export default function EditServicePage() {
  const location = useLocation();
  const idPage = location.pathname.split('/').splice(-1).toString();
  console.log('Edit Service - Full pathname:', location.pathname);
  console.log('Edit Service - Extracted ID:', idPage);
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState({});
  const [errorIndex, setErrorIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
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

      if (data.heroImage && data.heroImage instanceof File) {
        formData.append('heroImage', data.heroImage);
      }
      if (data.firstIconPath && data.firstIconPath instanceof File) {
        formData.append('firstIconPath', data.firstIconPath);
      }
      if (data.secondIconPath && data.secondIconPath instanceof File) {
        formData.append('secondIconPath', data.secondIconPath);
      }

      formData.append('titleKey', data.titleKey || '');
      formData.append('descKey', data.titleKey || '');
      formData.append('price', data.price || '');

      formData.append('titleEn', data.titleEn || '');
      formData.append('titleRo', data.titleRo || '');
      formData.append('titleRu', data.titleRu || '');
      formData.append('descEn', data.descEn || '');
      formData.append('descRo', data.descRo || '');
      formData.append('descRu', data.descRu || '');

      formData.append('metaDescriptionEn', data.metaDescriptionEn || '');
      formData.append('metaDescriptionRo', data.metaDescriptionRo || '');
      formData.append('metaDescriptionRu', data.metaDescriptionRu || '');
      formData.append('metaKeywordsEn', data.metaKeywordsEn || '');
      formData.append('metaKeywordsRo', data.metaKeywordsRo || '');
      formData.append('metaKeywordsRu', data.metaKeywordsRu || '');

      const featuresEn = data.featuresEn ? data.featuresEn.split('\n').filter(f => f.trim()) : [];
      const featuresRo = data.featuresRo ? data.featuresRo.split('\n').filter(f => f.trim()) : [];
      const featuresRu = data.featuresRu ? data.featuresRu.split('\n').filter(f => f.trim()) : [];
      formData.append('featuresEn', JSON.stringify(featuresEn));
      formData.append('featuresRo', JSON.stringify(featuresRo));
      formData.append('featuresRu', JSON.stringify(featuresRu));

      const response = await axiosInstance.put('/api/services/' + idPage, formData, {
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
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log('Fetching service with ID:', idPage);
      console.log('Full URL will be:', '/api/services/' + idPage);
      try {
        setIsFetching(true);
        const retrieveArticles = await axiosInstance.get('/api/services/' + idPage);
        console.log('Response status:', retrieveArticles.status);
        console.log('Response data:', retrieveArticles.data);
        if (retrieveArticles.status === 200) {
          console.log('Service data from API:', retrieveArticles.data);
          setData(retrieveArticles.data);
        } else {
          console.error('Failed to retrieve service page');
        }
      } catch (error) {
        console.error('Error fetching service page:', error);
        console.error('Error response:', error.response);
      } finally {
        setIsFetching(false);
      }
    };

    if (idPage) {
      fetchData();
    }
  }, [idPage]);

  if (isFetching) {
    return (
      <MainCard title="Edit Service">
        <Stack alignItems="center" justifyContent="center" sx={{ py: 5 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading service data...</Typography>
        </Stack>
      </MainCard>
    );
  }

  return (
    <MainCard title="Edit Service">
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
              <Typography variant="h5" gutterBottom>
                Service updated successfully!
              </Typography>
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
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <CircularProgress size={20} sx={{ color: 'white', mr: 1 }} />
                        Loading...
                      </>
                    ) : (
                      'Submit'
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
