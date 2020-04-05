import React, { Fragment } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import HeaderAppBar from './Header';
import MenuDrawer from './Menu';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    grow: {
        flexGrow: 1,
    },
}));

const Layout = (props) => {
    const classes = useStyles();

    return (
        <Fragment>
            <div className={classes.root}>
                <CssBaseline />

                <HeaderAppBar></HeaderAppBar>

                <MenuDrawer></MenuDrawer>
            </div>
        </Fragment>
    );
}

export default Layout;
