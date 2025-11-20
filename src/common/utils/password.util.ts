import * as bcryptjs from 'bcryptjs';
import { ErrorMessage } from '.';

export const encodePassword = async (password: string): Promise<string> => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

export const compareHashedPassword = async (
  password: string,
  userPassword: string,
): Promise<boolean> => {
  return await bcryptjs.compare(password, userPassword);
};

export const compareConfirmPassword = (password: string, confirmPassword: string) => {
  password !== confirmPassword && ErrorMessage.noMatchConfirmPassword();
};

export const compareCurrentPassword = (currentPassword: string, userPassword: string) => {
  const isMatch = compareHashedPassword(currentPassword, userPassword);

  !isMatch && ErrorMessage.noMatchPassword();
};
