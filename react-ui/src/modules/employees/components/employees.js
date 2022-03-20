import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table } from 'antd';
import { DeleteOutlined, EditOutlined, FileProtectOutlined, PlusOutlined } from '@ant-design/icons';
import EmployeeEditModal from './employee-edit-modal';
import EmployeeCreateModal from './employee-create-modal';
import '../styles/employees.css';
import CredentialsEditModal from './credentials-edit-modal';

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    useEffect(() => {
        retrieveEmployees(setEmployees);
    }, []);

    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const handleEmployeeCreation = () => {
        setIsCreateModalVisible(false);
        retrieveEmployees(setEmployees);
    };

    const handleEmployeeDeletion = (employeeId) => {
        fetch(`http://localhost:8080/employees/employee?id=${employeeId}`, { method: 'DELETE' })
            .then((response) => {
                if (!response.ok) {
                    throw Error();
                }
                retrieveEmployees(setEmployees);
            })
            .catch(() => alert('Error'));
    };

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editableEmployeeId, setEditableEmployeeId] = useState();
    const handleEmployeeEdition = () => {
        setIsEditModalVisible(false);
        retrieveEmployees(setEmployees);
    };

    const [isCredentialsModalVisible, setIsCredentialsModalVisible] = useState(false);
    const handleCredentialsEdition = () => {
        setIsCredentialsModalVisible(false);
    };

    const columns = createColumns(
        setEditableEmployeeId,
        setIsEditModalVisible,
        handleEmployeeDeletion,
        setIsCredentialsModalVisible
    );

    return (
        <div className="employeesDiv">
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsCreateModalVisible(true)}>
                Add new employee
            </Button>
            <Table columns={columns} dataSource={employees} bordered />
            {isCreateModalVisible && (
                <EmployeeCreateModal
                    onCancel={() => setIsCreateModalVisible(false)}
                    handleEmployeeCreation={handleEmployeeCreation}
                />
            )}
            {isEditModalVisible && (
                <EmployeeEditModal
                    employee={employees.find(employee => employee.id === editableEmployeeId)}
                    onCancel={() => setIsEditModalVisible(false)}
                    handleEmployeeEdition={handleEmployeeEdition}
                />
            )}
            {isCredentialsModalVisible && (
                <CredentialsEditModal
                    employeeId={editableEmployeeId}
                    onCancel={() => setIsCredentialsModalVisible(false)}
                    handleCredentialsEdition={handleCredentialsEdition}
                />
            )}
        </div>
    );
}

const retrieveEmployees = (setEmployees) => {
    fetch('http://localhost:8080/employees/list')
        .then((data) => data.json())
        .then(setEmployees)
        .catch(() => alert('Error!'));
};

const createColumns = (
    setEditableEmployeeId,
    setIsEditModalVisible,
    handleEmployeeDeletion,
    setIsCredentialsModalVisible
) => [
    {
        title: 'Full Name',
        dataIndex: 'fullname',
        key: 'fullname'
    },
    {
        title: 'E-mail',
        dataIndex: 'email',
        key: 'email'
    },
    {
        title: 'Role',
        dataIndex: 'role',
        key: 'role'
    },
    {
        title: 'Linear Manager',
        dataIndex: 'linearManagerName',
        key: 'linearManagerName'
    },
    {
        title: 'Credentials',
        dataIndex: 'editCred',
        key: 'editCred',
        width: '100px',
        render: (text, record) => {
            const onClick = () => {
                setEditableEmployeeId(record.id);
                setIsCredentialsModalVisible(true);
            };
            return <Button shape="circle" icon={<FileProtectOutlined />} onClick={onClick} />;
        }
    },
    {
        title: 'Edit',
        dataIndex: 'edit',
        key: 'edit',
        width: '50px',
        render: (text, record) => {
            const onClick = () => {
                setEditableEmployeeId(record.id);
                setIsEditModalVisible(true);
            };
            return <Button type="primary" shape="circle" icon={<EditOutlined />} onClick={onClick} />;
        }
    },
    {
        title: 'Delete',
        dataIndex: 'delete',
        key: 'delete',
        width: '50px',
        render: (text, record) => {
            return (
                <Popconfirm title="Sure to delete?" onConfirm={() => handleEmployeeDeletion(record.id)}>
                    <Button type="danger" shape="circle" icon={<DeleteOutlined />} />
                </Popconfirm>
            );
        }
    }
];