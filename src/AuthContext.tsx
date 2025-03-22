import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  username: string;
  password: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthContext.Provider value={{ username, password, setUsername, setPassword }}>
      {children}
    </AuthContext.Provider>
  );
};
