import React from 'react';
import { Card, List, Typography } from 'antd';

const { Text, Title } = Typography;

export default function StatusList({ timesheetStatus }) {
    return (
        <List
            header={<Title level={3}>Timesheet status:</Title>}
            grid
            bordered
            dataSource={timesheetStatus}
            renderItem={(item) => (
                <List.Item>
                    <Card title={item.manager}>
                        <Text type={getStatusType(item.status)}>{getStatusText(item.status)}</Text>
                    </Card>
                </List.Item>
            )}
        />
    );
}

const getStatusType = (status) => {
    switch (status) {
        case 'ON_APPROVAL':
            return 'warning';
        case 'APPROVED':
            return 'success';
        case 'DECLINED':
            return 'danger';
        default:
            return '';
    }
};

const getStatusText = (status) => {
    switch (status) {
        case 'ON_APPROVAL':
            return 'On Approval';
        case 'APPROVED':
            return 'Approved';
        case 'DECLINED':
            return 'Rejected';
        default:
            return '';
    }
};