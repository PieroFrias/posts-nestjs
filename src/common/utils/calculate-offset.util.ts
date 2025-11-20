export const calculateOffset = (page: number, pageSize: number): number => {
  const offset = (page - 1) * pageSize;
  return offset;
};
