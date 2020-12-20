import {ProductImage} from './product-image.model';
import {ProductDirector} from './product-director.model';

export class Product {
  public id: number;
  public enTitle: string;
  public originalTitle?: string;
  public romanizedOriginalTitle: string;
  public runtime: string;
  public poster: string;
  public plot: string;
  public year: string;
  public price: number;
  public directors: ProductDirector[];
  public images: ProductImage[];
  public trailer: string;
  public createdAt?: string;
  public updatedAt?: string;

  // tslint:disable-next-line:variable-name
  constructor(id: number, en_title: string, original_title: string, romanized_original_title: string, runtime: string, poster: string,
              plot: string, year: string, price: number, trailer: string, directors: ProductDirector[], images: ProductImage[], created_at: string, updated_at: string) {
    this.id = id;
    this.enTitle = en_title;
    this.originalTitle = original_title;
    this.romanizedOriginalTitle = romanized_original_title;
    this.runtime = runtime;
    this.poster = poster;
    this.plot = plot;
    this.year = year;
    this.price = price;
    this.trailer = trailer;
    this.directors = directors;
    this.images = images;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }
}
