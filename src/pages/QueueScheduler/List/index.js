import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import {
    Box,
    Button,
    ButtonGroup,
    Collapse,
    Grid,
    IconButton,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow
} from '@material-ui/core';

import {
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon,
    Visibility as VisibilityIcon,
    FlashOn as FlashOnIcon,
    Delete as DeleteIcon,
    Edit as EditIcon,
    CheckCircleOutline as CheckCircleOutlineIcon,
    NotInterested as NotInterestedIcon
} from '@material-ui/icons';

// Custom components
import SearchInput from '../../../components/SearchInput'
import CollapsibleTable from '../../../components/CollapsibleTable'

import BreadcrumbPath from '../../../_models/BreadcrumbPath'

// API
import ApiQueueScheduler from '../../../_services/QueueScheduler';
import ApiQueueSchedulerHistory from '../../../_services/QueueSchedulerHistory';

// REDUX ACTIONS
import allActions from '../../../_actions/index';

const useRowStyles = makeStyles(theme => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
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
    buttonShow: {
        margin: theme.spacing(0),
        "& .MuiButton-startIcon": {
            margin: theme.spacing(0),
        },
        '&:hover': {
            backgroundColor: "#ffe0b2",
            color: '#fff3e0'
        },
        background: "#ffcc80",
        color: '#fff3e0'
    }
}));

const Row = ({ row }) => {
    const classes = useRowStyles();

    const [open, setOpen] = useState(false);
    const [state, setState] = useState([]);

    const history = useHistory();

    // call once per loading page
    useEffect(() => {
        if (open) {
            // Check if ApiQueueScheduler is defined
            if (!ApiQueueSchedulerHistory) {
                return;
            }

            ApiQueueSchedulerHistory.getHistory(row.external_id, {})
                .then(res => {
                    setState(res ? res : [])
                })
        } else {
            setState([])
        }
    }, [row, open])

    const handleClickEdit = (item) => {
        const path = item.id ? `/${item.id}` : '';

        history.push(`/queue/scheduler${path}`);
    }

    const handleLaunchEdit = async (item) => {
        if (!ApiQueueScheduler.launch) {
            return;
        }

        ApiQueueScheduler.launch(item.id)
            .then(res => {
                if (!res) {
                    // flash message
                    return
                }
            })
    }

    const handleClickDisabled = async (item) => {
        ApiQueueScheduler.disabled(item.id, !item.enabled)
            .then(res => {
                if (!res) {
                    // flash message
                    return
                }

                const newState = state.map(row => {
                    if (item.id === row.id) {
                        if (row.hasOwnProperty('enabled')) {
                            row.enabled = !item.enabled;
                        } else {
                            row.status = !item.status;
                        }
                    }

                    return row;
                });

                setState(newState); // load();
            })
    };

    const handleClickDelete = (item) => {
        ApiQueueScheduler.delete(item.id)
            .then(res => {
                if (!res) {
                    // flash message
                    return
                }

                const newState = state.filter(row => row.id !== item.id);

                setState(newState); // load();
            })
    };

    const handleClickShow = (item) => {
        history.push(`/queue/scheduler/show/${item.work_id}`);
    };

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {row.name}
                </TableCell>
                <TableCell>{row.url}</TableCell>
                <TableCell>{row.queue_type.name}</TableCell>
                <TableCell align="center">
                    <ButtonGroup color="primary" size="small" aria-label="small outlined button group">
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            startIcon={<EditIcon />}
                            onClick={() => handleClickEdit(row)}
                        >
                            {""}
                        </Button>

                        <Button
                            variant="contained"
                            className={classes.buttonLaunch}
                            startIcon={<FlashOnIcon />}
                            onClick={() => handleLaunchEdit(row)}
                        >
                            {""}
                        </Button>

                        <Button
                            variant="contained"
                            color="inherit"
                            className={classes.button}
                            startIcon={row.enabled || row.status ? <CheckCircleOutlineIcon style={{ color: green[500] }} /> : <NotInterestedIcon color="secondary" />}
                            onClick={() => handleClickDisabled(row)}
                        >
                            {""}
                        </Button>

                        <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={() => handleClickDelete(row)}
                        >
                            {""}
                        </Button>
                    </ButtonGroup>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                History
                            </Typography>

                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Work ID</TableCell>
                                        <TableCell align="center">Requests</TableCell>
                                        <TableCell align="center">LoadTime</TableCell>
                                        <TableCell align="center">Cookies</TableCell>
                                        <TableCell align="center">Domains</TableCell>
                                        <TableCell align="center">Show</TableCell>
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {state && state.map((historyRow) => (
                                        <TableRow key={historyRow.at}>
                                            <TableCell component="th" scope="row">
                                                {new Date(historyRow.at).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>{historyRow.work_id}</TableCell>
                                            <TableCell align="center">{Number(historyRow.request_count)}</TableCell>
                                            <TableCell align="right">{Number(historyRow.load_time)}&nbsp;ms</TableCell>
                                            <TableCell align="center">{Array.isArray(historyRow.cookies) ? historyRow.cookies.length : 0}</TableCell>
                                            <TableCell align="center">{Array.isArray(historyRow.domains) ? historyRow.domains.length : 0}</TableCell>
                                            <TableCell align="center">
                                                <Button
                                                    variant="contained"
                                                    color="secondary"
                                                    className={classes.buttonShow}
                                                    startIcon={<VisibilityIcon />}
                                                    onClick={() => handleClickShow(historyRow)}
                                                >
                                                    {""}
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
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
    { id: 'name', label: 'Name', minWidth: 80 },
    { id: 'url', label: 'URL', minWidth: 80 },
    // { id: 'Enabled', label: 'Enabled', minWidth: 80 },
    { id: 'queue_type.name', label: 'QueueName', minWidth: 80, maxWidth: '180px' },
    // { id: 'last_schedule_at', label: 'LastScheduleAt', minWidth: 80 },
    { id: 'ACTIONS', label: 'Actions', minWidth: 50, align: 'center' },
];

const List = ({ className, match }) => {
    const classes = useStyles();

    const dispatch = useDispatch();
    const history = useHistory();

    const breadcrumb = new BreadcrumbPath(match.url, [{ path: '/', name: 'Shedulers' }])

    const resetSearch = useSelector(state => state.entity.reset);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [search, setSearch] = useState("");
    const [state, setState] = useState([]);
    const [count, setCount] = useState(0);
    const [indexloaded, setIndexloaded] = useState({});

    // call once per loading page
    useEffect(() => {
        dispatch(allActions.breadcrumbActions.changeView(breadcrumb))
        // eslint-disable-next-line
    }, [])

    // call once per loading page
    useEffect(() => {
        if (resetSearch) {
            reset();
        }
    }, [resetSearch])

    const load = useCallback(async (indexloaded) => {
        // Check if ApiQueueScheduler is defined
        if (!ApiQueueScheduler) {
            return;
        }

        // Only one request
        if (indexloaded[page * rowsPerPage]) {
            return;
        }

        // TODO : Use QueryFilter() => rebuild logic
        ApiQueueScheduler.getEntities({ offset: page * rowsPerPage, limit: rowsPerPage, page: page, search: search })
            .then(res => {
                const entities = res.entities ? res.entities : [];

                setCount(res.counter);
                setIndexloaded({ ...indexloaded, [page * rowsPerPage]: true })
                setState([...state, ...entities])
            })
        // eslint-disable-next-line
    }, [ApiQueueScheduler, page, rowsPerPage, search]);

    useEffect(() => {
        load(indexloaded)
    }, [load, indexloaded]);

    const handleClickEdit = (item) => {
        const path = item.id ? `/${item.id}` : '';

        history.push(`/queue/scheduler${path}`);
    }

    // --- events

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = event => {
        setRowsPerPage(+event.target.value);
        reset();
    };

    const searchInputHandleChange = event => {
        const { value } = event.target;

        setSearch(value);

        if (0 !== value.length && value.length < 3) {
            return;
        }

        reset();
    };

    const reset = () => {
        setState([]);
        setPage(0);
        setIndexloaded({});
    }

    return (
        <div className={clsx(classes.root, className)}>
            <Grid container spacing={3} justify="center" alignItems="center">
                <Grid item xs={2} md={2}>
                    <Typography variant="body2" color="textSecondary" align="left" style={{ fontWeight: "bold" }}>
                        {count} Schedulers
                    </Typography>
                </Grid>

                <Grid item xs={10} md={8}>
                    <SearchInput
                        className={classes.searchInput}
                        placeholder={"Search Scheduler"}
                        onChange={searchInputHandleChange}
                        value={search}
                    />
                </Grid>

                <Grid item xs={12} md={2}>
                    <Button
                        color="primary"
                        variant="contained"
                        style={{ float: "right", fontSize: "0.775rem" }}
                        onClick={() => handleClickEdit()}
                    >
                        Add Scheduler
                    </Button>
                </Grid>
            </Grid>

            <div style={{ height: '20px' }}></div>

            <Paper className={classes.root}>
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
                <TablePagination
                    rowsPerPageOptions={[10, 25, 50, 100]}
                    component="div"
                    count={count}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                        'aria-label': 'previous page',
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'next page',
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </div>
    )
}

export default List;
