import React, { useEffect, useState } from 'react';
import { Button, Popconfirm, Table } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import ProjectCreateModal from './project-create-modal';
import ProjectEditModal from './project-edit-modal';
import '../styles/projects.css';

export default function Projects() {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        retrieveProjects(setProjects);
    }, []);

    const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
    const handleProjectCreation = () => {
        setIsCreateModalVisible(false);
        retrieveProjects(setProjects);
    };

    const handleProjectDeletion = (projectId) => {
        fetch(`http://localhost:8080/projects/project?id=${projectId}`, { method: 'DELETE' })
            .then((response) => {
                if (!response.ok) {
                    throw Error();
                }
                retrieveProjects(setProjects);
            })
            .catch(() => alert('Error'));
    };

    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [editableProjectId, setEditableProjectId] = useState();
    const handleProjectEdition = () => {
        setIsEditModalVisible(false);
        retrieveProjects(setProjects);
    };

    const columns = createColumns(setEditableProjectId, setIsEditModalVisible, handleProjectDeletion);

    return (
        <div className="projectsDiv">
            <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsCreateModalVisible(true)}>
                Create new project
            </Button>
            <Table columns={columns} dataSource={projects} bordered />
            {isCreateModalVisible && (
                <ProjectCreateModal
                    onCancel={() => setIsCreateModalVisible(false)}
                    handleProjectCreation={handleProjectCreation}
                />
            )}
            {isEditModalVisible && (
                <ProjectEditModal
                    project={projects.find((project) => project.id === editableProjectId)}
                    onCancel={() => setIsEditModalVisible(false)}
                    handleProjectEdition={handleProjectEdition}
                />
            )}
        </div>
    );
}

const retrieveProjects = (setProjects) => {
    fetch('http://localhost:8080/projects/list')
        .then((data) => data.json())
        .then(setProjects)
        .catch(() => alert('Error!'));
};

const createColumns = (setEditableProjectId, setIsEditModalVisible, handleProjectDeletion) => [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name'
    },
    {
        title: 'Budget',
        dataIndex: 'budget',
        key: 'budget'
    },
    {
        title: 'Project Manager',
        dataIndex: 'projectManagerName',
        key: 'projectManagerName',
        width: '300px'
    },
    {
        title: 'Edit',
        dataIndex: 'edit',
        key: 'edit',
        width: '50px',
        render: (text, record) => {
            const onClick = () => {
                setEditableProjectId(record.id);
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
                <Popconfirm title="Sure to delete?" onConfirm={() => handleProjectDeletion(record.id)}>
                    <Button type="danger" shape="circle" icon={<DeleteOutlined />} />
                </Popconfirm>
            );
        }
    }
];