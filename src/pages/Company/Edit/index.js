import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom';

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
    FormControlLabel
} from '@material-ui/core';

// CSUTOM
import GreenSwitch from '../../../components/GreenSwitch'

// API
import ApiCompany from '../../../_services/Company';
import ApiCountry from '../../../_services/Country';
// MODELS
import CompanyEntity from '../../../_models/Company'
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

const CompanyEdit = (props) => {
    const classes = useStyles();

    const { match } = props;

    const dispatch = useDispatch();
    const history = useHistory();

    const entity = new CompanyEntity();
    const breadcrumb = new BreadcrumbPath(match.url, [{ path: '/companies', name: 'Companies' }, { name: "Edit" }])

    const [btnDisabled, setBtnDisabled] = useState(true);
    const [state, setState] = useState(getFormValidationFromObject(entity));
    const [countries, setCountries] = useState([]);

    // call once per loading page
    useEffect(() => {
        dispatch(allActions.breadcrumbActions.changeView(breadcrumb))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (match.params.hasOwnProperty("id") && 0 < match.params.id) {
            ApiCompany.getEntity(match.params.id)
                .then(entity => {
                    if (false === entity) {
                        // flash message
                        return;
                    }

                    setState(getFormValidationFromObject(entity, {}, true));
                });
        }

        ApiCountry.getEntities()
            .then(res => {
                setCountries(res.entities);
            });
    }, [match.params]);

    const handleInputChange = name => e => {
        const { value } = e.target;

        setBtnDisabled(!validateField(name, { ...state, [name]: { value: value, required: state[name].required } }));
    }

    const handleCheckboxChange = name => e => {
        const { checked } = e.target;

        setBtnDisabled(!validateField(name, { ...state, [name]: { value: checked, required: state[name].required } }));
    }

    const handleSelectChange = name => e => {
        const { value } = e.target;

        setBtnDisabled(!validateField(name, { ...state, [name]: { value: { ...(new CountryEntity()), id: value }, required: state[name].required } }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        ApiCompany.setEntity(getObjectFromFormValidation(state, entity))
            .then(res => {
                if (!res) {
                    // flash message
                    return;
                }

                history.push(`/companies`);
            })
    }

    // --> VALIDATOR

    // field validator
    const validateField = (name, form) => {
        const newField = { value: form[name].value, error: '', isValid: true, required: form[name].required };

        switch (name) {
            case 'name':
                if ('' === form.name.value) {
                    newField.error = 'Cannot be empty';
                    newField.isValid = false;
                }
                break;
            case 'contact_email':
                if (!emailValidator(form.contact_email.value)) {
                    newField.error = 'Does\'t respect the rules';
                    newField.isValid = false;
                }
                break;
            case 'rcs':
                if ('' === form.rcs.value) {
                    newField.error = 'Cannot be empty';
                    newField.isValid = false;
                }
                break;
            case 'vat':
                if ('' === form.vat.value) {
                    newField.error = 'Cannot be empty';
                    newField.isValid = false;
                }
                break;
            case 'address':
                if ('' === form.address.value) {
                    newField.error = 'Cannot be empty';
                    newField.isValid = false;
                }
                break;

            case 'city':
                if ('' === form.city.value) {
                    newField.error = 'Cannot be empty';
                    newField.isValid = false;
                }
                break;

            case 'zip_code':
                if ('' === form.zip_code.value) {
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
            default:
        }

        const newState = { ...state, [name]: newField };

        setState(newState);

        return validateForm(newState)
    }

    // form validator
    const validateForm = (form) => {
        let ok = true;

        for (let cred in form) {
            if ('id' === cred || (!form[cred].hasOwnProperty("isValid") && !form[cred].required)) {
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
                    title="Company"
                />

                <Divider />

                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="name"
                                label="Name"
                                name="name"
                                value={state.name.value || ''}
                                onChange={handleInputChange('name')}
                                margin="dense"
                                required
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="contact_email"
                                label="Contact (email)"
                                name="contact_email"
                                value={state.contact_email.value || ''}
                                onChange={handleInputChange('contact_email')}
                                margin="dense"
                                required
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="rcs"
                                label="RCS"
                                name="rcs"
                                value={state.rcs.value || ''}
                                onChange={handleInputChange('rcs')}
                                margin="dense"
                                required
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="vat"
                                label="VAT"
                                name="vat"
                                value={state.vat.value || ''}
                                onChange={handleInputChange('vat')}
                                margin="dense"
                                required
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="address"
                                label="Address"
                                name="address"
                                value={state.address.value || ''}
                                onChange={handleInputChange('address')}
                                margin="dense"
                                required
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="city"
                                label="City"
                                name="city"
                                value={state.city.value || ''}
                                onChange={handleInputChange('city')}
                                margin="dense"
                                required
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <TextField
                                fullWidth
                                id="zip_code"
                                label="Zip / Postal code"
                                name="zip_code"
                                value={state.zip_code.value || ''}
                                onChange={handleInputChange('zip_code')}
                                margin="dense"
                                required
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={5}>
                            <TextField
                                fullWidth
                                id="country"
                                name="country"
                                label="Country"
                                margin="dense"
                                onChange={handleSelectChange('country')}
                                required
                                select
                                SelectProps={{ native: true }}
                                value={state.country.value.id || ''}
                                variant="outlined"
                            >
                                <option value />

                                {countries.map((row, index) => (
                                    <option key={`${index}-${row.id}`} value={row.id}>{row.name} {row.iso}</option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12} sm={12} md={5}>
                            <TextField
                                fullWidth
                                id="phone"
                                label="Phone Number"
                                name="phone"
                                value={state.phone.value || ''}
                                onChange={handleInputChange('phone')}
                                margin="dense"
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} sm={12} md={2}>
                            <FormControlLabel
                                control={
                                    <GreenSwitch
                                        checked={state.enabled.value}
                                        onChange={handleCheckboxChange('enabled')}
                                    />
                                }
                                label="Enabled"
                                labelPlacement="start"
                                style={{ marginTop: "8px" }}
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
    );
};

export default CompanyEdit;
