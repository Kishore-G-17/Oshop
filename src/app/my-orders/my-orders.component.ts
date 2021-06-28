import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppUser } from '../models/app-user';
import { CartItem } from '../models/CartItem.cart';
import { Order } from '../models/order.class';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';
import { UserService } from '../services/users.service';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit, OnDestroy {

  appUser!: AppUser | null;
  subscription!: Subscription;
  cartItems: CartItem[] = [];
  orders: Order[] = [];
  userId: string = '';
  closeView: boolean = false;
  clickedOrder!: Order;

  constructor(private cartService: ShoppingCartService,
    private userService: UserService,
    private orderService: OrderService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.subscription = this.cartService.getCartItems()?.valueChanges()
      .switchMap(cartitems => {
        if (cartitems) {
          this.cartItems = cartitems;
        }
        return this.authService.user$;
      })
      .switchMap(user => {
        this.userId = <string>user?.uid;
        return this.orderService.getOrders().valueChanges();
      })
      .switchMap((orders: Order[]) => {
        for (let order of orders) {
          if (order?.userId === this.userId) this.orders.push(order);
        }
        return this.userService.getAppUser$();
      })
      .subscribe(appUser => {
        this.appUser = appUser;
      });

  }
  
  ClickedOrder(order: Order) {
    this.clickedOrder = order;
    this.closeView = true;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
