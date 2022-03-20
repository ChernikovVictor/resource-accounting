import React, { useEffect, useState } from 'react';
import Modal from 'antd/es/modal/Modal';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

export default function ProjectEditModal({ project, onCancel, handleProjectEdition }) {
    const [projectManagers, setProjectManagers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/employees/project-managers?onlyFree=true')
            .then((data) => data.json())
            .then(setProjectManagers)
            .catch(() => alert('Error'));
    }, []);

    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            name: project.name,
            budget: project.budget,
            projectManagerId: project.projectManagerId
        });
    }, [form, project]);

    const saveProject = async () => {
        try {
            let formValues = await form.validateFields();
            console.log('formValues:', formValues);
            let uri = 'http://localhost:8080/projects/project';
            let body = {
                ...project,
                name: formValues.name,
                budget: formValues.budget,
                projectManagerId: formValues.projectManagerId ? formValues.projectManagerId : null
            };
            const fetchSetting = {
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify(body)
            };
            fetch(uri, fetchSetting)
                .then((response) => {
                    if (!response.ok) {
                        throw Error();
                    }
                    handleProjectEdition();
                })
                .catch(() => alert('Error!'));
        } catch (error) {
            console.log('Validation Failed:', error);
        }
    };

    return (
        <Modal visible="true" onCancel={onCancel} onOk={saveProject} okText="Save" title="Edit Project">
            <Form form={form} labelCol={{ span: 6 }}>
                <Form.Item
                    name="name"
                    label="Name:"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the project name!'
                        }
                    ]}
                >
                    <Input placeholder="Project name" />
                </Form.Item>
                <Form.Item
                    name="budget"
                    label="Budget:"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the project budget!'
                        },
                        {
                            pattern: /^[0-9]+$/,
                            message: 'Invalid budget!'
                        }
                    ]}
                >
                    <Input placeholder="Budget" />
                </Form.Item>
                <Form.Item name="projectManagerId" label="Project Manager">
                    <Select allowClear="true" defaultValue={project.projectManagerId}>
                        <Option key={project.projectManagerId} value={project.projectManagerId}>{project.projectManagerName}</Option>
                        {projectManagers.map((projectManager) => (
                            <Option key={projectManager.id} value={projectManager.id}>{projectManager.fullname}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}