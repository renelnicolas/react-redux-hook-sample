import React from 'react';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(1, 2),
    },
    link: {
        display: 'flex',
    },
    icon: {
        marginRight: theme.spacing(0.5),
        width: 20,
        height: 20,
    },
}));

const BreadcrumbThread = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const breadcrumb = useSelector(state => state.breadcrumb);

    const handleClick = path => event => {
        event.preventDefault();

        history.push(path)
    }

    return (
        <Paper elevation={0} className={classes.root}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                <Link
                    key="Home"
                    color="inherit"
                    href="/"
                    onClick={handleClick("/")}
                >
                    Home
                </Link>

                {breadcrumb.depth && breadcrumb.depth.map(bc => {
                    if (!bc.hasOwnProperty('path')) {
                        return (
                            <Typography key={bc.name} color="textPrimary" className={classes.link}>{bc.name}</Typography>
                        )
                    }

                    return (
                        <Link
                            key={bc.name}
                            color="inherit"
                            href={bc.path}
                            onClick={handleClick(bc.path)}
                        >
                            {bc.name}
                        </Link>
                    )
                })}
            </Breadcrumbs>
        </Paper>
    )
}

export default BreadcrumbThread;
