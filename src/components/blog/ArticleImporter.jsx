import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import UploadIcon from '@mui/icons-material/Upload';

import { parseExcelBlog, parseJSONBlog, parseMarkdownBlog } from 'utils/blog-parsers';

const ArticleImporter = ({ onImport }) => {
  const fileInputRef = useRef(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setError(null);
    setSuccess(false);

    try {
      let articleData;
      const fileExtension = file.name.split('.').pop().toLowerCase();

      if (fileExtension === 'xlsx' || fileExtension === 'xls') {
        articleData = await parseExcelBlog(file);
      } else if (fileExtension === 'json') {
        articleData = await parseJSONBlog(file);
      } else if (fileExtension === 'md') {
        articleData = await parseMarkdownBlog(file);
      } else {
        throw new Error('Unsupported file format. Please use .xlsx, .json, or .md files.');
      }

      onImport(articleData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(err.message);
    }

    event.target.value = '';
  };

  return (
    <Box sx={{ mb: 3 }}>
      <input
        ref={fileInputRef}
        type="file"
        accept=".xlsx,.xls,.json,.md"
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />
      
      <Button
        variant="outlined"
        startIcon={<UploadIcon />}
        onClick={() => fileInputRef.current?.click()}
        sx={{ mb: 2 }}
      >
        Import from File
      </Button>

      {error && (
        <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" onClose={() => setSuccess(false)} sx={{ mb: 2 }}>
          Article data imported successfully! All fields have been populated.
        </Alert>
      )}

      <Typography variant="caption" color="text.secondary" display="block">
        Supported formats: Excel (.xlsx), JSON (.json), Markdown (.md)
      </Typography>
    </Box>
  );
};

ArticleImporter.propTypes = {
  onImport: PropTypes.func.isRequired
};

export default ArticleImporter;
