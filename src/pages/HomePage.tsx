import { useEffect, useState } from 'react';
import ReservationService from '../services/reservation.service';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { type MedicalService, type Doctor } from '../types';

// Używamy TYLKO standardowych komponentów
import { 
  AppBar, Toolbar, Typography, Button, Container, 
  Card, CardContent, CardActions, Chip, Avatar, Box, CircularProgress, Alert 
} from '@mui/material';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const HomePage = () => {
  const [services, setServices] = useState<MedicalService[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [servicesRes, doctorsRes] = await Promise.all([
            ReservationService.getAllServices(),
            ReservationService.getAllDoctors()
        ]);
        setServices(servicesRes.data);
        setDoctors(doctorsRes.data);
      } catch (err) {
        console.error("Błąd", err);
        setError("Nie udało się połączyć z serwerem.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ flexGrow: 1, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      
      {/* NAVBAR */}
      <AppBar position="static">
        <Toolbar>
          <MedicalServicesIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            MediCenter
          </Typography>
          
          {user ? (
            <Box display="flex" alignItems="center">
                <Typography variant="body2" sx={{ mr: 2, display: { xs: 'none', sm: 'block' } }}>
                    {user.email}
                </Typography>
                <Button color="inherit" onClick={handleLogout} startIcon={<LogoutIcon />}>
                    Wyloguj
                </Button>
            </Box>
          ) : (
            <Button color="inherit" variant="outlined" onClick={() => navigate('/login')}>
                Zaloguj się
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        
        {/* HERO SECTION */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h1" gutterBottom color="primary.main">
                Zadbaj o swoje zdrowie
            </Typography>
            <Typography variant="h6" color="text.secondary">
                Kompleksowa opieka medyczna online.
            </Typography>
        </Box>

        {loading && (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {!loading && !error && (
          <>
            {/* --- SEKCJA USŁUG (Zastąpiliśmy Grid zwykłym Flexboxem) --- */}
            <Typography variant="h4" gutterBottom sx={{ borderLeft: '6px solid #1976d2', pl: 2, mb: 3 }}>
                Nasze Usługi
            </Typography>
            
            <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 3, // Odstęp między kafelkami
                justifyContent: 'center' // Wyśrodkowanie
            }}>
                {services.map((service) => (
                    <Box key={service.id} sx={{ width: { xs: '100%', sm: '45%', md: '30%' } }}> 
                        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', transition: '0.3s', '&:hover': { transform: 'scale(1.02)' } }}>
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography gutterBottom variant="h5" component="div">
                                    {service.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                                    Czas trwania: {service.durationMinutes} min
                                </Typography>
                                <Typography variant="h6" color="primary">
                                    {service.price} PLN
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ p: 2 }}>
                                <Button 
                                    fullWidth 
                                    variant="contained" 
                                    color={service.isActive ? "success" : "inherit"}
                                    disabled={!service.isActive}
                                    onClick={() => user ? alert("Idź do rezerwacji " + service.id) : navigate('/login')}
                                >
                                    {service.isActive ? 'Umów wizytę' : 'Niedostępne'}
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                ))}
            </Box>

            {/* --- SEKCJA LEKARZY --- */}
            <Typography variant="h4" gutterBottom sx={{ borderLeft: '6px solid #009688', pl: 2, mb: 3, mt: 6 }}>
                Nasi Specjaliści
            </Typography>

            <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 3,
                justifyContent: 'center'
            }}>
                {doctors.map((doc) => (
                    <Box key={doc.id} sx={{ width: { xs: '100%', sm: '45%', md: '22%' } }}>
                        <Card sx={{ textAlign: 'center', p: 2 }}>
                            <Avatar 
                                sx={{ width: 80, height: 80, margin: '0 auto', mb: 2, bgcolor: 'primary.light' }}
                            >
                                <PersonIcon fontSize="large" />
                            </Avatar>
                            <CardContent>
                                <Typography variant="h6">
                                    {doc.firstName} {doc.lastName}
                                </Typography>
                                <Chip 
                                    label={doc.specialization || "Lekarz Ogólny"} 
                                    color="info" 
                                    variant="outlined" 
                                    size="small" 
                                    sx={{ mt: 1 }}
                                />
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
};

export default HomePage;