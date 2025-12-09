import React from 'react';
import PropTypes from 'prop-types';
import { useFormik, FieldArray, ErrorMessage, FormikProvider } from 'formik';
import * as yup from 'yup';
import { Box, Button, Grid, InputLabel, Stack, Typography, TextField, FormHelperText } from '@mui/material';

import AnimateButton from 'components/@extended/AnimateButton';
import DragDropFileUpload from 'components/DragDropFileUpload';

const validationSchema = yup.object({
  titleImagePath: yup
    .mixed()
    .required('Image is required')
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && value.type && value.type.startsWith('image/');
    }),
  imageLabelSrc: yup
    .mixed()
    .required('Image is required')
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && value.type && value.type.startsWith('image/');
    }),
  reviewAuthorImageSrc: yup
    .mixed()
    .required('Image is required')
    .test('fileType', 'Only image files are allowed', (value) => {
      return value && value.type && value.type.startsWith('image/');
    }),
  firstColumnProjects: yup.array().of(
    yup.object({
      imagePath: yup
        .mixed()
        .required('Image is required')
        .test('fileType', 'Only image files are allowed', (value) => {
          return value && value.type && value.type.startsWith('image/');
        }),
      title: yup.string().required('Text is required')
    })
  ),
  secondColumnProjects: yup.array().of(
    yup.object({
      imagePath: yup
        .mixed()
        .required('Image is required')
        .test('fileType', 'Only image files are allowed', (value) => {
          return value && value.type && value.type.startsWith('image/');
        }),
      title: yup.string().required('Text is required')
    })
  ),
  thirdColumnProjects: yup.array().of(
    yup.object({
      imagePath: yup
        .mixed()
        .required('Image is required')
        .test('fileType', 'Only image files are allowed', (value) => {
          return value && value.type && value.type.startsWith('image/');
        }),
      title: yup.string().required('Text is required')
    })
  ),
  fourthColumnProjects: yup
    .array()
    .of(
      yup.object({
        imagePath: yup
          .mixed()
          .required('Image is required')
          .test('fileType', 'Only image files are allowed', (value) => {
            return value && value.type && value.type.startsWith('image/');
          }),
        title: yup.string().required('Text is required')
      })
    )
    .min(1, 'At least one object is required')
});

export default function ImageForm({ data, setData, handleNext, handleBack, setErrorIndex }) {
  const formik = useFormik({
    initialValues: {
      titleImagePath: data.titleImagePath || undefined,
      imageLabelSrc: data.imageLabelSrc || undefined,
      reviewAuthorImageSrc: data.review.imagePath ?? undefined,
      firstColumnProjects: data.firstColumnProjects ?? [{ imagePath: undefined, title: '' }],
      secondColumnProjects: data.secondColumnProjects ?? [{ imagePath: undefined, title: '' }],
      thirdColumnProjects: data.thirdColumnProjects ?? [{ imagePath: undefined, title: '' }],
      fourthColumnProjects: data.fourthColumnProjects ?? [{ imagePath: undefined, title: '' }]
    },
    validationSchema,
    onSubmit: (values) => {
      setData({
        ...data,
        titleImagePath: values.titleImagePath,
        imageLabelSrc: values.imageLabelSrc,
        review: {
          ...data.review,
          imageSrc: values.reviewAuthorImageSrc
        },
        firstColumnProjects: values.firstColumnProjects,
        secondColumnProjects: values.secondColumnProjects,
        thirdColumnProjects: values.thirdColumnProjects,
        fourthColumnProjects: values.fourthColumnProjects
      });
      handleNext();
    }
  });

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Images of the page
      </Typography>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel>Title image</InputLabel>
              <DragDropFileUpload formik={formik} name="titleImagePath" />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel>Label Image</InputLabel>
              <DragDropFileUpload formik={formik} name="imageLabelSrc" />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={1}>
              <InputLabel>Review author image</InputLabel>
              <DragDropFileUpload formik={formik} name="reviewAuthorImageSrc" />
            </Stack>
          </Grid>

          <FormikProvider value={formik}>
            {/* Parent container for first column */}
            <Box sx={{ ml: 3, mt: 2 }}>
              <FieldArray
                name="firstColumnProjects"
                render={(arrayHelpers) => (
                  <>
                    {formik.values.firstColumnProjects.map((project, index) => (
                      <Grid container spacing={2} key={index} alignItems="center" justifyContent="flex-start">
                        {/* Project Image Upload */}
                        <Grid item xs={12} md={5}>
                          <Stack spacing={1}>
                            <InputLabel>Project Image for 1st column</InputLabel>
                            <DragDropFileUpload formik={formik} name={`firstColumnProjects[${index}].imagePath`} />
                            <ErrorMessage
                              name={`firstColumnProjects[${index}].imagePath`}
                              sx={{ color: 'error.main', mt: 1 }}
                              component={FormHelperText}
                            />
                          </Stack>
                        </Grid>

                        {/* Project Text Input */}
                        <Grid item xs={12} md={5}>
                          <TextField
                            id={`firstColumnProjects[${index}].title`}
                            name={`firstColumnProjects[${index}].title`}
                            placeholder="Text"
                            mul
                            value={formik.values.firstColumnProjects[index].text}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.firstColumnProjects?.[index]?.text && Boolean(formik.errors.firstColumnProjects?.[index]?.text)
                            }
                            helperText={
                              formik.touched.firstColumnProjects?.[index]?.text && formik.errors.firstColumnProjects?.[index]?.text
                            }
                            fullWidth
                          />
                        </Grid>

                        {/* Remove Button */}
                        <Grid
                          item
                          xs={12}
                          // sx={{
                          //   mb: () =>
                          //     formik.errors.firstColumnProjects &&
                          //     formik.errors.firstColumnProjects[index] &&
                          //     formik.errors.firstColumnProjects[index].text
                          //       ? 4
                          //       : 0
                          // }}
                          md={2}
                          display="flex"
                          justifyContent="center"
                        >
                          <Button
                            type="button"
                            disabled={formik.values.firstColumnProjects.length === 1}
                            onClick={() => arrayHelpers.remove(index)}
                            variant="outlined"
                            color="error"
                            sx={{
                              backgroundColor: (theme) =>
                                formik.values.firstColumnProjects.length === 1 ? theme.palette.action.disabled : 'transparent', // Default background
                              color: (theme) =>
                                formik.values.firstColumnProjects.length === 1 ? theme.palette.text.disabled : theme.palette.error.main, // Default text color
                              '&:hover': {
                                backgroundColor: (theme) =>
                                  formik.values.firstColumnProjects.length === 1 ? theme.palette.action.disabled : theme.palette.error.main, // Keep disabled color on hover
                                color: (theme) => (formik.values.firstColumnProjects.length === 1 ? theme.palette.text.disabled : 'white') // Change text color on hover if enabled
                              },
                              transition: 'background-color 0.3s, color 0.3s'
                            }}
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                    {/* Add Project Button */}
                    <Button
                      type="button"
                      onClick={() => arrayHelpers.push({ imagePath: undefined, text: '' })}
                      variant="outlined"
                      sx={{ mt: 2 }}
                    >
                      Add Project
                    </Button>
                  </>
                )}
              />
            </Box>

            {/* Parent container for second column */}
            <Box sx={{ ml: 3, mt: 2 }}>
              <FieldArray
                name="secondColumnProjects"
                render={(arrayHelpers) => (
                  <>
                    {formik.values.secondColumnProjects.map((project, index) => (
                      <Grid container spacing={2} key={index} alignItems="center" justifyContent="flex-start">
                        {/* Project Image Upload */}
                        <Grid item xs={12} md={5}>
                          <Stack spacing={1}>
                            <InputLabel>Project Image for 2nd column</InputLabel>
                            <DragDropFileUpload formik={formik} name={`secondColumnProjects[${index}].imagePath`} />
                            <ErrorMessage
                              name={`secondColumnProjects[${index}].imagePath`}
                              sx={{ color: 'error.main', mt: 1 }}
                              component={FormHelperText}
                            />
                          </Stack>
                        </Grid>

                        {/* Project Text Input */}
                        <Grid item xs={12} md={5}>
                          <TextField
                            id={`secondColumnProjects[${index}].title`}
                            name={`secondColumnProjects[${index}].title`}
                            placeholder="Text"
                            value={formik.values.secondColumnProjects[index].text}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.secondColumnProjects?.[index]?.text &&
                              Boolean(formik.errors.secondColumnProjects?.[index]?.text)
                            }
                            helperText={
                              formik.touched.secondColumnProjects?.[index]?.text && formik.errors.secondColumnProjects?.[index]?.text
                            }
                            fullWidth
                          />
                        </Grid>

                        {/* Remove Button */}
                        <Grid
                          item
                          xs={12}
                          md={2}
                          // sx={{
                          //   mb: () =>
                          //     formik.errors.secondColumnProjects &&
                          //     formik.errors.secondColumnProjects[index] &&
                          //     formik.errors.secondColumnProjects[index].text
                          //       ? 4
                          //       : 0
                          // }}
                          display="flex"
                          justifyContent="center"
                        >
                          <Button
                            type="button"
                            disabled={formik.values.secondColumnProjects.length === 1}
                            onClick={() => arrayHelpers.remove(index)}
                            variant="outlined"
                            color="error"
                            sx={{
                              backgroundColor: (theme) =>
                                formik.values.secondColumnProjects.length === 1 ? theme.palette.action.disabled : 'transparent', // Default background
                              color: (theme) =>
                                formik.values.secondColumnProjects.length === 1 ? theme.palette.text.disabled : theme.palette.error.main, // Default text color
                              '&:hover': {
                                backgroundColor: (theme) =>
                                  formik.values.secondColumnProjects.length === 1
                                    ? theme.palette.action.disabled
                                    : theme.palette.error.main, // Keep disabled color on hover
                                color: (theme) => (formik.values.secondColumnProjects.length === 1 ? theme.palette.text.disabled : 'white') // Change text color on hover if enabled
                              },
                              transition: 'background-color 0.3s, color 0.3s'
                            }}
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                    {/* Add Project Button */}
                    <Button
                      type="button"
                      onClick={() => arrayHelpers.push({ imagePath: undefined, text: '' })}
                      variant="outlined"
                      sx={{ mt: 2 }}
                    >
                      Add Project
                    </Button>
                  </>
                )}
              />
            </Box>

            {/* Parent container for third column */}
            <Box sx={{ ml: 3, mt: 2 }}>
              <FieldArray
                name="thirdColumnProjects"
                render={(arrayHelpers) => (
                  <>
                    {formik.values.thirdColumnProjects.map((project, index) => (
                      <Grid container spacing={2} key={index} alignItems="center" justifyContent="flex-start">
                        {/* Project Image Upload */}
                        <Grid item xs={12} md={5}>
                          <Stack spacing={1}>
                            <InputLabel>Project Image for 3rd column</InputLabel>
                            <DragDropFileUpload formik={formik} name={`thirdColumnProjects[${index}].imagePath`} />
                            <ErrorMessage
                              name={`thirdColumnProjects[${index}].imagePath`}
                              sx={{ color: 'error.main', mt: 1 }}
                              component={FormHelperText}
                            />
                          </Stack>
                        </Grid>

                        {/* Project Text Input */}
                        <Grid item xs={12} md={5}>
                          <TextField
                            id={`thirdColumnProjects[${index}].title`}
                            name={`thirdColumnProjects[${index}].title`}
                            placeholder="Text"
                            value={formik.values.thirdColumnProjects[index].text}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.thirdColumnProjects?.[index]?.text && Boolean(formik.errors.thirdColumnProjects?.[index]?.text)
                            }
                            helperText={
                              formik.touched.thirdColumnProjects?.[index]?.text && formik.errors.thirdColumnProjects?.[index]?.text
                            }
                            fullWidth
                          />
                        </Grid>

                        {/* Remove Button */}
                        <Grid
                          item
                          xs={12}
                          md={2}
                          // sx={{
                          //   mb: () =>
                          //     formik.errors.thirdColumnProjects &&
                          //     formik.errors.thirdColumnProjects[index] &&
                          //     formik.errors.thirdColumnProjects[index].text
                          //       ? 4
                          //       : 0
                          // }}
                          display="flex"
                          justifyContent="center"
                        >
                          <Button
                            type="button"
                            disabled={formik.values.thirdColumnProjects.length === 1}
                            onClick={() => arrayHelpers.remove(index)}
                            variant="outlined"
                            color="error"
                            sx={{
                              backgroundColor: (theme) =>
                                formik.values.thirdColumnProjects.length === 1 ? theme.palette.action.disabled : 'transparent', // Default background
                              color: (theme) =>
                                formik.values.thirdColumnProjects.length === 1 ? theme.palette.text.disabled : theme.palette.error.main, // Default text color
                              '&:hover': {
                                backgroundColor: (theme) =>
                                  formik.values.thirdColumnProjects.length === 1 ? theme.palette.action.disabled : theme.palette.error.main, // Keep disabled color on hover
                                color: (theme) => (formik.values.thirdColumnProjects.length === 1 ? theme.palette.text.disabled : 'white') // Change text color on hover if enabled
                              },
                              transition: 'background-color 0.3s, color 0.3s'
                            }}
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                    {/* Add Project Button */}
                    <Button
                      type="button"
                      onClick={() => arrayHelpers.push({ imagePath: undefined, text: '' })}
                      variant="outlined"
                      sx={{ mt: 2 }}
                    >
                      Add Project
                    </Button>
                  </>
                )}
              />
            </Box>

            {/* Parent container for fourth column */}
            <Box sx={{ ml: 3, mt: 2 }}>
              <FieldArray
                name="fourthColumnProjects"
                render={(arrayHelpers) => (
                  <>
                    {formik.values.fourthColumnProjects.map((project, index) => (
                      <Grid container spacing={2} key={index} alignItems="center" justifyContent="flex-start">
                        {/* Project Image Upload */}
                        <Grid item xs={12} md={5}>
                          <Stack spacing={1}>
                            <InputLabel>Project Image for 4th column</InputLabel>
                            <DragDropFileUpload formik={formik} name={`fourthColumnProjects[${index}].imagePath`} />
                            <ErrorMessage
                              name={`fourthColumnProjects[${index}].imagePath`}
                              sx={{ color: 'error.main', mt: 1 }}
                              component={FormHelperText}
                            />
                          </Stack>
                        </Grid>

                        {/* Project Text Input */}
                        <Grid item xs={12} md={5}>
                          <TextField
                            id={`fourthColumnProjects[${index}].title`}
                            name={`fourthColumnProjects[${index}].title`}
                            placeholder="Text"
                            value={formik.values.fourthColumnProjects[index].text}
                            onChange={formik.handleChange}
                            error={
                              formik.touched.fourthColumnProjects?.[index]?.text &&
                              Boolean(formik.errors.fourthColumnProjects?.[index]?.text)
                            }
                            helperText={
                              formik.touched.fourthColumnProjects?.[index]?.text && formik.errors.fourthColumnProjects?.[index]?.text
                            }
                            fullWidth
                          />
                        </Grid>

                        {/* Remove Button */}
                        <Grid
                          item
                          xs={12}
                          // sx={{
                          //   mb: () =>
                          //     formik.errors.fourthColumnProjects &&
                          //     formik.errors.fourthColumnProjects[index] &&
                          //     formik.errors.fourthColumnProjects[index].text
                          //       ? 4
                          //       : 0
                          // }}
                          md={2}
                          display="flex"
                          justifyContent="center"
                        >
                          <Button
                            type="button"
                            disabled={formik.values.fourthColumnProjects.length === 1}
                            onClick={() => arrayHelpers.remove(index)}
                            variant="outlined"
                            color="error"
                            sx={{
                              backgroundColor: (theme) =>
                                formik.values.fourthColumnProjects.length === 1 ? theme.palette.action.disabled : 'transparent', // Default background
                              color: (theme) =>
                                formik.values.fourthColumnProjects.length === 1 ? theme.palette.text.disabled : theme.palette.error.main, // Default text color
                              '&:hover': {
                                backgroundColor: (theme) =>
                                  formik.values.fourthColumnProjects.length === 1
                                    ? theme.palette.action.disabled
                                    : theme.palette.error.main, // Keep disabled color on hover
                                color: (theme) => (formik.values.fourthColumnProjects.length === 1 ? theme.palette.text.disabled : 'white') // Change text color on hover if enabled
                              },
                              transition: 'background-color 0.3s, color 0.3s'
                            }}
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                    {/* Add Project Button */}
                    <Button
                      type="button"
                      onClick={() => arrayHelpers.push({ imagePath: undefined, text: '' })}
                      variant="outlined"
                      sx={{ mt: 2 }}
                    >
                      Add Project
                    </Button>
                  </>
                )}
              />
            </Box>
          </FormikProvider>
        </Grid>

        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between">
            <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
              Back
            </Button>
            <AnimateButton>
              <Button variant="contained" type="submit" sx={{ my: 3, ml: 1 }} onClick={() => setErrorIndex(1)}>
                Next
              </Button>
            </AnimateButton>
          </Stack>
        </Grid>
      </form>
    </>
  );
}

ImageForm.propTypes = {
  data: PropTypes.any,
  setData: PropTypes.func,
  handleNext: PropTypes.func,
  handleBack: PropTypes.func,
  setErrorIndex: PropTypes.func
};
