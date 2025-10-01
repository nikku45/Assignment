import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Pagination, Stack, Button } from '@mui/material';
import { Visibility, Edit, Delete, Download } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchUsers, deleteUser, exportCSV } from '../services/userService';
import Notification from '../components/Notification';

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState('');
  const [notif, setNotif] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  const load = async (p = page, s = search) => {
    try {
      const res = await fetchUsers({ page: p, limit, search: s });
      setUsers(res.data.data);
      setTotalPages(res.data.totalPages);
      setPage(res.data.page);
    } catch (err) {
      console.error(err);
      setNotif({ open: true, message: 'Error loading users', severity: 'error' });
    }
  };

  useEffect(() => { load(1, '') }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete user?')) return;
    try {
      await deleteUser(id);
      setNotif({ open: true, message: 'Deleted', severity: 'success' });
      load(1, search);
    } catch (err) {
      console.error(err);
      setNotif({ open: true, message: 'Delete failed', severity: 'error' });
    }
  };

  const handleExport = () => {
    const url = exportCSV({ search });
    window.open(url, '_blank');
  };

  return (
    <Box>
      <Stack direction="row" spacing={2} mb={2}>
        <TextField
          label="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') load(1, search) }}
        />
        <Button variant="contained" onClick={() => load(1, search)}>Search</Button>
        <Button variant="outlined" startIcon={<Download/>} onClick={handleExport}>Export CSV</Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>Created</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {users.map(u => (
              <TableRow key={u._id}>
                <TableCell>{u.firstName} {u.lastName}</TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>{u.phone}</TableCell>
                <TableCell>{u.role}</TableCell>
                <TableCell>{u.createdAt ? new Date(u.createdAt).toLocaleDateString() : ''}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => navigate(`/users/view/${u._id}`)}><Visibility/></IconButton>
                  <IconButton onClick={() => navigate(`/users/edit/${u._id}`)}><Edit/></IconButton>
                  <IconButton onClick={() => handleDelete(u._id)}><Delete/></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack mt={2} spacing={2} alignItems="center">
        <Pagination count={totalPages} page={page} onChange={(e, p) => { load(p, search) }} />
      </Stack>

      <Notification open={notif.open} onClose={() => setNotif(s => ({ ...s, open: false }))} message={notif.message} severity={notif.severity} />
    </Box>
  );
}
