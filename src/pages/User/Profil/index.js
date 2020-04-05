import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import {
    Card,
    CardHeader,
    CardContent,
    CardActions,
    Divider,
    Grid,
    Button,
    TextField,
} from '@material-ui/core';

// API
import ApiUser from '../../../_services/User';
import ApiCountry from '../../../_services/Country';
// MODELS
import UserEntity from '../../../_models/User'
import CountryEntity from '../../../_models/Country'
import BreadcrumbPath from '../../../_models/BreadcrumbPath';

// Extra
import {
    emailValidator,
    getFormValidationFromObject,
    getObjectFromFormValidation
} from '../../../_helpers/utils'

// REDUX ACTIONS
import allActions from '../../../_actions/index';

const useStyles = makeStyles(theme => ({
    root: {
        "& .MuiCardHeader-title": {
            color: "#263238",
            fontSize: "16px",
            fontWeight: "500",
            lineHeight: "20px",
            letterSpacing: "-0.05px",
        }
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        float: "right",
    },
    input: {
        margin: theme.spacing(1),
    },
}));

const UserProfil = (props) => {
    const classes = useStyles();

    const { match } = props;

    const dispatch = useDispatch();

    const entity = new UserEntity();
    const breadcrumb = new BreadcrumbPath(match.url, [{ path: '/users', name: 'Users' }, { name: "Profile" }])

    const currentUser = useSelector(state => state.currentUser.user);

    const [state, setState] = useState(getFormValidationFromObject(entity, { company: currentUser.company, country: currentUser.company.country }));
    const [countries, setCountries] = useState([]);
    const [btnDisabled, setBtnDisabled] = useState(true);

    // call once per loading page
    useEffect(() => {
        dispatch(allActions.breadcrumbActions.changeView(breadcrumb))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        ApiUser.getEntity(currentUser.id)
            .then(entity => {
                if (false === entity) {
                    // flash message
                    return;
                }

                setState(getFormValidationFromObject(entity, {}, true));
            });

        ApiCountry.getEntities()
            .then(res => {
                setCountries(res.entities);
            });
    }, [currentUser]);

    // --> EVENT

    const handleInputChange = name => e => {
        const { value } = e.target;

        setBtnDisabled(!validateField(name, { ...state, [name]: { value: value, required: state[name].required } }));
    }

    const handleSelectChange = name => e => {
        const { value } = e.target;

        const entity = new CountryEntity(value);

        setBtnDisabled(!validateField(name, { ...state, [name]: { value: entity, required: state[name].required } }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        ApiUser.setEntity(getObjectFromFormValidation(state, entity))
            .then(res => {
                if (!res) {
                    // flash message
                    return;
                }
            })
    }

    // --> VALIDATOR

    // field validator
    const validateField = (name, form) => {
        const newField = { value: form[name].value, error: '', isValid: true, required: form[name].required };

        let newState = { ...state };

        switch (name) {
            case 'email':
                if (!emailValidator(form.email.value)) {
                    newField.error = 'Does\'t respect the rules';
                    newField.isValid = false;
                }
                break;
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
            case 'country':
                if (null === form.country.value || null === form.country.value.id) {
                    newField.error = 'Cannot be empty';
                    newField.isValid = false;
                }
                break;
            case 'password':
            case 'password_validation':
                if ('' !== form.password.value || '' !== form.password_validation.value) {
                    if (form.password.value !== form.password_validation.value) {
                        newField.error = 'Cannot be distinct';
                        newField.isValid = false;
                    } else { // everything is ok
                        if ('password' === name) {
                            newState = { ...newState, password_validation: { ...form.password_validation, error: '', isValid: true } }
                        } else {
                            newState = { ...newState, password: { ...form.password, error: '', isValid: true } }
                        }
                    }
                }
                break;
            default:
        }

        newState = { ...newState, [name]: newField };

        setState(newState);

        return validateForm(newState)
    }

    // form validator
    const validateForm = (form) => {
        let ok = true;

        for (let cred in form) {
            if ('id' === cred || 'id' === cred || (!form[cred].hasOwnProperty("isValid") && !form[cred].required)) {
                continue;
            }

            ok = ok && (form[cred].hasOwnProperty("isValid") && form[cred].isValid);
        }

        return ok;
    }

    return (
        <Card className={classes.root}>
            <form autoComplete="off" noValidate>
                <CardHeader
                    title="User"
                />

                <Divider />

                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                value={state.email.value || ''}
                                onChange={handleInputChange('email')}
                                margin="dense"
                                required
                                variant="outlined"
                                autoComplete='off'
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="firstName"
                                label="First Name"
                                name="firstName"
                                value={state.firstName.value || ''}
                                onChange={handleInputChange('firstName')}
                                margin="dense"
                                required
                                variant="outlined"
                                autoComplete='off'
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                value={state.lastName.value || ''}
                                onChange={handleInputChange('lastName')}
                                margin="dense"
                                required
                                variant="outlined"
                                autoComplete='off'
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                value={state.phone.value || ''}
                                onChange={handleInputChange('phone')}
                                margin="dense"
                                variant="outlined"
                                autoComplete='off'
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="country"
                                name="country"
                                label="Country"
                                margin="dense"
                                onChange={handleSelectChange('country')}
                                required
                                select
                                // eslint-disable-next-line react/jsx-sort-props
                                SelectProps={{ native: true }}
                                // https://material-ui.com/components/text-fields/#shrink
                                InputLabelProps={{ shrink: true }}
                                value={state.country.value.id || ''}
                                variant="outlined"
                            >
                                {countries.map((row, index) => (
                                    <option key={`${index}-${row.id}`} value={row.id}>{row.name} {row.Iso}</option>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="password"
                                label="Password"
                                name="password"
                                type="password"
                                value={state.password.value || ''}
                                onChange={handleInputChange('password')}
                                margin="dense"
                                variant="outlined"
                                autoComplete='off'
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="password_validation"
                                label="Password"
                                name="password_validation"
                                type="password"
                                value={state.password_validation.value || ''}
                                onChange={handleInputChange('password_validation')}
                                margin="dense"
                                variant="outlined"
                                autoComplete='off'
                            />
                        </Grid>
                    </Grid>
                </CardContent>

                <Divider />

                <CardActions
                    className={classes.button}
                >
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={btnDisabled}
                    >
                        Save details
                </Button>
                </CardActions>
            </form>
        </Card>
    )
}

export default UserProfil;
