import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FormHelperText, FormControl } from '@material-ui/core';

import Authentication from '../../_services/Authentication'
import { isAuth } from '../../_helpers/auth'
import { emailValidator, passwordStrengthValidator } from '../../_helpers/utils'

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

const SignUp = () => {
    const classes = useStyles();

    const history = useHistory();

    useEffect(() => {
        const isValid = isAuth();

        if (isValid) {
            history.push(`/`)
        }

        return () => { }
    }, [history]);

    const [credentials, setCredentials] = useState({
        firstName: { value: '' },
        lastName: { value: '' },
        email: { value: '' },
        password: { value: '' },
        acceptTerm: { value: false },
    });

    const [btnDisabled, setBtnDisabled] = useState(true);

    const [formError, setFormError] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setBtnDisabled(!validateField(name, { ...credentials, [name]: { value: value } }));
    }

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;

        setBtnDisabled(!validateField(name, { ...credentials, [name]: { value: checked, isValid: checked } }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        Authentication.signUp(credentials)
            .then(res => {
                if (!res) {
                    setFormError("my error");
                    return;
                }

                history.push(`/login`)
            })
    }

    const validateField = (name, form) => {
        const newField = { value: form[name].value, error: '', isValid: true };

        switch (name) {
            case 'firstName':
                if ('' === form.firstName.value) {
                    newField.error = 'Cannot be empty';
                    newField.isValid = false;
                }
                break;
            case 'lastName':
                if ('' === form.lastName.value) {
                    newField.error = 'Cannot be empty';
                    newField.isValid = false;
                }
                break;
            case 'email':
                if (!emailValidator(form.email.value)) {
                    newField.error = 'Is not an email';
                    newField.isValid = false;
                }
                break;
            case 'password':
                if (!passwordStrengthValidator(form.password.value)) {
                    newField.error = 'Does\'t respect the rules';
                    newField.isValid = false;
                }
                break;
            default:
        }

        const newCredentials = { ...credentials, [name]: newField };

        setCredentials(newCredentials);

        return validateForm(newCredentials)
    }

    const validateForm = (form) => {
        let ok = true;

        for (let cred in form) {
            ok = ok && (form[cred].hasOwnProperty("isValid") && form[cred].isValid);
        }

        return ok;
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>

                {formError && <FormControl className={classes.formControlError} error>
                    <FormHelperText>{formError}</FormHelperText>
                </FormControl>}

                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <FormControl
                                className={classes.formControl}
                                error={!credentials.firstName.isValid}>
                                <TextField
                                    autoComplete="fname"
                                    name="firstName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                    onChange={handleInputChange}
                                    value={credentials.firstName.value}
                                />
                                {false === credentials.firstName.isValid && <FormHelperText>{credentials.firstName.error}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <FormControl
                                className={classes.formControl}
                                error={!credentials.lastName.isValid}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="lname"
                                    onChange={handleInputChange}
                                    value={credentials.lastName.value}
                                />
                                {false === credentials.lastName.isValid && <FormHelperText>{credentials.lastName.error}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl
                                className={classes.formControl}
                                error={!credentials.email.isValid}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                    onChange={handleInputChange}
                                    value={credentials.email.value}
                                />
                                {false === credentials.email.isValid && <FormHelperText>{credentials.email.error}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl
                                className={classes.formControl}
                                error={!credentials.password.isValid}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    onChange={handleInputChange}
                                    value={credentials.password.value}
                                    helperText="A lowercase letter, A capital letter, A number, A special character, Minimun 8 cahracters."
                                />
                                {false === credentials.password.isValid && <FormHelperText>{credentials.password.error}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox
                                    value="acceptTerm"
                                    color="primary"
                                    name="acceptTerm"
                                    id="acceptTerm"
                                    onChange={handleCheckboxChange}
                                    checked={credentials.acceptTerm.value}
                                />}
                                label="I accept term of use."
                            />
                        </Grid>
                    </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                        disabled={btnDisabled}
                    >
                        Sign Up
                    </Button>

                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default SignUp;
