import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'


import { makeStyles } from '@material-ui/core/styles';

import {
    Box,
    Collapse,
    Grid,
    IconButton,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@material-ui/core';

import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
} from '@material-ui/icons';

// Custom components
import CollapsibleTable from '../../../components/CollapsibleTable'
import ExpansionBox from '../../../components/ExpansionBox'


import BreadcrumbPath from '../../../_models/BreadcrumbPath'

// REDUX ACTIONS
import allActions from '../../../_actions/index';

// API
import ApiQueueSchedulerHistory from '../../../_services/QueueSchedulerHistory';

const useRowStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

const getExpansionPanelDetails = (details, upperKey, xs) => {
    let content = [];

    for (let field in details) {
        content.push((<Grid key={field} item xs={xs ? xs : 6}>{true === upperKey ? field.toLocaleUpperCase() : field} : {details[field]}</Grid>))
    }

    if (!(content.length % 2 === 0)) {
        content.push((<Grid key={'index'} item xs={6}></Grid>))
    }

    return (
        <Grid container spacing={3} justify="center" alignItems="center">
            {content.map(content => content)}
        </Grid>
    )
}

const getCookies = (cookies) => {
    const panels = cookies.map(cookie => {
        return { content: getExpansionPanelDetails(cookie, false, 3), summary: cookie.name }
    });

    return (<Grid key={'cookies'} item xs={12}><ExpansionBox panels={panels} /></Grid>);
}

const Row = ({ row }) => {
    const classes = useRowStyles();

    const [open, setOpen] = useState(false);
    const [panels, setPanels] = useState([]);

    // call once per loading page
    useEffect(() => {
        if (open) {
            const panels = [
                { content: getExpansionPanelDetails(row.headers), summary: "Headers" },
                { content: getExpansionPanelDetails(row.remote_address, true), summary: "Remote Address" },
                { content: getExpansionPanelDetails(row.timing, true), summary: "Timing" },
                { content: getCookies(row.cookies), summary: "Cookies" },
            ];

            setPanels(panels)
        } else {
            setPanels([])
        }
    }, [row, open])

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.url}
                </TableCell>
                <TableCell align="center">{row.status}</TableCell>
                <TableCell align="center">{row.method}</TableCell>
                <TableCell align="center">{row.resource_type}</TableCell>
                <TableCell align="center">{Array.isArray(row.cookies) ? row.cookies.length : 0}</TableCell>
                {/* <TableCell>{row.timing}</TableCell> */}
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <ExpansionBox panels={panels} />
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    tableWrapper: {
        maxHeight: 680,
        overflow: 'auto',
        height: "100%",
    },
    paper: {
        padding: "8px",
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        margin: theme.spacing(0),
        "& .MuiButton-startIcon": {
            margin: theme.spacing(0),
        }
    },
    buttonLaunch: {
        margin: theme.spacing(0),
        "& .MuiButton-startIcon": {
            margin: theme.spacing(0),
        },
        '&:hover': {
            backgroundColor: "#ffab00",
            color: '#e65100'
        },
        background: "#ffd600",
        color: 'white'
    },
}));

const columns = [
    { id: 'url', label: 'URL', minWidth: 80 },
    { id: 'status', label: 'HTTP Status', minWidth: 80, align: 'center' },
    { id: 'method', label: 'Method', minWidth: 80, align: 'center' },
    { id: 'resource_type', label: 'Resource Type', minWidth: 80, align: 'center' },
    { id: 'cookies', label: 'Cookies', minWidth: 80, align: 'center' },
    // { id: 'timing', label: 'Timing', minWidth: 80 },
];

const Details = ({ match }) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const { workId } = match.params;

    const breadcrumb = new BreadcrumbPath(match.url, [{ path: '/queue/schedulers', name: 'Queue - Scheduler' }, { name: "Details" }])

    const [state, setState] = useState([]);

    // call once per loading page
    useEffect(() => {
        dispatch(allActions.breadcrumbActions.changeView(breadcrumb))
        // eslint-disable-next-line
    }, [])

    // call once per loading page
    useEffect(() => {
        ApiQueueSchedulerHistory.getDetails(workId, {})
            .then(res => {
                setState(res ? res : [])
            })
    }, [workId])

    return (
        <div className={classes.tableWrapper}>
            <CollapsibleTable
                columns={columns}
                rows={state}
            >
                <TableHead>
                    <TableRow>
                        <TableCell />
                        {columns && columns.map((column) => (
                            (<TableCell
                                key={column.id}
                                align={column.align ? column.align : "inherit"}
                                style={{ minWidth: column.minWidth, maxWidth: column.hasOwnProperty('maxWidth') ? column.maxWidth : '150px' }}
                            >
                                {column.label}
                            </TableCell>)
                        ))}
                    </TableRow>
                </TableHead>

                <TableBody>
                    {state && state.map((row, index) => (
                        <Row key={`${index}-${row.name}`} row={row} />
                    ))}
                </TableBody>
            </CollapsibleTable>
        </div>
    );
}

export default Details;
