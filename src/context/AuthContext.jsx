import React, {createContext, useState, useEffect, useContext} from 'react';
import AuthService from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const[user, setUser] = useState(null);
    const[loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        setUser(currentUser);
        setLoading(false);
    }, []);

    const login = async(email, password) => {
        try{
            await AuthService.login(email, password);
            setUser(AuthService.getCurrentUser());
            return true;
        }catch(error) {
            console.error("Error login", error);
            throw error;
        }
    }

    const logout = () => {
        AuthService.logout();
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>
            {!loading && children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => useContext(AuthContext);

