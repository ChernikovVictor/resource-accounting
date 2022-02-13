import React from 'react';
import { useUserInfo } from '../../user-info-provider';
import { Avatar } from 'antd';

export default function UserIcon() {
    const { userName } = useUserInfo();
    const userNickname = userName.split(' ')
        .reduce((nickname, word) => {
            return nickname + word.substring(0, 2).toLowerCase();
        }, '');

    const style = {
        backgroundColor: '#34675C',
        marginTop: '15px'
    }

    return <Avatar size={40} style={style}>{userNickname}</Avatar>;
}