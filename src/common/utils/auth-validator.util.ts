import { ErrorMessage } from './error-message.util';
import { Role } from '../constants';

export const validateAuthUser = (userId: string, authUserId: string, role: Role) => {
  const isAdmin = role === Role.ADMIN;
  const isSameUser = userId === authUserId;

  if (authUserId && !isSameUser && !isAdmin) ErrorMessage.notAuthorized();
};

export const validateAdminRole = (role: Role) => {
  role === Role.ADMIN && ErrorMessage.notAuthorized();
};
