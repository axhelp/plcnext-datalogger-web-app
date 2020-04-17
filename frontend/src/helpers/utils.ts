export const getDeviceHostAddress = () => {
  return process.env.NODE_ENV === `development`
      ? `http://localhost:3000`
      : ``;
};

export const addMinutes = (date: Date, minutes: number) => {
  const result = new Date(date);
  result.setMinutes(result.getMinutes() + minutes);
  return result;
};
