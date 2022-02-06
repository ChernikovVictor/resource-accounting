import React from 'react';
import UserIcon from './user-icon';
import Information from './information';
import { useUserInfo } from '../../user-info-provider';
import { isAdmin, isManager, isWorker } from '../../../util/role-mapper';
import { Link } from 'react-router-dom';

export default function Header() {
    const { userRole } = useUserInfo();
    return (
        <div className="header">
            <Information />
            {isAdmin(userRole) && (
                <nav>
                    <ul>
                        <li>
                            <Link to="/salaryCalculation">salary calculate</Link>
                        </li>
                        <li>
                            <Link to="/salaryRules">salary rules</Link>
                        </li>
                        <li>
                            <Link to="/projects">projects</Link>
                        </li>
                        <li>
                            <Link to="/employees">employees</Link>
                        </li>
                    </ul>
                </nav>
            )}
            {isManager(userRole) && (
                <nav>
                    <ul>
                        <li>
                            <Link to="/approving">approving</Link>
                        </li>
                        <li>
                            <Link to="/subordinates">subordinates</Link>
                        </li>
                        <li>
                            <Link to="/timesheets">timesheets</Link>
                        </li>
                        <li>
                            <Link to="/generalInfo">general information</Link>
                        </li>
                    </ul>
                </nav>
            )}
            {isWorker(userRole) && (
                <nav>
                    <ul>
                        <li>
                            <Link to="/timesheets">timesheets</Link>
                        </li>
                        <li>
                            <Link to="/generalInfo">general information</Link>
                        </li>
                    </ul>
                </nav>
            )}
            <UserIcon />
        </div>
    );
}