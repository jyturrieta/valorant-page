import React, { createContext } from 'react';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const AppLevelContext = createContext();
const API = 'https://valorant-api.com/v1';

export const AppLevelProvider = ({ children }) => {
    const [agents, setAgents] = useState([]);

    const fetchAgents = async () => {
        const res = await axios.get(`${API}/agents?isPlayableCharacter=true&language=es-MX`)
        setAgents(res.data.data);
    }

    return (
        <AppLevelContext.Provider
            value={{
                agents,
                fetchAgents,
                setAgents,
            }}
        >
            {children}
        </AppLevelContext.Provider>
    )    
}

export default AppLevelProvider;