
const initialState = {
    opened: false,
};

const layoutDrawer = (state = initialState, action) => {
    switch (action.type) {
        case "OPEN_MENU":
            return { opened: true }
        case "CLOSE_MENU":
        default:
            return { opened: false }
    }
}

export default layoutDrawer;
