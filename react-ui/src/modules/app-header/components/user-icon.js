import React from 'react';
import { useUserInfo } from '../../user-info-provider';
import { useNavigate } from 'react-router';

export default function UserIcon() {
    const { userName, resetUserInfo } = useUserInfo();
    const navigate = useNavigate();
    const logOut = () => {
        resetUserInfo();
        navigate('/');
    };

    const userNickname = userName.split(' ')
        .reduce((nickname, word) => {
            return nickname + word.substring(0, 2).toLowerCase();
        }, '');

    return <button onClick={logOut}>{userNickname}</button>;
}