import React, { useEffect, useState } from 'react';
import Timesheet from './timesheet';
import '../styles/timesheets.css';
import StatusList from './status-list';
import ButtonSave from './button-save';
import ButtonSubmit from './button-submit';

export default function Timesheets() {
    const [timesheet, setTimesheet] = useState();
    const [timesheetStatus, setTimesheetStatus] = useState([]);

    useEffect(() => {
        if (!timesheet || !timesheet.id) {
            return;
        }
        fetch(`http://localhost:8080/timesheets/timesheet/status?id=${timesheet.id}`)
            .then((data) => data.json())
            .then(setTimesheetStatus)
            .catch(() => alert('Error'));
    }, [timesheet]);

    return (
        <div>
            <Timesheet timesheet={timesheet} setTimesheet={setTimesheet} />
            <div className="statusDiv">
                <StatusList timesheetStatus={timesheetStatus} />
            </div>
            <div className="buttonsDiv">
                <ButtonSave timesheet={timesheet} />
                <ButtonSubmit timesheet={timesheet} setTimesheet={setTimesheet} />
            </div>
        </div>
    );
}