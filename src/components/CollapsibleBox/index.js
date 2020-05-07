import React from 'react';

import {
    Collapse,
    Box,
    TableContainer
} from '@material-ui/core';

const CollapsibleBox = ({ children }) => {

    const [open, setOpen] = useState(false);
    return (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>

                {children}
            </Box>
        </Collapse>
    );
}

export default CollapsibleTable;
