import React, { useEffect, useState } from 'react';
import { Badge, Calendar } from 'antd';
import moment from 'moment';
import { useUserInfo } from '../../user-info-provider';
import TimesheetModal from './timesheet-modal';
import '../styles/timesheet.css'

export default function Timesheet({ timesheet, setTimesheet }) {
    const [projects, setProjects] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/projects/list')
            .then((data) => data.json())
            .then(setProjects)
            .catch(() => alert('Error'));
    }, []);

    const { userId } = useUserInfo();
    useEffect(() => {
        retrieveTimesheetByDateAndEmployeeId(moment(), userId, setTimesheet);
    }, [userId]);

    const onPanelChange = (value) => {
        retrieveTimesheetByDateAndEmployeeId(value, userId, setTimesheet);
    };

    const [currentDate, setCurrentDate] = useState(moment()); // fix for modal window open after panel change
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState({});
    const onSelectDate = (date) => {
        if (date.month() === currentDate.month() && date.year() === currentDate.year()) {
            setModalContent(createModalContent(date, timesheet));
            setIsModalVisible(true);
        } else {
            setCurrentDate(date);
        }
    };

    const onComplete = (day, dayInfo) => {
        timesheet.data.days[day] = dayInfo;
        setIsModalVisible(false);
        setTimesheet(timesheet);
    };

    const onCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div className="timesheet">
            <Calendar
                mode={'month'}
                dateCellRender={(value) => dateCellRender(value, timesheet, projects)}
                onPanelChange={onPanelChange}
                onSelect={onSelectDate}
            />
            {isModalVisible && (
                <TimesheetModal
                    modalContent={modalContent}
                    isModalVisible={isModalVisible}
                    projects={projects}
                    onComplete={onComplete}
                    onCancel={onCancel}
                />
            )}
        </div>
    );
}

const dateCellRender = (value, timesheet, projects) => {
    const renderData = getRenderData(value, timesheet, projects);
    return (
        <ul className="records">
            {renderData.map((item) => (
                <li key={item.projectName}>
                    <Badge status="success" text={`${item.projectName} - ${item.hours} hours`} />
                </li>
            ))}
        </ul>
    );
};

const getRenderData = (value, timesheet, projects) => {
    if (!timesheet) {
        return [];
    }
    let currentPeriod = moment(timesheet.period);
    if (value.month() !== currentPeriod.month()) {
        return [];
    }

    let day = value.date();
    let dayInfo = timesheet.data.days[day];

    function getProjectNameById(id) {
        for (let i = 0; i < projects.length; i++) {
            if (projects[i].id == id) {
                return projects[i].name;
            }
        }
        return undefined;
    }

    let renderData = [];
    for (let projectId in dayInfo) {
        let projectName = getProjectNameById(projectId);
        if (projectName) {
            let hours = dayInfo[projectId];
            renderData.push({ projectName, hours });
        }
    }
    return renderData;
};

function createModalContent(date, timesheet) {
    let day = date.date();
    let dayInfo = timesheet.data.days[day];
    return { date, dayInfo };
}

function retrieveTimesheetByDateAndEmployeeId(date, employeeId, setTimesheet) {
    let period = date.format('YYYY-MM-01');
    let uri = `http://localhost:8080/timesheets/timesheet-info?employeeId=${employeeId}&period=${period}&createIfMissing=true`;
    fetch(uri)
        .then((response) => response.json())
        .then(setTimesheet)
        .catch(() => alert('Error'));
}
