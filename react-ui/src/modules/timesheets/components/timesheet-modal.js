import React, { useState } from 'react';
import ModalOptions from './timesheet-modal-options';
import Modal from 'antd/es/modal/Modal';

export default function TimesheetModal({ modalContent, isModalVisible, projects, onComplete, onCancel }) {
    const date = modalContent.date;
    const modalTitle = date.format('D MMMM, YYYY');
    const recordsInitialState = dayInfoToRecords(modalContent.dayInfo);
    const [records, setRecords] = useState(recordsInitialState);
    return (
        <Modal
            title={modalTitle}
            visible={isModalVisible}
            onOk={() => onComplete(date.date(), recordsToDayInfo(records))}
            onCancel={onCancel}
        >
            <ModalOptions projects={projects} records={records} setRecords={setRecords} />
        </Modal>
    );
}

function dayInfoToRecords(dayInfo) {
    let keys = Object.keys(dayInfo);
    let records = [];
    for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        records.push({ projectId: parseInt(key), time: dayInfo[key] });
    }
    return records;
}

function recordsToDayInfo(records) {
    return records.reduce((result, record) => {
        result[record.projectId] = record.time;
        return result;
    }, {});
}
