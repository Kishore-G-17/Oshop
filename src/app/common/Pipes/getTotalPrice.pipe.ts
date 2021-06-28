import { Pipe, PipeTransform } from '@angular/core';
import { CartItem } from 'src/app/models/CartItem.cart';

@Pipe({
    name: 'getTotalPrice',
    pure: true,
})
export class GetTotalPrice implements PipeTransform{
  
    totalPrice!: number;    
        
    transform(value: CartItem[], ...args: any[]) {
        return this.getTotalPrice(value);
    }

    getTotalPrice(cartItems: CartItem[]){
        this.totalPrice = 0;
        for (let cartItem of cartItems){
            this.totalPrice += (cartItem.product.Price * cartItem.quantity);
        }
        return this.totalPrice;
    }
}