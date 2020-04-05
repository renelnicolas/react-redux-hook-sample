import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import { Drawer, List, Divider, IconButton, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

// @material-ui/icons
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import MainWrapperContainer from '../Container'

import { routes } from '../../../_constants/menu'

import allActions from '../../../_actions/index';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    }
}));

const MenuDrawer = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch()

    const { opened } = useSelector(state => state.layoutDrawer);

    const handleDrawerClose = () => {
        dispatch(allActions.layoutDrawerActions.closeMenu())
    }

    const handleClick = (e) => {
        // color select menu
    }

    return (
        <Fragment>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: opened,
                    [classes.drawerClose]: !opened,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: opened,
                        [classes.drawerClose]: !opened,
                    }),
                }}
                open={opened}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {routes.map((route, index) => (
                        route.hasOwnProperty('path') && route.hasOwnProperty('icon') ?
                            <ListItem button key={index} component={Link} to={route.path} onClick={handleClick}>
                                <ListItemIcon><route.icon /></ListItemIcon>
                                <ListItemText primary={route.name} />
                            </ListItem>
                            : ''
                    ))}
                </List>
            </Drawer>

            <MainWrapperContainer></MainWrapperContainer>
        </Fragment>
    )
}

export default MenuDrawer;
