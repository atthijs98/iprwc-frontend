export class ProductImage {
  public id?: number;
  public path: string;
  public created_at: Date;
  public updated_at: Date;

  constructor(id: number, path: string, created_at: Date, updated_at: Date) {
    this.id = id;
    this.path = path;
    this.created_at = created_at;
    this.updated_at = updated_at;
  }
}
