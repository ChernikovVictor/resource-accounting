import React, { useEffect, useState } from 'react';
import Modal from 'antd/es/modal/Modal';
import { Form, Input, Select } from 'antd';

const Option = { Select };

export default function EmployeeEditModal({ employee, onCancel, handleEmployeeEdition }) {
    const [linearManagers, setLinearManagers] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/employees/linear-managers')
            .then((data) => data.json())
            .then(setLinearManagers)
            .catch(() => alert('Error'));
    }, []);

    const [employeeRoles, setEmployeeRoles] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/employees/employee-roles')
            .then((data) => data.json())
            .then(setEmployeeRoles)
            .catch(() => alert('Error'));
    }, []);

    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            fullname: employee.fullname,
            email: employee.email,
            role: employee.role,
            linearManagerId: employee.linearManagerId
        });
    }, [form, employee]);

    const saveEmployee = async () => {
        try {
            let formValues = await form.validateFields();
            console.log('formValues:', formValues);
            let uri = 'http://localhost:8080/employees/employee';
            let body = {
                ...employee,
                fullname: formValues.fullname,
                email: formValues.email,
                role: formValues.role,
                linearManagerId: formValues.linearManagerId ? formValues.linearManagerId : null
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
                    handleEmployeeEdition();
                })
                .catch(() => alert('Error!'));
        } catch (error) {
            console.log('Validation Failed:', error);
        }
    };

    return (
        <Modal visible="true" onCancel={onCancel} onOk={saveEmployee} okText="Save" title="Edit employee information">
            <Form form={form} labelCol={{ span: 6 }}>
                <Form.Item
                    name="fullname"
                    label="Full Name:"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the employee name!'
                        }
                    ]}
                >
                    <Input placeholder="Full Name" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="E-mail:"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the E-mail!'
                        }
                    ]}
                >
                    <Input placeholder="E-mail" />
                </Form.Item>
                <Form.Item
                    name="role"
                    label="Role"
                    rules={[
                        {
                            required: true,
                            message: 'Please select the employee role!'
                        }
                    ]}
                >
                    <Select>
                        {employeeRoles.map((role) => (
                            <Option key={role}>{role}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="linearManagerId" label="Linear Manager">
                    <Select allowClear="true" defaultValue={employee.linearManagerId}>
                        {linearManagers.map((linearManager) => (
                            <Option key={linearManager.id} value={linearManager.id}>{linearManager.fullname}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </Form>
        </Modal>
    );
}