import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { Cart } from '../models/Cart';
import { Product } from '../models/product';
import { ProductService } from '../services/product.service';
import { CartItem } from '../models/CartItem.cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{

  products: Product[] = [];
  filteredProducts: Product[] = []; 
  cateGory!: string | null;

  constructor(private productService: ProductService,               
              private route: ActivatedRoute,
              private cartService: ShoppingCartService) { 

    this.productService.getAll().valueChanges()
    .switchMap( products => {      
      this.products = this.filteredProducts = products;
      return this.route.queryParamMap;
    })
    .subscribe( params =>{
      this.cateGory = params.get('category');    
      this.filteredProducts = this.cateGory? 
        this.products.filter( p => p.Category === this.cateGory):
        this.products;
    });    
  }

  ngOnInit(): void {
  }

}
