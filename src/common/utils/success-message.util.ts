import { GeneralStatus, PostStatus } from '../constants';

export class SuccessMessage {
  static created(entity: string, name: string): string {
    const message = `${entity} '${name}' has been successfully created.`;
    return message;
  }

  static registered(username: string): string {
    const message = `User '${username}' has been successfully registered.`;
    return message;
  }

  static updated(entity: string, entityId: string): string {
    const message = `${entity} with ID '${entityId}' has been successfully updated.`;
    return message;
  }

  static deleted(entity: string, entityId: string): string {
    const message = `${entity} with ID '${entityId}' has been successfully deleted.`;
    return message;
  }

  static statusChanged(
    entity: string,
    entityId: string,
    status: GeneralStatus | PostStatus,
  ): string {
    const message = `Status of ${entity} with ID '${entityId}' has been successfully changed to '${status}'.`;
    return message;
  }
}
