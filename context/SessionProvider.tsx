'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getUserData } from '@/lib/getUserData';
import { I_UserData } from '@/app/(auth)/models/User';

interface UserContextType {
  userData: I_UserData | null;
  updateUserData: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
  initialUserData?: I_UserData | null; // Aceptar `null` si no hay datos iniciales
}

export const UserProvider = ({ children, initialUserData = null }: UserProviderProps) => {
  const [userData, setUserData] = useState<I_UserData | null>(initialUserData);

  const updateUserData = async () => {
    const data = await getUserData();
    setUserData(data);
  };

  useEffect(() => {
    if (!initialUserData) {
      updateUserData();
    }
  }, [initialUserData]);

  return (
    <UserContext.Provider value={{ userData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};