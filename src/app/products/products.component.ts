import { ActivatedRoute } from "@angular/router";
import { Product } from "./../models/products";
import { ProductService } from "./../product.service";
import { Component, OnInit } from "@angular/core";
import { map, switchMap } from "rxjs/operators";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.css"]
})
export class ProductsComponent implements OnInit {
  products: any = [];
  category;
  filteredProduct: Product[] = [];

  constructor(route: ActivatedRoute, productService: ProductService) {
    productService
      .getAll()
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => ({ $key: a.key, ...a.payload.val() }))),
        switchMap((res: Product[]) => {
          this.products = res;
          return route.queryParamMap;
        })
      )
      .subscribe(params => {
        this.category = params.get("category");

        this.filteredProduct = this.category
          ? this.products.filter(p => p.category === this.category)
          : this.products;
      });
  }
  ngOnInit(): void {}
}
