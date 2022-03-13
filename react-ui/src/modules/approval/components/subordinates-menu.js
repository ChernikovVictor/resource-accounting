import React, { useEffect, useState } from 'react';
import { AuditOutlined, BankOutlined, TeamOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

const { SubMenu } = Menu;

export default function SubordinatesMenu({ managerId, setEmployeeId }) {
    const [subordinates, setSubordinates] = useState([]);
    useEffect(() => {
        if (managerId) {
            const uri = `http://localhost:8080/employees/subordinates?managerId=${managerId}`;
            fetch(uri)
                .then((response) => response.json())
                .then(setSubordinates)
                .catch(() => alert('Error!'));
        }
    }, [managerId]);

    const bothSubordinates = subordinates.filter((employee) => employee.dependence === 'BOTH');
    const linearSubordinates = subordinates.filter((employee) => employee.dependence === 'LINEAR');
    const projectSubordinates = subordinates.filter((employee) => employee.dependence === 'PROJECT');

    return (
        <Menu onClick={(e) => setEmployeeId(e.key)} theme="dark" mode="inline">
            <SubMenu key="bothSubordinates" icon={<BankOutlined />} title="Both linear and project subordinates">
                {bothSubordinates.map((employee) => (
                    <Menu.Item key={employee.id}>{employee.fullname}</Menu.Item>
                ))}
            </SubMenu>
            <SubMenu key="linearSubordinates" icon={<AuditOutlined />} title="Linear subordinates">
                {linearSubordinates.map((employee) => (
                    <Menu.Item key={employee.id}>{employee.fullname}</Menu.Item>
                ))}
            </SubMenu>
            <SubMenu key="projectSubordinates" icon={<TeamOutlined />} title="Project subordinates">
                {projectSubordinates.map((employee) => (
                    <Menu.Item key={employee.id}>{employee.fullname}</Menu.Item>
                ))}
            </SubMenu>
        </Menu>
    );
}