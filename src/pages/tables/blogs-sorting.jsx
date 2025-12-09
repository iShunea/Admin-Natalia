import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

import useMediaQuery from '@mui/material/useMediaQuery';
// import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import Box from '@mui/material/Box';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

// third-party
import { getCoreRowModel, getSortedRowModel, flexRender, useReactTable } from '@tanstack/react-table';
import { Edit2, Trash } from 'iconsax-react';

// project import
// import makeData from 'data/react-table';
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
// import LinearWithLabel from 'components/@extended/progress/LinearWithLabel';
import { HeaderSort, SelectColumnSorting } from 'components/third-party/react-table';
import axiosInstance from 'api/axios-instance';
import { useNavigate } from 'react-router-dom';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, onDelete }) {
  const navigate = useNavigate();
  const matchDownSM = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [sorting, setSorting] = useState([{ id: 'id', desc: false }]);
  const [deleteDialog, setDeleteDialog] = useState({ open: false, id: null, title: '' });

  const handleEdit = (id, event) => {
    event.stopPropagation();
    navigate(`/forms/edit/blog/${id}`);
  };

  const handleDeleteClick = (id, title, event) => {
    event.stopPropagation();
    setDeleteDialog({ open: true, id, title });
  };

  const handleDeleteConfirm = async () => {
    if (deleteDialog.id) {
      await onDelete(deleteDialog.id);
      setDeleteDialog({ open: false, id: null, title: '' });
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialog({ open: false, id: null, title: '' });
  };

  // Add Actions column to the columns array
  const columnsWithActions = useMemo(
    () => [
      ...columns,
      {
        header: 'Actions',
        id: 'actions',
        cell: ({ row }) => (
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Edit">
              <IconButton
                color="primary"
                size="small"
                onClick={(e) => handleEdit(row.original.id, e)}
              >
                <Edit2 size={18} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
              <IconButton
                color="error"
                size="small"
                onClick={(e) => handleDeleteClick(row.original.id, row.original.blogTitleEn || row.original.blogTitle, e)}
              >
                <Trash size={18} />
              </IconButton>
            </Tooltip>
          </Stack>
        ),
        meta: {
          align: 'center'
        }
      }
    ],
    [columns]
  );

  const table = useReactTable({
    data,
    columns: columnsWithActions,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel()
  });

  let headers = [];
  table.getAllColumns().map((columns) =>
    headers.push({
      label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
      // @ts-ignore
      key: columns.columnDef.accessorKey
    })
  );

  return (
    <MainCard
      title={matchDownSM ? 'Blog' : 'Blog Table'}
      content={false}
      secondary={
        <Stack direction="row" alignItems="center" spacing={{ xs: 1, sm: 2 }}>
          <SelectColumnSorting {...{ getState: table.getState, getAllColumns: table.getAllColumns, setSorting }} />
          {/* <CSVExport {...{ data: table.getSortedRowModel().rows.map((d) => d.original), headers, filename: 'sorting.csv' }} /> */}
        </Stack>
      }
    >
      <ScrollX>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    if (header.column.columnDef.meta !== undefined && header.column.getCanSort()) {
                      Object.assign(header.column.columnDef.meta, {
                        className: header.column.columnDef.meta.className + ' cursor-pointer prevent-select'
                      });
                    }

                    return (
                      <TableCell
                        key={header.id}
                        {...header.column.columnDef.meta}
                        onClick={header.column.getToggleSortingHandler()}
                        {...(header.column.getCanSort() &&
                          header.column.columnDef.meta === undefined && {
                            className: 'cursor-pointer prevent-select'
                          })}
                      >
                        {header.isPlaceholder ? null : (
                          <Stack direction="row" spacing={1} alignItems="center">
                            <Box>{flexRender(header.column.columnDef.header, header.getContext())}</Box>
                            {header.column.getCanSort() && <HeaderSort column={header.column} />}
                          </Stack>
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>

      <Dialog open={deleteDialog.open} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Blog Article</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this article?
            {deleteDialog.title && (
              <>
                <br />
                <strong>"{deleteDialog.title}"</strong>
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
}

// ==============================|| REACT TABLE - SORTING ||============================== //

export default function SortingTable() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const retrieveBlogs = await axiosInstance.get('admin/blog-posts');
        setData(Array.isArray(retrieveBlogs.data) ? retrieveBlogs.data : []);
      } catch (error) {
        // Backend returns 404 when no blogs exist - treat as empty list
        if (error.response?.status === 404) {
          console.log('No blogs found (404) - showing empty table');
          setData([]);
        } else {
          console.error('Error fetching blogs:', error);
          setData([]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axiosInstance.delete(`admin/blog-posts/${id}`);
      if (response.status === 200 || response.status === 204) {
        // Remove the deleted item from the table
        setData((prevData) => prevData.filter((item) => item.id !== id));
        console.log('Blog article deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  };

  const columns = useMemo(
    () => [
      {
        header: 'Page ID',
        accessorKey: 'id'
      },
      {
        header: 'Title',
        accessorKey: 'blogTitleEn',
        cell: ({ row }) => row.original.blogTitleEn || row.original.blogTitle || '-'
      }
    ],
    []
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return <ReactTable {...{ data, columns, onDelete: handleDelete }} />;
}

SortingTable.propTypes = { getValue: PropTypes.func };

SortingTable.propTypes = { getValue: PropTypes.func };

ReactTable.propTypes = { columns: PropTypes.array, data: PropTypes.array, onDelete: PropTypes.func };
