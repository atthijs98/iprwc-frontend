import {Subject} from 'rxjs';
import {Item} from '../models/item-model';
import {Product} from '../models/product.model';

export class ShoppingListService {
  itemsChanged = new Subject<Item[]>();
  startedEditing = new Subject<number>();

  private items: Item[] = [];


  getProducts() {
    return this.items.slice();
  }

  getProduct(id: number) {
    for (let i = 0; i < this.items.length; i++) {
      if (id === this.items[i].id) {
        return this.items[i];
      }
    }
  }

  addProduct(product: Product) {
    const newItem = new Item(Math.floor(Math.random() * 1000), 1, product)
    this.items.push(newItem);
    this.itemsChanged.next(this.items.slice());
  }

  deleteProduct(id: number) {
    for (let i = 0; i < this.items.length; i++) {
      if (id === this.items[i].id) {
        this.items.splice(i, 1);
        this.itemsChanged.next(this.items.slice());
      }
    }
  }

  updateProduct(id: number, newItem: Item) {
    for (let i = 0; i < this.items.length; i++) {
      if (id === this.items[i].id) {
        this.items[i] = newItem;
        this.itemsChanged.next(this.items.slice());
      }
    }
  }
}
