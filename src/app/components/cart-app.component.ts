import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { CatalogComponent } from "./catalog/catalog.component";
import { CartItem } from '../models/cartItem';
import { NavbarComponent } from './navbar/navbar.component';
import { CartModalComponent } from './cart-modal/cart-modal.component';

@Component({
  selector: 'cart-app',
  imports: [CatalogComponent, NavbarComponent, CartModalComponent],
  templateUrl: './cart-app.component.html'
})
export class CartAppComponent implements OnInit {

  products: Product[] = [];

  items: CartItem[] = [];

  showCart: boolean = false;

  constructor(private service: ProductService) { }
  
  ngOnInit(): void {
    this.products = this.service.findAll();
    this.items = JSON.parse(sessionStorage.getItem('cart') || '[]');
    //this.calculateTotal();
  }

  onAddCart(product: Product): void {
    const hasItem = this.items.find(item => {
      return item.product.id === product.id;
    });
    if (hasItem) {
      this.items = this.items.map(item => {
        if(item.product.id === product.id) {
          return{
            ... item, quantity: item.quantity + 1
          }
        }
        return item;
      })
    } else {
      this.items = [... this.items, { product: {... product}, quantity: 1 }];
    }
    //this.calculateTotal();
    //this.saveSession();
  }

  onDeleteCart(id: number): void {
    this.items = this.items.filter(item => item.product.id !== id);
    if(this.items.length == 0) {
      sessionStorage.removeItem('cart');
    }
    //this.calculateTotal();
    //this.saveSession();
  }

  openCloseCart(): void {
    this.showCart = !this.showCart;
  }

}
