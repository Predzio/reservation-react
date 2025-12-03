import React, { useState } from 'react';
import AuthService from '../services/auth.service';
import { useNavigate } from 'react-router-dom';
import { Alert, Avatar, Box, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({
          ...formData,
          [e.target.name]: e.target.value
      });
    };
    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        try {
            await AuthService.register(formData);
            setSuccess(true);
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch(err: any) {
            setError(err.response?.data?.message || 'Register failed. Try again.')
        }
    };

    return (
        <Container component={"main"} maxWidth ="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}
            >
                <Paper elevation={3} sx={{padding:4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                    <Avatar sx={{m: 1, bgcolor: 'success.main'}}>
                        <PersonAdd/>
                    </Avatar>
                    <Typography component={"h1"} variant="h5">
                        Register
                    </Typography>
                    {error && <Alert severity='error' sx={{width:'100%', mt:2}}>{error}</Alert>}
                    {success && <Alert severity="success" sx={{ width: '100%', mt: 2 }}>Account created! Redirection...</Alert>}
                    <Box component={"form"} onSubmit={handleSubmit} sx={{mt:3, width:'100%'}}>
                        <Grid container spacing={2}>
                            <Grid size={12}>
                                <TextField 
                                name='firstName'
                                required
                                fullWidth
                                label="Imię"
                                autoFocus
                                value={formData.firstName}
                                onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                name="lastName"
                                required
                                fullWidth
                                label="Nazwisko"
                                value={formData.lastName}
                                onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                required
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                />
                            </Grid>
                            <Grid size={12}>
                                <TextField
                                required
                                fullWidth
                                name="password"
                                label="Hasło"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                />
                            </Grid>  
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Button 
                            fullWidth 
                            variant="text" 
                            onClick={() => navigate('/login')}
                        >
                            Already have an account? Log in
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default RegisterPage;