import React from 'react';
import { Button, Modal } from 'antd';
import { CheckOutlined } from '@ant-design/icons';

export default function ButtonApprove({ timesheet, setTimesheet, managerId }) {
    return (
        <Button
            type="primary"
            style={{ backgroundColor: 'green', color: 'white', borderColor: 'green' }}
            icon={<CheckOutlined />}
            onClick={() => approveTimesheet(timesheet, setTimesheet, managerId)}
        >
            Approve
        </Button>
    );
}

const approveTimesheet = (timesheet, setTimesheet, managerId) => {
    const fetchSettings = {
        method: 'POST'
    };
    const uri = `http://localhost:8080/timesheets/approve?timesheet=${timesheet.id}&manager=${managerId}`;
    fetch(uri, fetchSettings)
        .then((response) => {
            if (response.ok) {
                Modal.success({
                    content: 'Timesheet has been approved successfully!'
                });
            } else {
                throw Error();
            }
        })
        .then(() => retrieveApprovedTimesheet(timesheet.id, setTimesheet))
        .catch(() => {
            Modal.error({
                title: 'Timesheet has not been approved!'
            });
        });
};

const retrieveApprovedTimesheet = (timesheetId, setTimesheet) => {
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
                title: 'Cannot retrieve approved timesheet!'
            });
        });
};