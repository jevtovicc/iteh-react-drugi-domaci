import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    isAdmin: boolean;
    setIsAdmin: (isAdmin: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        // Pročitaj iz localStorage prilikom inicijalizacije
        const token = localStorage.getItem('token');
        console.log(token)
        return token !== null;
    });

    const [isAdmin, setIsAdmin] = useState<boolean>(() => {
        // Pročitaj iz localStorage prilikom inicijalizacije
        const roles = localStorage.getItem('roles');
        console.log(roles)
        return roles && JSON.parse(roles).includes['admin']
    });

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, isAdmin, setIsAdmin }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};