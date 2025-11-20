import { applyDecorators, UseGuards } from '@nestjs/common';
import { Roles } from '.';
import { JwtAuthGuard, RolesGuard } from '../guard';
import { Role } from '../../../common/constants';

export const Auth = (...roles: Role[]) => {
  return applyDecorators(Roles(...roles), UseGuards(JwtAuthGuard, RolesGuard));
};
