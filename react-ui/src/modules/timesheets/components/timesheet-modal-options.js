import React from 'react';
import 'antd/dist/antd.min.css';
import { CloseCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import '../styles/timesheet-modal-options.css'
import { timeMap } from '../util/util';

const { Option } = Select;

export default function ModalOptions({ projects, records, setRecords }) {
    const handleProjectChange = (value) => {
        let projectId = value.value;
        setRecords(
            records.map((record, index) => {
                return index == value.key ? { ...record, projectId } : record;
            })
        );
    };

    const handleTimeChange = (value) => {
        let time = value.value;
        setRecords(
            records.map((record, index) => {
                return index == value.key ? { ...record, time } : record;
            })
        );
    };

    const addRecord = () => setRecords([...records, {}]);

    const deleteLastRecord = () => {
        setRecords(records.filter((record, index) => index < records.length - 1));
    };

    return (
        <>
            {records.map((record, recordIndex) => (
                <div key={recordIndex} className="record-container">
                    <Select
                        labelInValue
                        className="selectProject"
                        onChange={handleProjectChange}
                        defaultValue={{ value: record.projectId }}
                    >
                        {projects.map((project) => (
                            <Option key={recordIndex} value={project.id}>
                                {project.name}
                            </Option>
                        ))}
                    </Select>
                    <Select
                        labelInValue
                        className="selectTime"
                        onChange={handleTimeChange}
                        defaultValue={{ value: record.time }}
                    >
                        {timeMap.map((object) => (
                            <Option key={recordIndex} value={object.value}>
                                {object.label}
                            </Option>
                        ))}
                    </Select>
                </div>
            ))}
            <div className="record-container">
                <Button type="primary" shape="circle" icon={<PlusOutlined />} onClick={addRecord} />
                <CloseCircleOutlined className="remove-record-icon" onClick={deleteLastRecord} />
            </div>
        </>
    );
}
