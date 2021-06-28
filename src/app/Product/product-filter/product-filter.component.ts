import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories$;
  @Input('CateGory') cateGory!: any;
  constructor(private categoryService: CategoryService) { 
    this.categories$ = this.categoryService.getAll().valueChanges();
  }

  ngOnInit(): void {
  }

}
