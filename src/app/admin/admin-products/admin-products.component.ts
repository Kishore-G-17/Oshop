import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy{

  public products!: Product[];
  public filteredProducts!: Product[];
  public subscription!: Subscription;  

  constructor(private productService: ProductService ) {
           
  }

  ngOnInit(): void {   
    this.subscription = this.productService.getAll().valueChanges()
    .subscribe(products => {
      this.filteredProducts = this.products = products;
    });  
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  filter(query: string){
    this.filteredProducts = (query)?
      this.products.filter(p => p.Title.toLowerCase().includes(query.toLowerCase())): 
      this.products;
  }

}
