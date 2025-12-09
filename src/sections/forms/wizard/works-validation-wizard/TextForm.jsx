import PropTypes from 'prop-types';
// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// third-party
import { FieldArray, FormikProvider, useFormik } from 'formik';
import * as yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { Box } from '@mui/material';

const validationSchema = yup.object({
  id: yup.string().required('Page ID is required'),
  title: yup.string().required('Title of page is required'),
  titleParagraph: yup.string().required('Title paragraph is required'),
  visitWebsiteLink: yup.string().required('Visit website link is required'),
  callToActionTitle: yup.string().required('Call to action title is required'),
  callToActionParagraph: yup.string().required('Call to action paragraph is required'),
  reviewText: yup.string().required('Review text is required'),
  reviewAuthor: yup.string().required('Review author name is required'),
  reviewAuthorPosition: yup.string().required('Review author position is required'),
  metaDescription: yup.string().required('Meta description is required'),
  metaKeywords: yup.string().required('Meta keywords is required'),
  workTags: yup
    .array()
    .of(
      yup.string().required('Project text is required') // Validate each item in the array
    )
    .min(1, 'At least one project text is required') // Ensure at least one project exists
});

// ==============================|| VALIDATION WIZARD - TEXT  ||============================== //

export default function TextForm({ data, setData, handleNext, setErrorIndex }) {
  const formik = useFormik({
    initialValues: {
      id: data.id ?? '',
      title: data.title ?? '',
      titleParagraph: data.titleParagraph ?? '',
      visitWebsiteLink: data.visitWebsiteLink ?? '',
      callToActionTitle: data.callToActionTitle ?? '',
      callToActionParagraph: data.callToActionParagraph ?? '',
      reviewText: data.review && data.review.text ? data.review.text : '',
      reviewAuthor: data.review && data.review.author ? data.review.author : '',
      reviewAuthorPosition: data.review && data.review.position ? data.review.position : '',
      metaDescription: data.metaDescription ?? '',
      metaKeywords: data.metaKeywords ?? '',
      workTags: data.workTags || ['']
    },
    validationSchema,
    onSubmit: (values) => {
      setData({
        ...data,
        id: values.id,
        baseUrl: 'works',
        title: values.title,
        titleParagraph: values.titleParagraph,
        visitWebsiteLink: values.visitWebsiteLink,
        callToActionTitle: values.callToActionTitle,
        callToActionParagraph: values.callToActionParagraph,
        metaDescription: values.metaDescription,
        metaKeywords: values.metaKeywords,
        review: {
          text: values.reviewText,
          author: values.reviewAuthor,
          position: values.reviewAuthorPosition,
          imageSrc: values.review
        },
        workTags: values.workTags
      });
      handleNext();
    }
  });

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
        Text Information on page
      </Typography>
      <form onSubmit={formik.handleSubmit} id="validation-forms">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Page ID</InputLabel>
              <TextField
                id="id"
                name="id"
                placeholder="Page ID *"
                multiline
                value={formik.values.id}
                onChange={formik.handleChange}
                error={formik.touched.id && Boolean(formik.errors.id)}
                helperText={formik.touched.id && formik.errors.id}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Meta description</InputLabel>
              <TextField
                id="metaDescription"
                name="metaDescription"
                placeholder="Meta description *"
                multiline
                value={formik.values.metaDescription}
                onChange={formik.handleChange}
                error={formik.touched.metaDescription && Boolean(formik.errors.metaDescription)}
                helperText={formik.touched.metaDescription && formik.errors.metaDescription}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Meta keywords</InputLabel>
              <TextField
                id="metaKeywords"
                name="metaKeywords"
                placeholder="Meta keywords *"
                multiline
                value={formik.values.metaKeywords}
                onChange={formik.handleChange}
                error={formik.touched.metaKeywords && Boolean(formik.errors.metaKeywords)}
                helperText={formik.touched.metaKeywords && formik.errors.metaKeywords}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Title of page</InputLabel>
              <TextField
                id="title"
                name="title"
                placeholder="Title of page *"
                multiline
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Title paragraph</InputLabel>
              <TextField
                id="titleParagraph"
                name="titleParagraph"
                multiline
                placeholder="Title paragraph *"
                value={formik.values.titleParagraph}
                onChange={formik.handleChange}
                error={formik.touched.titleParagraph && Boolean(formik.errors.titleParagraph)}
                helperText={formik.touched.titleParagraph && formik.errors.titleParagraph}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Visit website link</InputLabel>
              <TextField
                id="visitWebsiteLink"
                name="visitWebsiteLink"
                multiline
                placeholder="Visit website link *"
                value={formik.values.visitWebsiteLink}
                onChange={formik.handleChange}
                error={formik.touched.visitWebsiteLink && Boolean(formik.errors.visitWebsiteLink)}
                helperText={formik.touched.visitWebsiteLink && formik.errors.visitWebsiteLink}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Call to action title</InputLabel>
              <TextField
                id="callToActionTitle"
                name="callToActionTitle"
                multiline
                placeholder="Call to action title *"
                value={formik.values.callToActionTitle}
                onChange={formik.handleChange}
                error={formik.touched.callToActionTitle && Boolean(formik.errors.callToActionTitle)}
                helperText={formik.touched.callToActionTitle && formik.errors.callToActionTitle}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Call to action paragraph</InputLabel>
              <TextField
                id="callToActionParagraph"
                name="callToActionParagraph"
                multiline
                placeholder="Call to action paragraph *"
                value={formik.values.callToActionParagraph}
                onChange={formik.handleChange}
                error={formik.touched.callToActionParagraph && Boolean(formik.errors.callToActionParagraph)}
                helperText={formik.touched.callToActionParagraph && formik.errors.callToActionParagraph}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Review text</InputLabel>
              <TextField
                id="reviewText"
                name="reviewText"
                placeholder="Review text *"
                multiline
                value={formik.values.reviewText}
                onChange={formik.handleChange}
                error={formik.touched.reviewText && Boolean(formik.errors.reviewText)}
                helperText={formik.touched.reviewText && formik.errors.reviewText}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Review author name</InputLabel>
              <TextField
                id="reviewAuthor"
                name="reviewAuthor"
                placeholder="Review author name*"
                multiline
                value={formik.values.reviewAuthor}
                onChange={formik.handleChange}
                error={formik.touched.reviewAuthor && Boolean(formik.errors.reviewAuthor)}
                helperText={formik.touched.reviewAuthor && formik.errors.reviewAuthor}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack spacing={1}>
              <InputLabel>Review author position</InputLabel>
              <TextField
                id="reviewAuthorPosition"
                name="reviewAuthorPosition"
                placeholder="Review author position *"
                multiline
                value={formik.values.reviewAuthorPosition}
                onChange={formik.handleChange}
                error={formik.touched.reviewAuthorPosition && Boolean(formik.errors.reviewAuthorPosition)}
                helperText={formik.touched.reviewAuthorPosition && formik.errors.reviewAuthorPosition}
                fullWidth
                autoComplete="off"
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ mb: 1 }}>
            <InputLabel>Work tags</InputLabel>
          </Grid>
          <FormikProvider value={formik}>
            <Box sx={{ ml: 3, mt: 0, width: '100%' }} fullWidth>
              <FieldArray
                name="workTags"
                render={(arrayHelpers) => (
                  <>
                    {formik.values.workTags.map((project, index) => (
                      <Grid container spacing={2} key={index} alignItems="center" sx={{ mb: 2 }}>
                        <Grid item xs={9.6} md={6}>
                          <TextField
                            id={`workTags[${index}]`}
                            name={`workTags[${index}]`}
                            placeholder="Text"
                            value={formik.values.workTags[index]}
                            onChange={formik.handleChange}
                            error={formik.touched.workTags?.[index] && Boolean(formik.errors.workTags?.[index])}
                            helperText={formik.touched.workTags?.[index] && formik.errors.workTags?.[index]}
                            fullWidth
                            sx={{ mb: 1 }}
                          />
                        </Grid>

                        <Grid
                          item
                          xs={2.4}
                          sx={{ mb: () => (formik.errors.workTags?.[index] ? 4 : 1) }}
                          md={2.4}
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                        >
                          <Button
                            type="button"
                            disabled={formik.values.workTags.length === 1}
                            onClick={() => arrayHelpers.remove(index)}
                            variant="outlined"
                            color="error"
                            sx={{
                              ml: 1,
                              alignSelf: 'center',
                              backgroundColor: (theme) =>
                                formik.values.workTags.length === 1 ? theme.palette.action.disabled : 'transparent',
                              color: (theme) => (formik.values.workTags.length === 1 ? theme.palette.disabled : theme.palette.error.main),
                              '&:hover': {
                                backgroundColor: (theme) =>
                                  formik.values.workTags.length === 1 ? theme.palette.action.disabled : theme.palette.error.main,
                                color: (theme) => (formik.values.workTags.length === 1 ? theme.palette.disabled : 'white')
                              },
                              transition: 'background-color 0.3s, color 0.3s'
                            }}
                          >
                            Remove
                          </Button>
                        </Grid>
                      </Grid>
                    ))}
                    <Button type="button" onClick={() => arrayHelpers.push('')} variant="outlined" sx={{ mt: 2 }}>
                      Add tag
                    </Button>
                  </>
                )}
              />
            </Box>
          </FormikProvider>

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
