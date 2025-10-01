import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from '../components/UserForm';
import { fetchUserById, createUser, updateUser } from '../services/userService';
import Notification from '../components/Notification';
import { Box, Paper, Typography } from '@mui/material';

export default function AddEditUser() {
  const { id } = useParams();
  const [defaultValues, setDefaultValues] = useState(null);
  const [notif, setNotif] = useState({ open: false, message: '', severity: 'success' });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchUserById(id).then(res => setDefaultValues(res.data)).catch(err => {
        console.error(err);
        setNotif({ open: true, message: 'Failed to load user', severity: 'error' });
      });
    }
  }, [id]);

  const onSubmit = async (data) => {
    try {
      if (id) {
        await updateUser(id, data);
        setNotif({ open: true, message: 'Updated', severity: 'success' });
      } else {
        await createUser(data);
        setNotif({ open: true, message: 'Created', severity: 'success' });
      }
      setTimeout(() => navigate('/users'), 700);
    } catch (err) {
      console.error(err);
      setNotif({ open: true, message: err?.response?.data?.message || 'Save failed', severity: 'error' });
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" mb={2}>{id ? 'Edit User' : 'Add User'}</Typography>
      <Box>
        <UserForm defaultValues={defaultValues || {}} onSubmit={onSubmit} submitLabel={id ? 'Update' : 'Create'} />
      </Box>

      <Notification open={notif.open} onClose={() => setNotif(s => ({ ...s, open: false }))} message={notif.message} severity={notif.severity} />
    </Paper>
  );
}
