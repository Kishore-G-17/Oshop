import { PipeTransform, Pipe } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import 'rxjs/add/operator/map';
import { CartItem } from "src/app/models/CartItem.cart";
import { Product } from "src/app/models/product";
import { ShoppingCartService } from "src/app/shopping-cart.service";
import { forEachChild } from "typescript";

@Pipe({
    name: 'getTotalCartQuantity',
    pure:true,
})
export class TotalCartQuantity implements PipeTransform{

    totalQuantity = 0;
    constructor(private cartService: ShoppingCartService,
                private db: AngularFireDatabase){
       
    }

    transform(value: any, ...args: any[]) {        
        return this.getTotalCartQuantity(value);
    }

    getTotalCartQuantity(product: string){     
        return this.cartService.getCartItems().valueChanges()
        .map( cartitems =>{
            this.totalQuantity = 0;
            for (let cartItem of cartitems) this.totalQuantity += cartItem?.quantity;
            return this.totalQuantity;
        })
    }

}