'use client'

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { loginUser } from '@/lib/graphql/mutation';
import { setAuthToken as setQueryAuthToken } from '@/lib/graphql/query';
import { setAuthToken as setMutationAuthToken } from '@/lib/graphql/mutation';

interface AuthContextType {
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (stored) {
            setToken(stored);
            setQueryAuthToken(stored);
            setMutationAuthToken(stored);
        }
    }, []);

    const login = async (email: string, password: string) => {
        const receivedToken = await loginUser(email, password);
        setToken(receivedToken);
        setQueryAuthToken(receivedToken);
        setMutationAuthToken(receivedToken);
        if (typeof window !== 'undefined') {
            localStorage.setItem('token', receivedToken);
        }
    };

    const logout = () => {
        setToken(null);
        setQueryAuthToken(null);
        setMutationAuthToken(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
        }
    };

    return (
        <AuthContext.Provider value={{ token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
