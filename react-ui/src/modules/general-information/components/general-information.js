import React, { useEffect, useState } from 'react';
import { useUserInfo } from '../../user-info-provider';
import '../styles/general-information.css';
import { Divider } from 'antd';

export default function GeneralInfo() {
    const { userId } = useUserInfo();
    const [employeeInfo, setEmployeeInfo] = useState({});
    useEffect(() => {
        fetch(`http://localhost:8080/employees/employee?id=${userId}`)
            .then((response) => response.json())
            .then(setEmployeeInfo)
            .catch(() => alert('Error'));
    }, [userId]);

    const [assignedProjects, setAssignedProjects] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8080/employees/projects?employeeId=${userId}`)
            .then((response) => response.json())
            .then(setAssignedProjects)
            .catch(() => alert('Error'));
    }, [userId]);

    return (
        <div className="generalInfoDiv">
            <Divider id="mainDivider" orientation="center">
                General Information
            </Divider>
            <InformationItem title="Full Name" text={employeeInfo.fullname} />
            <InformationItem title="Position" text={employeeInfo.position} />
            <InformationItem title="E-mail" text={employeeInfo.email} />
            <InformationItem title="Salary" text={employeeInfo.salary} />
            <InformationItem
                title="Linear Manager"
                text={`${employeeInfo.linearManagerName} (${employeeInfo.linearManagerEmail})`}
            />
            <Divider orientation="left">Assigned Projects</Divider>
            <ul className="generalInfoList">
                {assignedProjects.map((project) => {
                    return (
                        <li key={project.id}>
                            {project.name}
                        </li>
                    );
                })}
            </ul>
            <Divider orientation="left">Project Managers</Divider>
            <ul className="generalInfoList">
                {assignedProjects.map((project) => {
                    return (
                        <li key={project.id}>
                            {project.projectManagerName} ({project.name}). Contacts: {project.projectManagerEmail}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

const InformationItem = ({ title, text }) => {
    const pStyle = {
        font: "20px 'Oswald', sans-serif",
        fontWeight: '300'
    };
    return (
        <>
            <Divider orientation="left">{title}</Divider>
            <p style={pStyle}>{text}</p>
        </>
    );
};