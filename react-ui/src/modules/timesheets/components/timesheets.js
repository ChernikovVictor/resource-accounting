import React from 'react';
import Timesheet from './timesheet';

export default function Timesheets() {
    return (
        <div>
            <Timesheet/>
            <div className="statusDiv" style={{ float: 'left' }}>
                <h2>Status:</h2>
            </div>
            <div className="buttonsDiv" style={{ float: 'right' }}>
                <button>save</button>
                <button>submit</button>
            </div>
        </div>
    );
}