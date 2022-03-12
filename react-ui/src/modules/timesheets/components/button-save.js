import React from 'react';
import { SaveOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';

export default function ButtonSave({ timesheet }) {
    return (
        <Button icon={<SaveOutlined />} onClick={() => saveTimesheet(timesheet)}>
            Save
        </Button>
    );
}

const saveTimesheet = (timesheet) => {
    const fetchSettings = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(timesheet)
    };
    const uri = 'http://localhost:8080/timesheets/timesheet';
    fetch(uri, fetchSettings)
        .then((response) => {
            if (response.ok) {
                Modal.success({
                    content: 'Timesheet has been saved successfully!'
                });
            } else {
                throw Error();
            }
        })
        .catch(() => {
            Modal.error({
                title: 'Timesheet has not been saved!'
            });
        });
};