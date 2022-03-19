import React, { useEffect, useState } from 'react';
import Modal from 'antd/es/modal/Modal';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

export default function ProjectCreateModal({ onCancel, handleProjectCreation }) {
    const [projectManagers, setProjectManagers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/employees/project-managers?onlyFree=true')
            .then((data) => data.json())
            .then(setProjectManagers)
            .catch(() => alert('Error'));
    }, []);

    const [form] = Form.useForm();
    const saveProject = async () => {
        try {
            let formValues = await form.validateFields();
            console.log('formValues: ', formValues);
            let uri = 'http://localhost:8080/projects/project';
            let body = {
                name: formValues.name,
                budget: formValues.budget,
                projectManagerId: formValues.projectManagerId ? formValues.projectManagerId : null
            };
            const fetchSetting = {
                method: 'POST',
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
                    handleProjectCreation();
                })
                .catch(() => alert('Error'));
        } catch (error) {
            console.log('Validation Failed:', error);
        }
    };

    return (
        <Modal visible="true" onCancel={onCancel} onOk={saveProject} okText="Save" title="Create Project">
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
                    <Select allowClear="true">
                        {projectManagers.map((projectManager) => (
                            <Option key={projectManager.id}>{projectManager.fullname}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}