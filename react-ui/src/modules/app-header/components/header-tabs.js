import React from 'react';
import { useUserInfo } from '../../user-info-provider';
import { isAdmin, isManager, isWorker } from '../../../util/role-mapper';
import { NavLink } from 'react-router-dom';
import '../styles/header-tabs.css'

export default function HeaderTabs() {
    const { userRole } = useUserInfo();
    return (
        <>
            {isAdmin(userRole) && (
                <nav>
                    <ul className="header-menu">
                        <li>
                            <NavLink to="/salaryCalculation">salary calculate</NavLink>
                        </li>
                        <li>
                            <NavLink to="/salaryRules">salary rules</NavLink>
                        </li>
                        <li>
                            <NavLink to="/projects">projects</NavLink>
                        </li>
                        <li>
                            <NavLink to="/employees">employees</NavLink>
                        </li>
                    </ul>
                </nav>
            )}
            {isManager(userRole) && (
                <nav>
                    <ul className="header-menu">
                        <li>
                            <NavLink to="/approval">approval</NavLink>
                        </li>
                        <li>
                            <NavLink to="/subordinates">subordinates</NavLink>
                        </li>
                        <li>
                            <NavLink to="/timesheets">timesheets</NavLink>
                        </li>
                        <li>
                            <NavLink to="/generalInfo">general information</NavLink>
                        </li>
                    </ul>
                </nav>
            )}
            {isWorker(userRole) && (
                <nav>
                    <ul className="header-menu">
                        <li>
                            <NavLink to="/timesheets">timesheets</NavLink>
                        </li>
                        <li>
                            <NavLink to="/generalInfo">general information</NavLink>
                        </li>
                    </ul>
                </nav>
            )}
        </>
    );
}