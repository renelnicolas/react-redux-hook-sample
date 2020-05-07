import React, { Fragment, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import {
    ExpansionPanel,
    ExpansionPanelSummary,
    Typography,
    ExpansionPanelDetails,
} from '@material-ui/core';

import {
    ExpandMore as ExpandMoreIcon,
} from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
}));

const ExpansionBox = ({ panels }) => {
    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (e, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <Fragment>
            {panels && panels.map((panel, index) => (
                <ExpansionPanel key={index} expanded={expanded === index} onChange={handleChange(index)} className={classes.root}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                    >
                        <Typography className={classes.heading}>{panel.summary}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {panel.content}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            ))
            }
        </Fragment>
    );
}

export default ExpansionBox;
