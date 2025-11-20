export const trimIfNotEmpty = ({ value }: { value: string }) => {
  return value ? value.trim() : null;
};
