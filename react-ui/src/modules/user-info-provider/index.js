import React, { createContext, useState, useContext } from 'react';

const UserInfoContext = createContext();
export const useUserInfo = () => useContext(UserInfoContext);

export default function UserInfoProvider({ children }) {
    const [userId, setUserId] = useState(null);
    const [userName, setUserName] = useState('');
    const [userRole, setUserRole] = useState(null);

    const setUserInfo = (id, name, role) => {
        setUserId(id);
        setUserName(name);
        setUserRole(role);
    };

    const resetUserInfo = () => {
        setUserId(null);
        setUserName('');
        setUserRole(null);
    };

    return (
        <UserInfoContext.Provider value={{ userId, userName, userRole, setUserInfo, resetUserInfo }}>
            {children}
        </UserInfoContext.Provider>
    );
}