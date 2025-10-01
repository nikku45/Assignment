import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          MERN Users
        </Typography>
        <Button color="inherit" component={RouterLink} to="/users">Users</Button>
        <Button color="inherit" component={RouterLink} to="/users/add">Add</Button>
      </Toolbar>
    </AppBar>
  );
}
