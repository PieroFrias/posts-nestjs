export class SuccesMessage {
  static created(entity: string, name: string): string {
    const message = `${entity} '${name}' has been successfully created.`;
    return message;
  }

  static registered(username: string): string {
    const message = `User '${username}' has been successfully registered.`;
    return message;
  }
}
