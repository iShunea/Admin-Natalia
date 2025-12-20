import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';

const CharacterCounter = ({ current, value, max, maxLength, label = 'Characters', showProgress = true }) => {
  // Support both prop naming conventions
  const actualCurrent = current ?? (value ? value.length : 0);
  const actualMax = maxLength ?? max ?? 160;
  const percentage = (actualCurrent / actualMax) * 100;
  const isOverLimit = actualCurrent > actualMax;
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
          {actualCurrent} / {actualMax}
          {isOverLimit && ` (${actualCurrent - actualMax} over limit)`}
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
  value: PropTypes.string,
  max: PropTypes.number,
  maxLength: PropTypes.number,
  label: PropTypes.string,
  showProgress: PropTypes.bool
};

export default CharacterCounter;
