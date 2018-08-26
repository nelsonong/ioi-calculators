export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    // console.log(err);
  }
};

export const loadVersion = () => {
  try {
    const version = localStorage.getItem('version');
    if (version === null) {
      return undefined;
    }

    return version;
  } catch (err) {
    return undefined;
  }
};

export const saveVersion = (version) => {
  try {
    localStorage.setItem('version', version);
  } catch (err) {
    // console.log(err);
  }
};
