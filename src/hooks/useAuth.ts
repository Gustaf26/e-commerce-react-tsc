import React, { createContext, useContext } from "react";


// type User = { uid: string, email: string, displayName: string } | null

export const AuthContext = createContext({} as React.Context<{
    Provider: React.FC, Consumer: React.FC, $$typeof: typeof AuthContext['Provider']
    | typeof AuthContext['Consumer']
}>);

export const useAuth = () => {
    return useContext(AuthContext);
};