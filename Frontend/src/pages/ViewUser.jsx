import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserById } from '../services/userService';
import { Paper, Typography, Grid } from '@mui/material';

export default function ViewUser() {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (id) fetchUserById(id).then(res => setUser(res.data)).catch(console.error);
  }, [id]);

  if (!user) return <Typography>Loading...</Typography>;
  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" mb={2}>User Details</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}><strong>Name:</strong> {user.firstName} {user.lastName}</Grid>
        <Grid item xs={12} sm={6}><strong>Email:</strong> {user.email}</Grid>
        <Grid item xs={12} sm={6}><strong>Phone:</strong> {user.phone}</Grid>
        <Grid item xs={12} sm={6}><strong>Role:</strong> {user.role}</Grid>
        <Grid item xs={12}><strong>Address:</strong> {user.address}</Grid>
        <Grid item xs={12}><strong>DOB:</strong> {user.dob ? new Date(user.dob).toLocaleDateString() : '-'}</Grid>
      </Grid>
    </Paper>
  );
}
