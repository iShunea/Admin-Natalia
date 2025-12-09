import { Link as RouterLink } from 'react-router-dom';

// material-ui
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';

// ==============================|| MAIN LAYOUT - FOOTER ||============================== //

export default function Footer() {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ p: '24px 16px 0px', mt: 'auto' }}>
      <Stack spacing={1.5} direction="row" justifyContent="space-between" alignItems="center">
        <Link
          component={RouterLink}
          to="https://phoenixcoded.gitbook.io/able-pro/v/react/"
          target="_blank"
          variant="caption"
          color="text.primary"
        >
          Documentation
        </Link>
      </Stack>
    </Stack>
  );
}
