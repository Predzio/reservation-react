import api from './api';

const getAllServices = () => {
    return api.get('/services');
};

// DoctorDTO: { id, firstName, lastName, specialization }
const getAllDoctors = () => {
    return api.get('/users/doctors');
}

const getDoctorAvailability = (doctorId) => {
    return api.get('/availabilities/doctor/${doctorId}');
};

// CreateBookingRequest: { doctorId, serviceId, startTime }
const createBooking = (bookingData) => {
    return api.post('/bookings', bookingData);
};

const getMyBookings = () => {
    return api.get('/bookings/my');
};

export default{
    getAllServices,
    getAllDoctors,
    getDoctorAvailability,
    createBooking,
    getMyBookings
};