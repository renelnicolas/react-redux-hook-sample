const selectEntity = (item) => {
    return {
        type: "SELECT_ENTITY",
        item: item
    }
}

const updatedEntity = (item) => {
    return {
        type: "UPDATED_ENTITY",
        item: item
    }
}

export default {
    selectEntity,
    updatedEntity,
}
