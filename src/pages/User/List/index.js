import React from 'react'

import PageList from '../../../components/PageList'

import ApiUser from '../../../_services/User';

const columns = [
    { id: 'email', label: 'Email', minWidth: 80 },
    { id: 'firstName', label: 'FirstName', minWidth: 80 },
    { id: 'lastName', label: 'LastName', minWidth: 80 },
    { id: 'ACTIONS', label: 'Actions', minWidth: 50, align: 'center' },
];

const UserList = (props) => {
    return (
        <PageList
            canEdit={true}
            canDisable={true}
            canDelete={true}
            columns={columns}
            labelCount="Users"
            labelAdd="User"
            endpoint={ApiUser}
            {...props}
        ></PageList>
    )
}

export default UserList;
