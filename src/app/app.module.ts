import { GetTotalPrice } from './common/Pipes/getTotalPrice.pipe';
import { AdminAuthGuard as AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CustomFormsModule } from 'ng2-validation';

import { AppComponent } from './app.component';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './auth-guard.service';
import { UserService } from './services/users.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './services/category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { DataTablesModule } from 'angular-datatables';
import { ProductFilterComponent } from './Product/product-filter/product-filter.component';
import { ProductCardComponent } from './Product/product-card/product-card.component';
import { ShoppingCartService } from './shopping-cart.service';
import { Quantity } from './common/Pipes/Quantity.pipe';
import { DeleteProduct } from './common/Pipes/DeleteProduct.pipe';
import { TotalCartQuantity } from './common/Pipes/TotalCartQuantity.pipe';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrderService } from './services/order.service';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { ManageOrdersComponent } from './manage-orders/manage-orders.component';
import { NgbCollapseModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    MyOrdersComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    Quantity,
    DeleteProduct,
    TotalCartQuantity,
    ProductQuantityComponent,
    GetTotalPrice,
    OrderSummaryComponent,
    ManageOrdersComponent,
  ],
  imports: [
    BrowserModule,  
    NgbModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CustomFormsModule,       
    RouterModule.forRoot([
      { 
        path: 'admin/products/new',
        component: ProductFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/products/:productId',
        component: ProductFormComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: 'admin/manage-orders',
        component: ManageOrdersComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },
      { 
        path: '', 
        component: ProductsComponent
      },
      { 
        path: 'login', 
        component: LoginComponent 
      },
      { 
        path: 'products', 
        component: ProductsComponent 
      },
      { 
        path: 'my-orders', 
        component: MyOrdersComponent, 
        canActivate: [AuthGuard]
      },
      { 
        path: 'check-out/:orderId',
        component: CheckOutComponent, 
        canActivate: [AuthGuard]
      }, 
      { 
        path: 'check-out', 
        component: CheckOutComponent, 
        canActivate: [AuthGuard]
      },      
      { 
        path: 'order-success/:orderId', 
        component: OrderSuccessComponent, 
        canActivate: [AuthGuard]
      },
      { 
        path: 'shopping-cart', 
        component: ShoppingCartComponent 
      },      
      { 
        path: 'admin/products', 
        component: AdminProductsComponent, 
        canActivate: [AuthGuard, AdminAuthGuard] 
      },     
    ]),
    AngularFireModule.initializeApp(environment.firebase),
    NgbModule,
    DataTablesModule,
    FormsModule,
    NgbCollapseModule
  ],
  providers: [ AuthService,
               AuthGuard,
               UserService,
               CategoryService,
               AdminAuthGuard,
               ProductService,
               ShoppingCartService,
               OrderService,
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
