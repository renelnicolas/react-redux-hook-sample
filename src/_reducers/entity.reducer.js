const initialState = {
    item: {},
    reset: false,
};

const currentEntity = (state = initialState, action) => {
    switch (action.type) {
        case "SELECT_ENTITY":
            return {
                ...state,
                reset: false,
                item: action.item,
            }
        case "UPDATED_ENTITY":
            return {
                reset: true
            }
        default:
            return state
    }
}

export default currentEntity;
