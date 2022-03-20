import React, { useEffect } from 'react';
import Modal from 'antd/es/modal/Modal';
import { Form, Input } from 'antd';

export default function CredentialsEditModal({ employeeId, onCancel, handleCredentialsEdition }) {
    const [form] = Form.useForm();
    useEffect(() => {
        fetch(`http://localhost:8080/credentials/credentials?employeeId=${employeeId}`)
            .then((response) => response.json())
            .then((data) => {
                form.setFieldsValue({
                    login: data.login,
                    password: data.password
                });
            })
            .catch(() => alert('Error'));
    }, [form, employeeId]);

    const saveCredentials = async () => {
        try {
            let formValues = await form.validateFields();
            let uri = 'http://localhost:8080/credentials/credentials';
            let body = {
                employeeId: employeeId,
                login: formValues.login,
                password: formValues.password
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
                    handleCredentialsEdition();
                })
                .catch(() => alert('Error! This login is already in use'));
        } catch (error) {
            console.log('Validation Failed:', error);
        }
    };

    return (
        <Modal visible="true" onCancel={onCancel} onOk={saveCredentials} okText="Save" title="Edit Credentials">
            <Form form={form} labelCol={{ span: 5 }}>
                <Form.Item
                    name="login"
                    label="Login:"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the login!'
                        }
                    ]}
                >
                    <Input placeholder="Login" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password:"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the password!'
                        }
                    ]}
                >
                    <Input placeholder="Password" />
                </Form.Item>
            </Form>
        </Modal>
    );
}