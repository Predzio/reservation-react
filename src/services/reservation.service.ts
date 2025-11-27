import api from './api';
import type { MedicalService, Doctor } from '../types';

const getAllServices = () => {
  return api.get<MedicalService[]>('/services'); 
};

const getAllDoctors = () => {
  return api.get<Doctor[]>('/users/doctors'); 
};

const getDoctorAvailability = (doctorId: number) => {
  return api.get(`/availabilities/doctor/${doctorId}`);
};

interface CreateBookingRequest {
    doctorId: number;
    serviceId: number;
    startTime: string; 
}

const createBooking = (bookingData: CreateBookingRequest) => {
  return api.post('/bookings', bookingData);
};

const getMyBookings = () => {
  return api.get('/bookings/my'); 
};

export default {
  getAllServices,
  getAllDoctors,
  getDoctorAvailability,
  createBooking,
  getMyBookings
};