import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent implements OnInit {

  @Input('Product')product!: Product;

  constructor(private cartService: ShoppingCartService) { }

  ngOnInit(): void {

  }

  addToCart(symbol: string){    
    this.cartService.AddToCart(this.product, symbol);
  }

}
