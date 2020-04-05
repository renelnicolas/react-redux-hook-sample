const openMenu = () => {
    return {
        type: "OPEN_MENU"
    }
}

const closeMenu = () => {
    return {
        type: "CLOSE_MENU"
    }
}

export default {
    openMenu,
    closeMenu,
}
