import React, { createContext, useState, ReactNode } from 'react';

interface AuthContextType {
  username: string;
  password: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export const AuthContext = createContext<AuthContextType | null>(null);