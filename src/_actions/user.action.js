const setUser = (user) => {
    return {
        type: "SET_USER",
        user: user
    }
}

const logOut = () => {
    return {
        type: "LOG_OUT"
    }
}

export default {
    setUser,
    logOut,
}
