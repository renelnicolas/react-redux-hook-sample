import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormHelperText, FormControl } from '@material-ui/core';

import Authentication from '../../_services/Authentication'
import { isAuth } from '../../_helpers/auth'

import allActions from '../../_actions/index';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const SignIn = () => {
    const classes = useStyles();

    const history = useHistory();
    const dispatch = useDispatch();

    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    });

    const [btnDisabled, setBtnDisabled] = useState(true);

    const [formError, setFormError] = useState('');

    useEffect(() => {
        const isValid = isAuth();

        if (isValid) {
            history.push(`/`)
        }

        return () => { }
    }, [history]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const newCredentials = { ...credentials, [name]: value };

        setCredentials(newCredentials);

        if ('' !== newCredentials.email && '' !== newCredentials.password) {
            setBtnDisabled(false);
            return;
        }

        setBtnDisabled(true);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        Authentication.signIn(credentials)
            .then(res => {
                if (false === res) {
                    setFormError("my error");
                    return;
                }

                dispatch(allActions.userActions.setUser(res))

                history.push(`/`)
            })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                {formError && <FormControl className={classes.formControlError} error>
                    <FormHelperText>{formError}</FormHelperText>
                </FormControl>}

                <form className={classes.form} noValidate>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleInputChange}
                        value={credentials.email}
                    />

                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleInputChange}
                        value={credentials.password}
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        disabled={btnDisabled}
                    >
                        Sign In
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link href="/forgot_password" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>

                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default SignIn;
