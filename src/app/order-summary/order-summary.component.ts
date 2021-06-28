import { Component, Input, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { CartItem } from '../models/CartItem.cart';

@Component({
  selector: 'order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit {

  @Input('AppUSer')appUser!: AppUser | null;
  @Input('CartITems')cartItems: CartItem[] = [];  
  @Input('IsMyOrder')isMyOrder: boolean = true;
  @Input('IsManageOrder')isManageOrder: boolean = false;

  constructor() {  }

  ngOnInit(): void {
  }

}
