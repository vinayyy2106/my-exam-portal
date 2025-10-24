import { useState, createContext,useEffect } from 'react'
export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [role, setRole] = useState(null);
    const [userData, setUserdata] = useState(null);
    useEffect(() => {
        const storedUser = sessionStorage.getItem("user");
        const storedRole = sessionStorage.getItem("role");
        if (storedUser) setUserdata(JSON.parse(storedUser));
        if (storedRole) setRole(storedRole);
    }, []);
    useEffect(() => {
        if (userData) sessionStorage.setItem("user", JSON.stringify(userData));
        if (role) sessionStorage.setItem("role", role);
    }, [userData, role]);

    return (
        <UserContext.Provider value={{ userData, setUserdata,role,setRole }}>
            {children}
        </UserContext.Provider>
    )
}

