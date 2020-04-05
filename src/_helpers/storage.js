

export const setItem = (name, item) => {
    localStorage.setItem(name, JSON.stringify(item));
}

export const getItem = (name) => {
    const item = localStorage.getItem(name);

    if (!item) {
        return null;
    }

    return JSON.parse(item);
}

export const removeItem = (name) => {
    localStorage.removeItem(name);
}

export const clearItems = () => {
    localStorage.clear();
}
