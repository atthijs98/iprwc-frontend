export class User {
  id: number;
  uuid: string;
  email: string;
  name: string;
  privilege: number;
  authToken: string;
  position: number;

  constructor(id: number, uuid: string, email: string, name: string, privilege: number, authToken: string, position: number) {
    this.id = id;
    this.uuid = uuid;
    this.email = email;
    this.name = name;
    this.privilege = privilege;
    this.authToken = authToken;
    this.position = position;
  }
}
