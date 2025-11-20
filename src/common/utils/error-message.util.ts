import { BadRequestException, ConflictException, UnauthorizedException } from '@nestjs/common';

export class ErrorMessage {
  static alreadyRegistered(property: string, value: string): never {
    const message = `${property} '${value}' is already registered.`;
    throw new ConflictException(message);
  }

  static noMatchPassword(): never {
    const message = `The password does not match the current password.`;
    throw new BadRequestException(message);
  }

  static noMatchConfirmPassword(): never {
    const message = `The confirmation password does not match the password.`;
    throw new BadRequestException(message);
  }

  static invalidCredentials(): never {
    const message = 'Please check your credentials.';
    throw new BadRequestException(message);
  }

  static invalidToken(): never {
    const message = 'Invalid token.';
    throw new UnauthorizedException(message);
  }

  static inactiveAccount(): never {
    const message = `Inactive account, please contact the administrator.`;
    throw new UnauthorizedException(message);
  }

  static passwordTooWeak(): string {
    const message = 'password must contain at least one uppercase, one lowercase and one number.';
    return message;
  }
}
