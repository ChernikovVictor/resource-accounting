import React, { useState } from 'react';
import Timesheet from '../../timesheets/components/timesheet';
import '../styles/approval.css';
import ApproveButtonsPanel from './approve-buttons-panel';
import { useUserInfo } from '../../user-info-provider';
import SubordinatesMenu from './subordinates-menu';

export default function Approval() {
    const [timesheet, setTimesheet] = useState();
    const [employeeId, setEmployeeId] = useState();
    const { userId } = useUserInfo();

    return (
        <>
            <div className="subordinatesDiv">
                <SubordinatesMenu managerId={userId} setEmployeeId={setEmployeeId} />
            </div>
            <div className="timesheetDiv">
                <Timesheet timesheet={timesheet} setTimesheet={setTimesheet} employeeId={employeeId} />
                <div className="approveButtonsPanelDiv">
                    <ApproveButtonsPanel timesheet={timesheet} setTimesheet={setTimesheet} managerId={userId} />
                </div>
            </div>
        </>
    );
}