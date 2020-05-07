import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
    FormControlLabel,
    TextareaAutosize
} from '@material-ui/core';

// CSUTOM
import GreenSwitch from '../../../components/GreenSwitch'
import BreadcrumbPath from '../../../_models/BreadcrumbPath';

// API
import ApiQueueScheduler from '../../../_services/QueueScheduler';
import ApiQueueType from '../../../_services/QueueType';

// MODELS
import CompanyEntity from '../../../_models/Company'
import QueueSchedulerEntity from '../../../_models/QueueScheduler';
import QueueTypeEntity from '../../../_models/QueueType'

// Extra
import {
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

const Edit = (props) => {
    const classes = useStyles();

    const { match } = props;

    const dispatch = useDispatch();
    const history = useHistory();

    const entity = new QueueSchedulerEntity();
    const breadcrumb = new BreadcrumbPath(match.url, [{ path: '/queue/schedulers', name: 'Queue - Scheduler' }, { name: "Edit" }])

    const currentUser = useSelector(state => state.currentUser.user);

    const [state, setState] = useState(getFormValidationFromObject(entity));
    const [queuesType, setQueuesType] = useState([]);
    const [btnDisabled, setBtnDisabled] = useState(true);

    // call once per loading page
    useEffect(() => {
        dispatch(allActions.breadcrumbActions.changeView(breadcrumb))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (0 < match.params.id) {
            ApiQueueScheduler.getEntity(match.params.id)
                .then(entity => {
                    if (false === entity) {
                        // flash message
                        return;
                    }

                    setState(getFormValidationFromObject(entity, {}, true));
                });
        }

        ApiQueueType.getEntities()
            .then(res => {
                setQueuesType(res.entities);
            });
    }, [match.params.id, currentUser]);

    // --> EVENT

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

    const handleSelectChange = name => e => {
        const { value } = e.target;

        let entity;

        switch (name) {
            case 'queue_type':
                entity = new QueueTypeEntity({ id: "true" === value ? null : Number(value) });
                break;
            case 'company':
                entity = new CompanyEntity({ id: "true" === value ? null : Number(value) });
                break;
            default:
                // unknown to update
                return;
        }

        const newField = { ...state[name], value: entity, error: '', isValid: true, changed: true }

        setBtnDisabled(!validateField(name, { ...state, [name]: newField }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        ApiQueueScheduler.setEntity(getObjectFromFormValidation(state, entity))
            .then(res => {
                if (!res) {
                    // flash message
                    return;
                }

                history.push(`/queue/schedulers`);
            })
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

    return (
        <Card className={classes.root}>
            <form autoComplete="off" noValidate>
                <CardHeader
                    title="Queue Scheduler"
                />

                <Divider />

                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
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

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="url"
                                label="URL"
                                name="url"
                                value={state?.url.value || ''}
                                onChange={handleInputChange('url')}
                                margin="dense"
                                required
                                variant="outlined"
                            />
                        </Grid>

                        <Grid item xs={12} md={6}>
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

                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                id="queue_type"
                                name="queue_type"
                                label="Queue Type"
                                margin="dense"
                                onChange={handleSelectChange('queue_type')}
                                required
                                select
                                // eslint-disable-next-line react/jsx-sort-props
                                SelectProps={{ native: true }}
                                // https://material-ui.com/components/text-fields/#shrink
                                InputLabelProps={{ shrink: true }}
                                value={state?.queue_type.value.id || ''}
                                variant="outlined"
                            >
                                <option value />

                                {queuesType.map((row, index) => (
                                    <option key={`${index}-${row.id}`} value={row.id}>{row.name}</option>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <GreenSwitch
                                        checked={state.enabled.value}
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
    );
};

export default Edit;
