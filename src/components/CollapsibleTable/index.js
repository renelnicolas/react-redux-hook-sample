import React from 'react';

import {
    Paper,
    Table,
    TableContainer
} from '@material-ui/core';

const CollapsibleTable = ({ children }) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                {children}
            </Table>
        </TableContainer>
    );
}

export default CollapsibleTable;
