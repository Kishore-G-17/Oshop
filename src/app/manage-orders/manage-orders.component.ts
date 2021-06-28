import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Order } from '../models/order.class';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit, OnDestroy {

  orders: Order[] = [];
  subscription!: Subscription;

  constructor(private orderService: OrderService) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(){
    this.subscription = this.orderService.getOrders()
    .valueChanges().subscribe( orders =>{
      this.orders = orders;
    });
  }

}
