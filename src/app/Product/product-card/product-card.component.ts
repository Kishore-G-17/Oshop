import { ShoppingCartService } from './../../shopping-cart.service';
import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent{

  @Input('Product')product!: Product;
  
  constructor(public cartService: ShoppingCartService) {    
  }

}