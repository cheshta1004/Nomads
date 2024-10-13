import React, { createContext, useContext, useState } from 'react';

// Create a context
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
    const [username, setUsername] = useState('');

    return (
        <UserContext.Provider value={{ username, setUsername }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook for using the context
export const useUserContext = () => {
    return useContext(UserContext);
};
