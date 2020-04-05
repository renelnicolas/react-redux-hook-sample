import React, { Fragment } from 'react';
import { Switch, Route } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';

import BreadcrumbThread from '../../../components/BreadcrumbThread';

import { routes } from '../../../_constants/menu'


const useStyles = makeStyles(theme => ({
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(1),
        minHeight: window.innerHeight - 67,
        height: "100%",
    },
}));

const switchRoutes = (
    <Switch>
        {routes.map((prop, key) => {
            if (prop.hasOwnProperty('path')) {
                return (
                    <Route
                        exact={prop.exact}
                        path={prop.path}
                        key={key}
                        render={props => <prop.component {...props} />}
                    />
                );
            }

            return (
                <Route
                    component={prop.component}
                    key={key}
                />
            );
        })}
    </Switch>
);

const MainWrapperContainer = (props) => {
    const classes = useStyles();

    return (
        <Fragment>
            <main className={classes.content}>
                <div className={classes.toolbar} />

                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <BreadcrumbThread />
                    </Grid>

                    <Grid item xs={12}>
                        <div className={classes.content}>
                            <div className={classes.container}>
                                <Switch>
                                    {switchRoutes}
                                </Switch>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </main>
        </Fragment>
    )
}

export default MainWrapperContainer;
