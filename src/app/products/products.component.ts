import { ShoppingCartService } from "./../shopping-cart.service";
import { ActivatedRoute } from "@angular/router";
import { Product } from "./../models/products";
import { ProductService } from "./../product.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { map, switchMap } from "rxjs/operators";
import { ShoppingCart } from "../models/shopping-cart";
import { Observable } from "rxjs";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products: any = [];
  category;
  filteredProduct: Product[] = [];
  cart$: Observable<ShoppingCart>;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) {}

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();

    this.populateProducts();
  }

  private populateProducts() {
    this.productService
      .getAll()
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => ({ $key: a.key, ...a.payload.val() }))),
        switchMap((res: Product[]) => {
          this.products = res;
          return this.route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get("category");
        this.applyFilter();
      });
  }

  private applyFilter() {
    this.filteredProduct = this.category
      ? this.products.filter(p => p.category === this.category)
      : this.products;
  }
}
