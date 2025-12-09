import React, { useState, useCallback, useEffect } from 'react';
import { Box, Paper, Typography, IconButton, CircularProgress, Grid, FormHelperText } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { getIn } from 'formik';

function DragDropFileUpload({ formik, name }) {
  const nameOfValue = getIn(formik.values, name);
  const [dragOver, setDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    let objectUrl;
    if (nameOfValue && typeof nameOfValue === 'object' && 'type' in nameOfValue && nameOfValue.type.startsWith('image/')) {
      objectUrl = URL.createObjectURL(nameOfValue);
      setImagePreview(objectUrl);
    } else {
      setImagePreview(null);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl); // Clean up the URL to free memory
      }
    };
  }, [nameOfValue]);

  const handleFileChange = useCallback(
    (file) => {
      setLoading(true);
      formik.setFieldValue(name, file); // Set the correct field value in Formik
      const reader = new FileReader();
      reader.onloadend = () => {
        setLoading(false);
        setImagePreview(reader.result); // Set preview for the specific field
      };
      reader.readAsDataURL(file);
    },
    [formik, name] // Name is unique for each field
  );

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragOver(false);
    const files = event.dataTransfer.files;
    if (files && files[0]) {
      handleFileChange(files[0]); // Handle the dropped file
    }
  };

  const handleChange = (event) => {
    const files = event.target.files;
    if (files && files[0]) {
      handleFileChange(files[0]); // Handle the file selection
    }
  };

  return (
    <Box>
      <Paper
        variant="outlined"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        style={{
          border: dragOver ? '2px dashed #000' : '2px dashed #aaa',
          padding: 20,
          textAlign: 'center',
          cursor: 'pointer',
          background: dragOver ? '#eee' : '#fafafa',
          position: 'relative'
        }}
      >
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id={`raised-button-file-${name}`} // Ensure unique ID for each input
          multiple
          type="file"
          onChange={handleChange}
        />
        <label htmlFor={`raised-button-file-${name}`}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <IconButton color="primary" aria-label="upload picture" component="span">
              <CloudUploadIcon style={{ fontSize: 60 }} />
            </IconButton>
            <Typography color="common.black">
              {imagePreview ? 'Change image' : 'Drag and drop files here or click to select files'}
            </Typography>
          </Box>
        </label>
        {loading && (
          <CircularProgress
            size={24}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              marginTop: '-12px',
              marginLeft: '-12px'
            }}
          />
        )}
      </Paper>

      {/* Image Preview */}
      {imagePreview && (
        <Grid container justifyContent="center" style={{ marginTop: 16 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Box component="img" src={imagePreview} alt="Image Preview" sx={{ width: '100%', height: 'auto' }} />
          </Grid>
        </Grid>
      )}

      {/* Formik Error Display */}
      {formik.touched[name] && Boolean(formik.errors[name]) && <FormHelperText error>{formik.errors[name]}</FormHelperText>}
    </Box>
  );
}

export default DragDropFileUpload;
