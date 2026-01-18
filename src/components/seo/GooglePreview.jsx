import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

const GooglePreview = ({ title = '', description = '', url = 'https://nataliasargu.md' }) => {
  const displayTitle = title || 'Your Page Title | Natalia Sargu';
  const displayDescription = description || 'Add a meta description to see how it appears in Google search results...';
  const displayUrl = url.replace(/^https?:\/\//, '');

  return (
    <Stack spacing={1} sx={{ 
      p: 2, 
      bgcolor: 'background.paper',
      border: '1px solid',
      borderColor: 'divider',
      borderRadius: 1
    }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, mb: 1 }}>
        Google SERP Preview
      </Typography>
      
      <Box>
        <Typography 
          variant="h6" 
          sx={{ 
            color: '#1a0dab',
            fontSize: '20px',
            lineHeight: 1.3,
            mb: 0.5,
            cursor: 'pointer',
            '&:hover': { textDecoration: 'underline' }
          }}
        >
          {displayTitle}
        </Typography>
        
        <Typography 
          variant="caption" 
          sx={{ 
            color: '#006621',
            fontSize: '14px',
            display: 'block',
            mb: 0.5
          }}
        >
          {displayUrl}
        </Typography>
        
        <Typography 
          variant="body2" 
          sx={{ 
            color: '#545454',
            fontSize: '14px',
            lineHeight: 1.57
          }}
        >
          {displayDescription.length > 160 
            ? `${displayDescription.substring(0, 157)}...` 
            : displayDescription}
        </Typography>
      </Box>
    </Stack>
  );
};

GooglePreview.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string
};

export default GooglePreview;
