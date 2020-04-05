import React from 'react'

import PageList from '../../../components/PageList'
import ApiCompany from '../../../_services/Company';

const columns = [
    { id: 'name', label: 'Name', minWidth: 20 },
    { id: 'email', label: 'Contact', minWidth: 50 },
    { id: 'vat', label: 'Vat Number', minWidth: 30 },
    { id: 'rcs', label: 'RCS', minWidth: 30 },
    { id: 'address', label: 'Address', minWidth: 50 },
    { id: 'country.name', label: 'Country', minWidth: 30 },
    { id: 'ACTIONS', label: 'Actions', minWidth: 50, align: 'center' },
];

const CompanyList = (props) => {
    return (
        <PageList
            canEdit={true}
            canDisable={true}
            canDelete={true}
            columns={columns}
            labelCount="Companies"
            labelAdd="Company"
            endpoint={ApiCompany}
            {...props}
        ></PageList>
    )
}

export default CompanyList;
