import { Component, OnInit} from '@angular/core';
import { Product } from '../../models/product';
import { ProductCardComponent } from "../product-card/product-card.component";
import { Router } from '@angular/router';
import { SharingDataService } from '../../services/sharing-data.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'catalog',
  imports: [ProductCardComponent],
  templateUrl: './catalog.component.html',
})
export class CatalogComponent implements OnInit{

  products!: Product[];

  constructor(
    private productService: ProductService,
    private sharingDataService: SharingDataService) {}
  
  ngOnInit(): void {
      this.products = this.productService.findAll();
  }
;

  onAddCart(product: Product) {
    this.sharingDataService.ProductEventEmitter.emit(product);
  }

}
