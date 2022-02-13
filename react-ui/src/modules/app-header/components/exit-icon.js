import React from 'react';
import { useUserInfo } from '../../user-info-provider';
import { useNavigate } from 'react-router';
import { LogoutOutlined } from '@ant-design/icons';

export default function ExitIcon() {
    const { resetUserInfo } = useUserInfo();
    const navigate = useNavigate();
    const logOut = () => {
        resetUserInfo();
        navigate('/');
    };

    const style = {
        fontSize: '290%',
        color: '#763626',
        margin: '15px 10px 0 10px',
    };

    return <LogoutOutlined onClick={logOut} style={style} />;
}

