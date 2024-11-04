'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LanguageContextType {
    language: string;
    changeLanguage: (lang: string) => void;
}

const defaultContext: LanguageContextType = {
    language: 'es',
    changeLanguage: () => { }, // Función vacía como valor por defecto
};

const LanguageContext = createContext<LanguageContextType>(defaultContext);

interface LanguajeProviderProps {
    children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguajeProviderProps) => {
    const [language, setLanguage] = useState<string>('es');

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
            setLanguage(savedLanguage);
        }
    }, []);

    const changeLanguage = (lang: string) => {
        setLanguage(lang);
        localStorage.setItem('language', lang);
    };

    return (
        <LanguageContext.Provider value={{ language, changeLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
