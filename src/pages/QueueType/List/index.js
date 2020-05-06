import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

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
    FormControlLabel,
    TextareaAutosize,
} from '@material-ui/core';

// CSUTOM
import GreenSwitch from '../../../components/GreenSwitch'
import PageList from '../../../components/PageList'

// REDUX ACTIONS
import allActions from '../../../_actions/index';

// API
import ApiQueueType from '../../../_services/QueueType';

// MODELS
import QueueTypeEntity from '../../../_models/QueueType'

// Extra
import {
    getFormValidationFromObject,
    getObjectFromFormValidation
} from '../../../_helpers/utils'

const columns = [
    { id: 'name', label: 'Name', minWidth: '100%' },
    { id: 'ACTIONS', label: 'Actions', minWidth: 80, align: 'center' },
];

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

const QueueTypeList = (props) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.currentUser.user);
    const entity = useSelector(state => state.entity.item);

    const [state, setState] = useState();
    const [btnDisabled, setBtnDisabled] = useState(true);

    useEffect(() => {
        setState(getFormValidationFromObject(new QueueTypeEntity(entity), { company: currentUser.company, country: currentUser.company.country }));
        setBtnDisabled(true);
    }, [entity, currentUser]);

    const handleInputChange = name => e => {
        const { value } = e.target;
        const newField = { ...state[name], value: value, error: '', isValid: true, changed: true }

        setBtnDisabled(!validateField(name, { ...state, [name]: newField }));
    }

    const handleCheckboxChange = name => e => {
        const { checked } = e.target;
        const newField = { ...state[name], value: checked, error: '', isValid: true, changed: true }

        setBtnDisabled(!validateField(name, { ...state, [name]: newField }));
    }

    // --> VALIDATOR

    // field validator
    const validateField = (name, form) => {
        let ok = true;

        for (let field in form) {
            const o = form[field];
            if (!o.required) {
                continue;
            }

            form = { ...form, [field]: o.validator(o) }

            if (!form[field].changed) {
                continue;
            }

            ok = ok && (form[field].hasOwnProperty("isValid") && form[field].isValid);
        }

        setState(form);

        return ok
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        ApiQueueType.setEntity(getObjectFromFormValidation(state, entity))
            .then(res => {
                if (!res) {
                    // flash message
                    return;
                }
                else {
                    dispatch(allActions.entityActions.updatedEntity({}))
                }
            })
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
                <PageList
                    canEdit={true}
                    canDisable={true}
                    // canDelete={true}
                    editSamePage={true}
                    columns={columns}
                    labelCount="Queues"
                    labelAdd="Queue"
                    endpoint={ApiQueueType}
                    {...props}
                ></PageList>
            </Grid>
            <Grid item xs={12} md={4}>
                <Card className={classes.root}>
                    <form autoComplete="off" noValidate>
                        <CardHeader
                            title="Queue"
                        />

                        <Divider />

                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        id="name"
                                        label="Name"
                                        name="name"
                                        value={state?.name.value || ''}
                                        onChange={handleInputChange('name')}
                                        margin="dense"
                                        required
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextareaAutosize
                                        style={{ width: '100%' }}
                                        aria-label="Default config"
                                        rowsMin={16}
                                        rowsMax={20}
                                        placeholder="Input default config"
                                        value={state?.config.value || ''}
                                        onChange={handleInputChange('config')}
                                        margin="dense"
                                        required
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <GreenSwitch
                                                checked={state?.enabled.value || false}
                                                onChange={handleCheckboxChange('enabled')}
                                            />
                                        }
                                        label="Enabled"
                                        labelPlacement="start"
                                        style={{ marginTop: "8px", float: 'right' }}
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
            </Grid>
        </Grid>
    )
}

export default QueueTypeList;
