export const checkJSON = (str) => {
    let isValid = true;

    try {
        JSON.parse(str);
    } catch {
        return false;
    }

    return isValid;
}