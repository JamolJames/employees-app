export const query = async (query, options = {}) =>
    await fetch(`${process.env.REACT_APP_BASE_URL}/api/${query}`, options)
