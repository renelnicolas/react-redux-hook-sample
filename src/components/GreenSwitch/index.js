
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';

import {
    Switch
} from '@material-ui/core';

const GreenSwitch = withStyles({
    switchBase: {
        color: green[300],
        '&$checked': {
            color: green[500],
        },
        '&$checked + $track': {
            backgroundColor: green[500],
        },
    },
    // Could not find the referenced rule "checked" | "track" in "WithStyles(ForwardRef(Switch))".
    checked: {},
    track: {},
})(Switch);

export default GreenSwitch;
