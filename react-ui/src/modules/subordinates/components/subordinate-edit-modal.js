import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';
import Modal from 'antd/es/modal/Modal';

const Option = { Select };

export default function SubordinateEditModal({ subordinate, onCancel, handleEmployeeEdition }) {
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            position: subordinate.position,
            salary: subordinate.salary,
            assignedProjects: subordinate.assignedProjects.map((project) => project.id)
        });
    }, [form, subordinate]);

    const [projects, setProjects] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/projects/list')
            .then((data) => data.json())
            .then(setProjects)
            .catch(() => alert('Error'));
    }, []);

    const updateSubordinateInfo = async () => {
        try {
            let formValues = await form.validateFields();
            console.log('formValues:', formValues);
            let uri = 'http://localhost:8080/employees/employee';
            let body = {
                ...subordinate,
                salary: formValues.salary,
                position: formValues.position
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
                    updateProjectsAssignment(subordinate.id, formValues.assignedProjects, handleEmployeeEdition);
                })
                .catch(() => alert('Error!'));
        } catch (error) {
            console.log('Validation Failed:', error);
        }
    };

    return (
        <Modal
            visible="true"
            onCancel={onCancel}
            okText="Save"
            onOk={updateSubordinateInfo}
            title={subordinate.fullname}
        >
            <Form form={form} labelCol={{ span: 6 }}>
                <Form.Item name="position" label="Position:">
                    <Input placeholder="Position" />
                </Form.Item>
                <Form.Item
                    name="salary"
                    label="Salary:"
                    rules={[
                        {
                            pattern: /^[0-9]+$/,
                            message: 'Invalid salary!'
                        }
                    ]}
                >
                    <Input placeholder="Salary" />
                </Form.Item>
                <Form.Item name="assignedProjects" label="Assigned projects:">
                    <Select
                        allowClear="true"
                        mode="multiple"
                        defaultValue={subordinate.assignedProjects.map((project) => project.id)}
                    >
                        {projects.map((project) => (
                            <Option key={project.id} value={project.id}>
                                {project.name}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}

const updateProjectsAssignment = (employeeId, projectIds, handleEmployeeEdition) => {
    let uri = `http://localhost:8080/employees/projects?employeeId=${employeeId}&isOverwrite=true`;
    const fetchSetting = {
        method: 'POST',
        headers: {
            'Content-type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(projectIds)
    };
    fetch(uri, fetchSetting)
        .then((response) => {
            if (!response.ok) {
                throw Error();
            }
            handleEmployeeEdition();
        })
        .catch(() => alert('Error!'));
};
