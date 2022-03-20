import React, { useEffect, useState } from 'react';
import { Button, Table, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import SubordinateEditModal from './subordinate-edit-modal';
import '../styles/subordinates.css';
import { useUserInfo } from '../../user-info-provider';

export default function Subordinates() {
    const { userId } = useUserInfo();
    const [subordinates, setSubordinates] = useState([]);
    useEffect(() => {
        retrieveLinearSubordinates(userId, setSubordinates);
    }, [userId]);

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editableEmployeeId, setEditableEmployeeId] = useState();
    const handleEmployeeEdition = () => {
        setIsEditModalVisible(false);
        retrieveLinearSubordinates(userId, setSubordinates);
    };

    const columns = createColumns(setEditableEmployeeId, setIsEditModalVisible);

    return (
        <div className="linearSubordinatesDiv">
            <Table columns={columns} dataSource={subordinates} bordered />
            {isEditModalVisible && (
                <SubordinateEditModal
                    subordinate={subordinates.find((subordinate) => subordinate.id === editableEmployeeId)}
                    onCancel={() => setIsEditModalVisible(false)}
                    handleEmployeeEdition={handleEmployeeEdition}
                />
            )}
        </div>
    );
}

const retrieveLinearSubordinates = (managerId, setSubordinates) => {
    fetch(`http://localhost:8080/employees/linear-subordinates?managerId=${managerId}&withAssignedProjects=true`)
        .then((response) => response.json())
        .then(setSubordinates)
        .catch(() => alert('Error!'));
};

const createColumns = (setEditableEmployeeId, setIsEditModalVisible) => [
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
        title: 'Position',
        dataIndex: 'position',
        key: 'position'
    },
    {
        title: 'Salary',
        dataIndex: 'salary',
        key: 'salary'
    },
    {
        title: 'Assigned projects',
        dataIndex: 'assignedProjects',
        key: 'assignedProjects',
        render: (text, record) => (
            <>
                {record.assignedProjects.map((project) => {
                    return (
                        <Tag key={project.id} color="geekblue">
                            {project.name}
                        </Tag>
                    );
                })}
            </>
        )
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
    }
];
