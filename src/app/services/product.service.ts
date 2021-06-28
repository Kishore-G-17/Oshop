import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { AngularFireList } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

 
  constructor(private db: AngularFireDatabase) { }

  create(product: Product){    
    let key = this.db.list('/products/').push(product).key;
    product.key = <string> key;
    this.updateProduct(key, product);
  }

  getAll():AngularFireList<Product>{
    return this.db.list('/products/');
  }

  getProduct(productId: any): AngularFireObject<Product>{
    return this.db.object('/products/'+ productId );
  }

  updateProduct(productId: string | null, product: Product){
    return this.db.object('/products/'+productId).update(product);
  }

  deleteProduct(productId: string | null) {
    return this.db.object('/products/'+productId).remove();
  }

}
