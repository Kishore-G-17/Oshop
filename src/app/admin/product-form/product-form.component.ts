import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { category } from 'src/app/models/category';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit{

  private productId! : string | null;
  public categories$!:  Observable<category[]>;
  public title : string = "";
  public key: string | null = "";
  public price: number = 0;
  public imageUrl: string = "";
  public category: string = "";


  constructor(private categoryService: CategoryService, 
              private productService: ProductService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getAll().valueChanges();           
    this.productId = this.route.snapshot.paramMap.get('productId') || null;
    if(this.productId){
      this.productService.getProduct(this.productId).valueChanges()
      .take(1)
      .subscribe( product =>{
        if(product){ 
          // this.product = product;     
          this.title = product.Title;         
          this.category = product.Category;
          this.key = product.key;
          this.price = product.Price;
          this.imageUrl = product.ImageUrl;
        }        
      });
    }
  }

  save(product: Product){
    if(this.productId){
      this.productService.updateProduct(this.productId, product);
    }
    else{
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);    
  }

  delete(){
    if(!confirm("Are you sure you want to delete this product ")) return;

    this.productService.deleteProduct(this.productId);
    this.router.navigate(['/admin/products']);    
  }

}
