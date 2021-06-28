import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartItem } from '../models/CartItem.cart';
import { Subscription } from 'rxjs';

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

  cartItems: CartItem[] = [];
  subscription!: Subscription;

  constructor(private cartService: ShoppingCartService) {
           
  }

  ngOnInit(){
    
    this.subscription = this.cartService.getCartItems()?.valueChanges()
    .subscribe( cartitems =>{
      if(cartitems){
        this.cartItems = cartitems;
      }     
    });

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();    
  }

  deleteAll(){
    if(!confirm('Are you sure you want to delete all items in your cart ')) return
    this.cartService.deleteAll();
  }

}
