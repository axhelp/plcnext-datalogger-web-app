export const parseIntValue = (strValue: string, defaultValue: number): number => {
    const parsed = parseInt(strValue);
    if (isNaN(parsed)) {
        return defaultValue;
    }
    return parsed;
};

export const parseDate = (strValue: string, defaultDate: Date): Date => {
    const parsedDate = new Date(strValue);
    if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
        return parsedDate;
    }
    return defaultDate;
};

export const addMinutes = (date: Date, minutes: number) => {
    const result = new Date(date);
    result.setMinutes(result.getMinutes() + minutes);
    return result;
};
