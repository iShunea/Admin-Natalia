import PropTypes from 'prop-types';
import { useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

const MultiLanguageTabs = ({ value, onChange, languages = ['EN', 'RO', 'RU'] }) => {
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
      <Tabs value={value} onChange={onChange} aria-label="language tabs">
        {languages.map((lang) => (
          <Tab 
            key={lang} 
            label={lang} 
            value={lang.toLowerCase()}
            sx={{ 
              fontWeight: 600,
              minWidth: 80
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

MultiLanguageTabs.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string)
};

export default MultiLanguageTabs;
