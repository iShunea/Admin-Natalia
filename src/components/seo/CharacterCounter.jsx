import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const CharacterCounter = ({ current = 0, max = 160, label = 'Characters', showProgress = true }) => {
  const percentage = (current / max) * 100;
  const isOverLimit = current > max;
  const isNearLimit = percentage >= 90 && !isOverLimit;

  const getColor = () => {
    if (isOverLimit) return 'error';
    if (isNearLimit) return 'warning';
    return 'primary';
  };

  return (
    <Box sx={{ width: '100%', mt: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            fontWeight: 600,
            color: isOverLimit ? 'error.main' : isNearLimit ? 'warning.main' : 'text.secondary'
          }}
        >
          {current} / {max}
          {isOverLimit && ` (${current - max} over limit)`}
        </Typography>
      </Box>
      
      {showProgress && (
        <LinearProgress 
          variant="determinate" 
          value={Math.min(percentage, 100)} 
          color={getColor()}
          sx={{ height: 4, borderRadius: 2 }}
        />
      )}
    </Box>
  );
};

CharacterCounter.propTypes = {
  current: PropTypes.number,
  max: PropTypes.number,
  label: PropTypes.string,
  showProgress: PropTypes.bool
};

export default CharacterCounter;
