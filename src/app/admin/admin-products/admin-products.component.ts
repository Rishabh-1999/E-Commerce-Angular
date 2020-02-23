import { Product } from "./../../models/products";
import { ProductService } from "./../../product.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators/";
import { DataTableResource } from "angular5-data-table";

@Component({
  selector: "app-admin-products",
  templateUrl: "./admin-products.component.html",
  styleUrls: ["./admin-products.component.css"]
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  productsRef: Product[];
  subscription: Subscription;
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number = 0;

  constructor(productService: ProductService) {
    this.subscription = productService
      .getAll()
      .snapshotChanges()
      .pipe(
        map(actions => actions.map(a => ({ $key: a.key, ...a.payload.val() })))
      )
      .subscribe(products => {
        this.products = products;
        console.log(products);
        this.initializeTable(products);
      });
  }

  private initializeTable(products) {
    this.tableResource = new DataTableResource(products);
    this.tableResource.query({ offset: 0 }).then(items => (this.items = items));
    this.tableResource.count().then(count => (this.itemCount = count));
  }

  reloadItems(params) {
    if (!this.tableResource) return;

    this.tableResource.query(params).then(items => (this.items = items));
  }

  filter(query: string) {
    let filteredProducts = query
      ? this.products.filter(p =>
          p.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;

    this.initializeTable(filteredProducts);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {}
}
