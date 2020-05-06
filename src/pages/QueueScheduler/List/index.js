import React from 'react'

import PageList from '../../../components/PageList'

import ApiQueueScheduler from '../../../_services/QueueScheduler';

const columns = [
    { id: 'name', label: 'Name', minWidth: 80 },
    { id: 'url', label: 'URL', minWidth: 80 },
    { id: 'Enabled', label: 'Enabled', minWidth: 80 },
    { id: 'queue_type.name', label: 'QueueName', minWidth: 80 },
    { id: 'last_schedule_at', label: 'LastScheduleAt', minWidth: 80 },
    { id: 'ACTIONS', label: 'Actions', minWidth: 50, align: 'center' },
];

const QueueSchedulerList = (props) => {
    return (
        <PageList
            canEdit={true}
            canDisable={true}
            // canDelete={true}
            canLaunch={true}
            columns={columns}
            labelCount="Schedulers"
            labelAdd="Scheduler"
            endpoint={ApiQueueScheduler}
            {...props}
        ></PageList>
    )
}

export default QueueSchedulerList;
