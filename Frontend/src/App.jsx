import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UsersList from './pages/UsersList';
import AddEditUser from './pages/AddEditUser';
import ViewUser from './pages/ViewUser';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';

export default function App() {
  return (
    <>
      <Navbar />
      <Container sx={{ mt: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/users/add" element={<AddEditUser />} />
          <Route path="/users/edit/:id" element={<AddEditUser />} />
          <Route path="/users/view/:id" element={<ViewUser />} />
        </Routes>
      </Container>
    </>
  );
}
