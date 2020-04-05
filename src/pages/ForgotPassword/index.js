import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

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
import { emailValidator } from '../../_helpers/utils'

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
        marginTop: theme.spacing(3),
    },
    formControl: {
        width: '100%',
    },
    formControlError: {
        margin: theme.spacing(1),
        width: '100%',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const ForgotPassword = () => {
    const classes = useStyles();

    const history = useHistory();

    useEffect(() => {
        const isValid = isAuth();

        if (isValid) {
            history.push(`/`)
        }

        return () => { }
    }, [history]);

    const [email, setEmail] = useState({
        value: ''
    });

    const [formError, setFormError] = useState('');

    const handleInputChange = (e) => {
        const { value } = e.target;

        const newEmail = { value: value, error: '', isValid: true };

        if (!emailValidator(newEmail.value)) {
            newEmail.error = 'Is not an email';
            newEmail.isValid = false;
        }

        setEmail(newEmail);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        Authentication.forgotPassword(email.value)
            .then(res => {
                if (!res) {
                    setFormError("my error");
                    return;
                }

                history.push(`/login`)
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
                    Forgot Password ?
                </Typography>

                {formError && <FormControl className={classes.formControlError} error>
                    <FormHelperText>{formError}</FormHelperText>
                </FormControl>}

                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl
                                className={classes.formControl}
                                error={!email.isValid}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleInputChange}
                                    value={email.value}
                                />
                                {false === email.isValid && <FormHelperText>{email.error}</FormHelperText>}
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        disabled={true === email.isValid ? false : true}
                    >
                        Send Me
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            <Link href="/signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>

                        <Grid item>
                            <Link href="/signup" variant="body2">
                                Don't have an account? Sign Up
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default ForgotPassword;
