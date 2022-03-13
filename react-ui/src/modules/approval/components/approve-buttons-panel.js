import React from 'react';
import ButtonApprove from './button-approve';
import ButtonDecline from './button-decline';
import { Alert } from 'antd';

export default function ApproveButtonsPanel({ timesheet, setTimesheet, managerId }) {
    const alertProperties = createAlertProperties(timesheet, managerId);
    const shouldRenderButtons = alertProperties.type === 'warning';
    return (
        <>
            {shouldRenderButtons && (
                <ButtonDecline timesheet={timesheet} setTimesheet={setTimesheet} managerId={managerId} />
            )}

            <Alert {...alertProperties} />

            {shouldRenderButtons && (
                <ButtonApprove timesheet={timesheet} setTimesheet={setTimesheet} managerId={managerId} />
            )}
        </>
    );
}

const createAlertProperties = (timesheet, managerId) => {
    const properties = {
        showIcon: true,
        style: {
            margin: '0 10px 0 10px'
        },
        type: 'info',
        message: 'The timesheet is undefined'
    };
    if (!timesheet) {
        return properties;
    }
    if (!timesheet.data.status) {
        properties.message = 'The timesheet has not been submitted by the employee yet';
        return properties;
    }
    const managerStatus = timesheet.data.status[managerId];
    if (managerStatus) {
        switch (managerStatus) {
            case 'ON_APPROVAL':
                properties.type = 'warning';
                properties.message = 'Please, approve or decline this timesheet';
                break;
            case 'APPROVED':
                properties.type = 'success';
                properties.message = 'You have approved this timesheet';
                break;
            case 'DECLINED':
                properties.type = 'error';
                properties.message = 'You have declined this timesheet';
                break;
            default:
                properties.message = 'Unknown status of timesheet!'
        }
    } else {
        properties.message = 'You have nothing to approve or decline here';
    }

    return properties;
};
