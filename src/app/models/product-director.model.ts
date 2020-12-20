export class ProductDirector {
  public id?: number;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;

  // tslint:disable-next-line:variable-name
  constructor(id: number, name: string, created_at: Date, updated_at: Date) {
    this.id = id;
    this.name = name;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }
}
