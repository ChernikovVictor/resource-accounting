import React from 'react';
import { Button, Modal } from 'antd';
import { SendOutlined } from '@ant-design/icons';

export default function ButtonSubmit({ timesheet, setTimesheet }) {
    return (
        <Button type="primary" icon={<SendOutlined />} onClick={() => submitTimesheet(timesheet, setTimesheet)}>
            Submit
        </Button>
    );
}

const submitTimesheet = (timesheet, setTimesheet) => {
    const fetchSettings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(timesheet)
    };
    const uri = 'http://localhost:8080/timesheets/submit';
    fetch(uri, fetchSettings)
        .then((response) => {
            if (response.ok) {
                Modal.success({
                    content: 'Timesheet has been submitted successfully!'
                });
                return response.json();
            } else {
                throw Error();
            }
        })
        .then(setTimesheet)
        .catch(() => {
            Modal.error({
                title: 'Timesheet has not been submitted!'
            });
        });
};