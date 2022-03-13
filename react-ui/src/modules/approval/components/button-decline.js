import React from 'react';
import { Button, Modal } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

export default function ButtonDecline({ timesheet, setTimesheet, managerId }) {
    return (
        <Button
            type="primary"
            danger
            icon={<CloseOutlined />}
            onClick={() => declineTimesheet(timesheet, setTimesheet, managerId)}
        >
            Decline
        </Button>
    );
}

const declineTimesheet = (timesheet, setTimesheet, managerId) => {
    const fetchSettings = {
        method: 'POST'
    };
    const uri = `http://localhost:8080/timesheets/decline?timesheet=${timesheet.id}&manager=${managerId}`;
    fetch(uri, fetchSettings)
        .then((response) => {
            if (response.ok) {
                Modal.success({
                    content: 'Timesheet has been declined successfully!'
                });
            } else {
                throw Error();
            }
        })
        .then(() => retrieveDeclinedTimesheet(timesheet.id, setTimesheet))
        .catch(() => {
            Modal.error({
                title: 'Timesheet has not been approved!'
            });
        });
};

const retrieveDeclinedTimesheet = (timesheetId, setTimesheet) => {
    const uri = `http://localhost:8080/timesheets/timesheet?id=${timesheetId}`;
    fetch(uri)
        .then((response) => {
            if (!response.ok) {
                throw Error();
            }
            return response.json();
        })
        .then(setTimesheet)
        .catch(() => {
            Modal.error({
                title: 'Cannot retrieve declined timesheet!'
            });
        });
};