import { User } from '../../users/entities';

export interface RegisterResponse {
  data: User;
  message: string;
}

export interface LoginResponse {
  data: User;
  token: string;
}
