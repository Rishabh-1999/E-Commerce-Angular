import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { ShoppingCart } from "shared/models/shopping-cart";
import { ShoppingCartService } from "shared/services/shopping-cart.service";

@Component({
  selector: "app-check-out",
  templateUrl: "./check-out.component.html",
  styleUrls: ["./check-out.component.css"]
})
export class CheckOutComponent implements OnInit {
  cart$: Observable<ShoppingCart>;

  constructor(private shoppingCartService: ShoppingCartService) {}

  async ngOnInit() {
    (await this.shoppingCartService.getCart()).subscribe(
      (cart: any) => (this.cart$ = cart)
    );
  }
}
