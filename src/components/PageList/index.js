import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

import PropTypes from 'prop-types';

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import {
    Button,
    ButtonGroup,
    Grid,
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
    Delete as DeleteIcon,
    Edit as EditIcon,
    CheckCircleOutline as CheckCircleOutlineIcon,
    NotInterested as NotInterestedIcon
} from '@material-ui/icons';

import SearchInput from '../SearchInput'

import BreadcrumbPath from '../../_models/BreadcrumbPath'

// REDUX ACTIONS
import allActions from '../../_actions/index';

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
}));

const PageList = (props) => {
    const classes = useStyles();

    const { className, canEdit, canDisable, canDelete, labelCount, labelAdd, columns, endpoint, match } = props;

    const dispatch = useDispatch();
    const history = useHistory();

    const breadcrumb = new BreadcrumbPath(match.url, [{ path: '/companies', name: labelCount }])

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

    const load = useCallback(async (indexloaded) => {
        // Check if endpoint is defined
        if (!endpoint) {
            return;
        }

        // Only one request
        if (indexloaded[page * rowsPerPage]) {
            return;
        }

        // TODO : Use QueryFilter() => rebuild logic
        endpoint.getEntities({ offset: page * rowsPerPage, limit: rowsPerPage, page: page, search: search })
            .then(res => {
                setCount(res.counter);
                setIndexloaded({ ...indexloaded, [page * rowsPerPage]: true })
            })
    }, [endpoint, page, rowsPerPage, search]);

    useEffect(() => {
        load(indexloaded)
    }, [load, indexloaded]);

    const handleClickEdit = (item) => {
        const path = labelAdd.toLowerCase() + (item ? `/` + item.id : '');

        history.push(path);
    };

    const handleClickDisabled = async (item) => {
        endpoint.disableendpoint(item)
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
        endpoint.delete(item.id)
            .then(res => {
                if (!res) {
                    // flash message
                    return
                }

                const newState = state.filter(row => row.id !== item.id);

                setState(newState); // load();
            })
    };

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

        if (value.length < 3) {
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
                        {count} {labelCount}
                    </Typography>
                </Grid>

                <Grid item xs={10} md={8}>
                    <SearchInput
                        className={classes.searchInput}
                        placeholder={"Search " + labelCount}
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
                        Add {labelAdd}
                    </Button>
                </Grid>
            </Grid>

            <div style={{ height: '20px' }}></div>

            <Paper className={classes.root}>
                <div className={classes.tableWrapper}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map(column => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth, maxWidth: column.hasOwnProperty('maxWidth') ? column.maxWidth : '150px' }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {state.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map(column => {
                                            if ('ACTIONS' === column.id) {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <Grid item>
                                                            <ButtonGroup color="primary" size="small" aria-label="small outlined button group">
                                                                {canEdit && <Button
                                                                    variant="contained"
                                                                    color="primary"
                                                                    className={classes.button}
                                                                    startIcon={<EditIcon />}
                                                                    onClick={() => handleClickEdit(row)}
                                                                >
                                                                    {""}
                                                                </Button>}

                                                                {canDisable && <Button
                                                                    variant="contained"
                                                                    color="inherit"
                                                                    className={classes.button}
                                                                    startIcon={row.enabled || row.status ? <CheckCircleOutlineIcon style={{ color: green[500] }} /> : <NotInterestedIcon color="secondary" />}
                                                                    onClick={() => handleClickDisabled(row)}
                                                                >
                                                                    {""}
                                                                </Button>}

                                                                {canDelete && <Button
                                                                    variant="contained"
                                                                    color="secondary"
                                                                    className={classes.button}
                                                                    startIcon={<DeleteIcon />}
                                                                    onClick={() => handleClickDelete(row)}
                                                                >
                                                                    {""}
                                                                </Button>}
                                                            </ButtonGroup>
                                                        </Grid>
                                                    </TableCell>
                                                )
                                            }

                                            let value = row[column.id];
                                            let subObject = column.id.split(".")
                                            let subObjectLen = subObject.length

                                            if (1 < subObjectLen) {
                                                value = row[subObject[0]];

                                                for (let i = 1; i < subObjectLen; i++) {
                                                    value = value[subObject[i]]
                                                }
                                            }

                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
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

PageList.propTypes = {
    canEdit: PropTypes.bool,
    canDisable: PropTypes.bool,
    canDelete: PropTypes.bool,

    labelCount: PropTypes.string,
    labelAdd: PropTypes.string,

    columns: PropTypes.array,
    endpoint: PropTypes.func
};

export default PageList;
