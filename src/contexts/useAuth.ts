import React, { createContext, useContext } from "react";


export interface AuthContextProps {
    Provider: React.FC,
    Consumer: React.FC,
    children: React.ReactNode,
    admin: boolean,
    currentUser: { email: string, uid: string, display_name: string },
    setAdmin: (admin: boolean) => void,
    setCurrentUser: (user: { email: string, uid: string, display_name: string }) => void,
    login: (email: string, password: string) => { email: string, uid: string, display_name: string },
    checkIfAdmin: (email: string | null) => boolean,
    updateProfileData: (email: string, password: string, display_name: string) => Promise<{ msg: string, error: string }>,
    // signup: (email: string, password: string) => Promise<{ msg: string, error: string }>
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = function () {
    return useContext(AuthContext);
};