export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return serializedState;
    } catch (err) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        localStorage.setItem('state', state);
    } catch (err) {
        console.log(err);
    }
}