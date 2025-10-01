import React from 'react';
import { useForm } from 'react-hook-form';
import { TextField, Button, Grid, MenuItem } from '@mui/material';
import dayjs from 'dayjs';

export default function UserForm({ defaultValues = {}, onSubmit, submitLabel = 'Save' }) {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      gender: 'Other',
      dob: '',
      role: '',
      address: '',
      ...defaultValues
    }
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="First Name" fullWidth
            {...register('firstName', { required: 'First name required' })}
            error={!!errors.firstName}
            helperText={errors.firstName?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Last Name" fullWidth {...register('lastName')} />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Email" fullWidth
            {...register('email', { required: 'Email required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField label="Phone" fullWidth {...register('phone', { minLength: { value: 7, message: 'Too short' } })} />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField select label="Gender" fullWidth {...register('gender')}>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            label="DOB"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            {...register('dob', {
              setValueAs: v => v ? dayjs(v).toDate() : undefined
            })}
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField label="Role" fullWidth {...register('role')} />
        </Grid>

        <Grid item xs={12}>
          <TextField label="Address" fullWidth multiline rows={3} {...register('address')} />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" type="submit">{submitLabel}</Button>
        </Grid>
      </Grid>
    </form>
  );
}
