import { PipeTransform, Pipe } from "@angular/core";
import { Product } from "src/app/models/product";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { ShoppingCartService } from "src/app/shopping-cart.service";

@Pipe({
    name: 'getQuantity',
    pure:true,
})
export class Quantity implements PipeTransform{

    constructor(private cartService: ShoppingCartService){
       
    }

    transform(value: any, ...args: any[]) {        
        return this.getQuantity(value);
    }

    getQuantity(product: Product){
        return this.cartService.getCartItem(product)?.valueChanges()
        .map(cartItem => {
            return <number>cartItem?.quantity || 0;
        });
    }

}