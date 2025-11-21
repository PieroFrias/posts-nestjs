import { BaseStatus, PostStatus, GeneralStatus } from '../constants';

export type AllowedStatusEnums = typeof BaseStatus | typeof PostStatus | typeof GeneralStatus;
