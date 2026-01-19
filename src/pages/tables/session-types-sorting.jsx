import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Stack,
  Button,
  Typography
} from '@mui/material';
import { Edit, Trash, Add } from 'iconsax-react';
import { useNavigate } from 'react-router-dom';
import MainCard from 'components/MainCard';
import axios from 'utils/axios';
import AnimateButton from 'components/@extended/AnimateButton';

const iconTypeMap = {
  building: 'Building 🏢',
  video: 'Video 📹',
  message: 'Message 💬'
};

export default function SessionTypesList() {
  const navigate = useNavigate();
  const [sessionTypes, setSessionTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSessionTypes();
  }, []);

  const fetchSessionTypes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/session-types/all');
      setSessionTypes(response.data);
    } catch (error) {
      console.error('Error fetching session types:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this session type?')) {
      try {
        await axios.delete(`/api/session-types/${id}`);
        fetchSessionTypes();
      } catch (error) {
        console.error('Error deleting session type:', error);
        alert('Error deleting session type');
      }
    }
  };

  const handleEdit = (id) => {
    navigate(`/forms/edit/session-type/${id}`);
  };

  return (
    <MainCard
      title="Session Types"
      secondary={
        <AnimateButton>
          <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => navigate('/forms/session-types')}
          >
            Add Session Type
          </Button>
        </AnimateButton>
      }
    >
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Icon</TableCell>
              <TableCell>Title (EN)</TableCell>
              <TableCell>Location (EN)</TableCell>
              <TableCell>Duration</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Display Order</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : sessionTypes.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  <Typography variant="body1">No session types found</Typography>
                  <Button
                    variant="outlined"
                    startIcon={<Add />}
                    onClick={() => navigate('/forms/session-types')}
                    sx={{ mt: 2 }}
                  >
                    Add First Session Type
                  </Button>
                </TableCell>
              </TableRow>
            ) : (
              sessionTypes.map((sessionType) => (
                <TableRow key={sessionType.id}>
                  <TableCell>{sessionType.id}</TableCell>
                  <TableCell>{iconTypeMap[sessionType.iconType]}</TableCell>
                  <TableCell>{sessionType.titleEn}</TableCell>
                  <TableCell>{sessionType.locationEn}</TableCell>
                  <TableCell>{sessionType.duration}</TableCell>
                  <TableCell>
                    <Chip
                      label={sessionType.isActive ? 'Active' : 'Inactive'}
                      color={sessionType.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{sessionType.displayOrder}</TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={0.5} justifyContent="flex-end">
                      <IconButton
                        color="primary"
                        size="small"
                        onClick={() => handleEdit(sessionType.id)}
                      >
                        <Edit size="18" />
                      </IconButton>
                      <IconButton
                        color="error"
                        size="small"
                        onClick={() => handleDelete(sessionType.id)}
                      >
                        <Trash size="18" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}
