import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { DataTableModule } from "angular5-data-table";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { CustomFormsModule } from "ngx-custom-validators";
import { OrderService } from "shared/services/order.service";

import { ProductCardComponent } from "./components/product-card/product-card.component";
import { ProductQuantityComponent } from "./components/product-quantity/product-quantity.component";
import { AuthGuard } from "./services/auth-guard.service";
import { AuthService } from "./services/auth.service";
import { CategoryService } from "./services/category.service";
import { ProductService } from "./services/product.service";
import { ShoppingCartService } from "./services/shopping-cart.service";

@NgModule({
  declarations: [ProductCardComponent, ProductQuantityComponent],
  imports: [
    CommonModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule
  ],
  exports: [
    ProductCardComponent,
    ProductQuantityComponent,
    FormsModule,
    CommonModule,
    CustomFormsModule,
    DataTableModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    CategoryService,
    ProductService,
    ShoppingCartService,
    OrderService
  ]
})
export class SharedModule {}
