import { In, Not } from 'typeorm';
import { ErrorMessage } from '.';
import { BaseStatus, GeneralStatus, PostStatus, Role } from '../constants';
import { AllowedStatusEnums } from '../types';

export const getStatusCondition = (
  status: BaseStatus,
  role: Role,
  type: AllowedStatusEnums,
  entity: string,
) => {
  if (!status) return getStatusConditionByRole(role, type);

  const validStatuses = getValidStatusesByRoleAndType(role, type);

  !validStatuses.includes(status) && ErrorMessage.notFoundByFilter(entity);

  return { status };
};

export const getStatusConditionByRole = (role: Role, type: AllowedStatusEnums) => {
  const isAdmin = role === Role.ADMIN;
  const shouldIncludeDraft = type === PostStatus && role === Role.PUBLISHER;

  if (isAdmin) return {};

  let exclusionStatus = getExclusionStatusByType(type);

  shouldIncludeDraft &&
    (exclusionStatus = exclusionStatus.filter((status) => status !== BaseStatus.DRAFT));

  return { status: Not(In(exclusionStatus)) };
};

export const getValidStatusesByRoleAndType = (
  role: Role,
  type: AllowedStatusEnums,
): BaseStatus[] => {
  const isPostStatus = type === PostStatus;
  const isAdmin = role === Role.ADMIN;
  const isPublisher = role === Role.PUBLISHER;

  if (isAdmin) return Object.values(BaseStatus);

  const validStatuses = [BaseStatus.ACTIVE, BaseStatus.PUBLISHED];

  isPublisher && isPostStatus && validStatuses.push(BaseStatus.DRAFT);

  return validStatuses;
};

export const getExclusionStatusByType = (type: AllowedStatusEnums): BaseStatus[] => {
  const exclusionMap = new Map<AllowedStatusEnums, BaseStatus[]>([
    [PostStatus, [BaseStatus.DRAFT]],
    [GeneralStatus, [BaseStatus.INACTIVE]],
  ]);

  return exclusionMap.get(type) || [];
};
