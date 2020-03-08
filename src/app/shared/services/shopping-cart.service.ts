import "rxjs/add/operator/take";

import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Product } from "shared/models/products";
import { ShoppingCart } from "shared/models/shopping-cart";
import { ShoppingCartItem } from "shared/models/shopping-cart-item";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.db
      .object("/shopping-carts/" + cartId)
      .valueChanges()
      .pipe(
        map(
          (shoppingCart: {
            items: { [productId: string]: ShoppingCartItem };
          }) => new ShoppingCart(shoppingCart.items)
        )
      );
  }

  async addToCart(product: Product) {
    this.updateItem(product, 1);
  }

  async removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.db.object("/shopping-carts/" + cartId + "/items").remove();
  }

  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreated: new Date().getTime()
    });
  }

  private getItem(cartId: string, productId: string) {
    return this.db.object(`/shopping-carts/${cartId}/items/${productId}`);
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;

    let result = await this.create();
    localStorage.setItem("cartId", result.key);
    return result.key;
  }

  async updateItem(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    let items$: any = this.getItem(cartId, product.$key);
    items$
      .valueChanges()
      .take(1)
      .subscribe(item => {
        let temp: Product = product;
        if (!item) {
          items$.set({
            category: product.category,
            imageUrl: product.imageUrl,
            price: product.price,
            title: product.title,
            quantity: 1
          });
        } else {
          let quantity = (item.quantity || 0) + change;
          if (quantity === 0) items$.remove();
          else
            items$.update({
              quantity: item.quantity + change
            });
        }
      });
  }
}
