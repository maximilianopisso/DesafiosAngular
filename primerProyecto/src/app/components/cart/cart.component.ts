import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor() { }
  ngOnInit(): void {
    console.log("CART_COMPONENT - INIT - CHECKED ");
  }
  ngAfterViewInit(): void {
    console.log("CART_COMPONENT - INIT - CHECKED ");
  }
  ngOnDestroy(): void {
    console.log("CART_COMPONENT - INIT - CHECKED ");
  }
}
