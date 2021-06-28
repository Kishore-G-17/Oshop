import { PipeTransform, Pipe } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
@Pipe({
    name: 'deleteProduct',
    pure: true,
})
export class DeleteProduct implements PipeTransform {
 
    constructor( private cartService: ShoppingCartService){

    }

    transform(value: any, ...args: any[]) {
        this.deleteProduct(value);
    }

    deleteProduct(product: Product){
        this.cartService.deleteProductInCart(product);
    }   

}