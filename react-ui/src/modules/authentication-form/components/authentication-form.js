import React from 'react';
import { useInput } from '../../hooks/use-input';
import { useUserInfo } from '../../user-info-provider';

export default function AuthenticationForm() {
    const [loginProps] = useInput('');
    const [passwordProps] = useInput('');
    const { setUserInfo } = useUserInfo();

    const submit = (event) => {
        event.preventDefault();
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
        <>
            <h2>Netcracker</h2>
            <form onSubmit={submit}>
                <input {...loginProps} type="text" required />
                <input {...passwordProps} type="text" required />
                <button>Log in</button>
            </form>
        </>
    );
}