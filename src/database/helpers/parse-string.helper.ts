export const parseString = (value: string) => {
  if (!value) return 'NULL';

  const formattedString = `'${value.replace(/'/g, "''")}'`;

  return formattedString;
};
