import { ShippingDetails } from './../models/shippingDetails.order';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import { Order } from '../models/order.class';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
 
  constructor(private db: AngularFireDatabase,
              private cartService: ShoppingCartService) { }

  placeOrder(order: any){
    let result = this.db.list('/orders/').push(order);
    order.key = <string>result.key;
    this.update(order);
    this.cartService.clearShoppingCart();
    return result;
  }

  update(order: Order){
    this.db.object('/orders/'+order.key).update(order);
  }

  deleteOrder(orderId: string) {
    this.db.object('/orders/'+orderId).remove();
  }

  getOrders():AngularFireList<Order>{
    return this.db.list('/orders/');
  }

  getOrder(orderId: string):AngularFireObject<Order>{
    return this.db.object('/orders/'+orderId);
  }

  updateShipppingDetails(orderId: string, shippingDetails: ShippingDetails){
    this.db.object('/orders/'+orderId+'/shippingDetails/').update(shippingDetails);
  }
}
