import { CartItem } from './models/CartItem.cart';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import { Cart } from './models/Cart';
import { AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) {
  }

  private create(){
    let cartId = this.db.list('/shoppingCarts/').push({key: '', dateCreated: new Date().getDate()}).key;
    this.db.list('shoppingCarts/'+cartId).update('/', {key: cartId});    
    return cartId;
  }

  getCartItems():AngularFireList<CartItem>{
    return this.db.list('/shoppingCarts/'+this.getOrCreateCartId()+'/items/');
  }

  deleteProductInCart(product: Product){
    let product$=this.db.object('/shoppingCarts/'+this.getOrCreateCartId()+'/items/'+(product.key as unknown as CartItem));
    product$?.remove();
  }

  getCart():AngularFireObject<Cart>{
    return this.db.object('/shoppingCarts/'+(this.getOrCreateCartId() as unknown as Cart));
  }

  getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');

    if(cartId) return cartId;
    let key = <string>this.create();
    localStorage.setItem('cartId', key);
    return key;
  }

  AddToCart(product: Product, symbol: string){    
    
    let item$ = this.getCartItem(product);
    item$?.valueChanges().take(1).subscribe( (cartItem) => {
      item$.update( { product: product,
      quantity: (symbol === '+')? ((cartItem?.quantity || 0 ) + 1):
      ((cartItem?.quantity || 0) - 1)} );    
    });

  }

  getCartItem(product: Product):AngularFireObject<CartItem>{ 
    return this.db.object('/shoppingCarts/'+this.getOrCreateCartId()+'/items/'+product.key);
  }

  deleteAll(){
    this.db.list('/shoppingCarts/'+this.getOrCreateCartId()+'/items/').remove();
  }

  clearShoppingCart(){
    this.db.object('/shoppingCarts/'+this.getOrCreateCartId()).remove();
  }

}