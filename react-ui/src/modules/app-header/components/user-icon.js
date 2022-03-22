import React from 'react';
import { useUserInfo } from '../../user-info-provider';
import { Avatar } from 'antd';
import { isAdmin } from '../../../util/role-mapper';

export default function UserIcon() {
    const { userRole, userName } = useUserInfo();
    const userNickname = createUserNickname(userRole, userName);
    const style = {
        backgroundColor: '#34675C',
        marginTop: '15px'
    };

    return (
        <Avatar size={40} style={style}>
            {userNickname}
        </Avatar>
    );
}

const createUserNickname = (userRole, userName) => {
    if (isAdmin(userRole)) {
        return 'admin';
    }
    const userNickname = userName.split(' ').reduce((nickname, word) => {
        return nickname + word.substring(0, 2).toLowerCase();
    }, '');
    return userNickname.substring(0, 4);
};