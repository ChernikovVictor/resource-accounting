import React from 'react';
import UserIcon from './user-icon';
import logo from '../../../assets/Netcracker-logo.png';
import '../styles/app-header.css'
import HeaderTabs from './header-tabs';
import ExitIcon from './exit-icon';

export default function Header() {
    return (
        <div className="header">
            <div className="header-logo">
                <img src={logo} alt="logo" />
            </div>
            <div className="header-tabs">
                <HeaderTabs />
                <UserIcon />
                <ExitIcon />
            </div>
        </div>
    );
}