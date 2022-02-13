import React from 'react';
import { useInput } from '../../hooks/use-input';
import { useUserInfo } from '../../user-info-provider';
import { Form, Input, Button } from 'antd';
import 'antd/dist/antd.min.css';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import '../styles/authentication-form.css';
import logo from '../../../assets/Netcracker-logo.png';

export default function AuthenticationForm() {
    const [loginProps] = useInput('');
    const [passwordProps] = useInput('');
    const { setUserInfo } = useUserInfo();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        const uri = 'http://localhost:8080/credentials/authentication';
        const body = {
            login: loginProps.value,
            password: passwordProps.value
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
                return response.json();
            })
            .then((userId) => {
                console.log(`userId: ${userId}`);
                fetch(`http://localhost:8080/employees/employee?id=${userId}`)
                    .then((response) => {
                        if (!response.ok) {
                            throw Error();
                        }
                        return response.json();
                    })
                    .then((data) => {
                        setUserInfo(data.id, data.fullname, data.role);
                    })
                    .catch(() => {
                        alert('error');
                    });
            })
            .catch(() => {
                alert('error');
            });
    };

    return (
        <div className="form-container">
            <div className="logo">
                <img src={logo} alt="logo" />
            </div>
            <Form name="loginForm" className="login-form" onFinish={onFinish}>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Username!'
                        }
                    ]}
                >
                    <Input
                        {...loginProps}
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your Password!'
                        }
                    ]}
                >
                    <Input
                        {...passwordProps}
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}