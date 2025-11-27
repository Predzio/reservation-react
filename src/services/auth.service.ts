import api from './api';
import { jwtDecode } from "jwt-decode";

const login = async(email: string, password: string) => {
    const response = await api.post('/auth/login', {email, password});

    if(response.data.token) {
        localStorage.setItem('jwt_token', response.data.jwt);
        localStorage.setItem('user_data', JSON.stringify(response.data));
    }
    return response.data;
}

const logout = () => {
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('user_data');
    window.location.href = '/login';
}

const getCurrentUser = () => {
    const token = localStorage.getItem('jwt_token');
    if(token){
        try{
            const decoded = jwtDecode(token);
            const userDataString = localStorage.getItem('user_data');
            const userData = userDataString ? JSON.parse(userDataString) : {};

            return {...decoded, ...userData};
        } catch(e){
            return null;
        }
    }
    return null;
}

export default{
    login,
    logout,
    getCurrentUser
};