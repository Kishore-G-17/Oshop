import { ShippingDetails } from './../models/shippingDetails.order';
import { GetTotalPrice } from './../common/Pipes/getTotalPrice.pipe';
import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppUser } from '../models/app-user';
import { UserService } from '../services/users.service';
import { CartItem } from '../models/CartItem.cart';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import { OrderService } from '../services/order.service';
import { AuthService } from '../services/auth.service';
import { Order } from '../models/order.class';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css'],
})
export class CheckOutComponent implements OnInit, OnDestroy {

  appUser!: AppUser | null;
  subscription!: Subscription;
  cartItems: CartItem[] = [];
  price!: GetTotalPrice;
  userId: string = '';
  manageOrder!: Order;
  isManageOrder: boolean = false;

  NAME: string = '';
  ADDRESS1: string = '';
  ADDRESS2: string = '';
  CITY: string='';
  orderId: string | null = '';
 
  constructor(private userService : UserService,
              private cartService : ShoppingCartService,
              private orderService: OrderService,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute) {

                this.price = new GetTotalPrice();
                this.orderId = <string>this.route.snapshot.paramMap?.get('orderId') || null;

                if(this.orderId){
                  this.orderService.getOrder(this.orderId)
                  .valueChanges().subscribe( order => {
                    if(order){
                      this.isManageOrder = true;
                      this.manageOrder = <Order>order;                      
                      this.InitializeShipDet();
                    }                   
                  });
                }                                                                   
  }

  update(shippingDetails: ShippingDetails){
    this.orderService.updateShipppingDetails(<string>this.orderId, shippingDetails);
    this.router.navigate(['/admin/manage-orders/']);
  }

  delete(){
    if(!confirm('Are you sure you want to delete this order')) return;
    this.orderService.deleteOrder(<string>this.orderId);
    this.router.navigate(['/admin/manage-orders/']);
  }

  InitializeShipDet() {
    this.NAME = this.manageOrder.shippingDetails.Name;
    console.log(this.NAME);
    this.ADDRESS1=this.manageOrder.shippingDetails?.Address1;
    this.ADDRESS2=this.manageOrder.shippingDetails?.Address2;
    this.CITY=this.manageOrder.shippingDetails?.City;
    this.cartItems = this.manageOrder.items;
  }

  ngOnInit(): void {
    
    this.subscription = this.cartService.getCartItems()?.valueChanges()
    .switchMap( cartitems =>{
      if(cartitems && !(this.isManageOrder)){        
        this.cartItems = cartitems;
      }
      return this.authService.user$;
    })
    .switchMap( user => {
      this.userId = <string>user?.uid;
      return this.userService.getAppUser$();
    })
    .subscribe( appUser =>{
      this.appUser = appUser;
    });
   
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  placeOrder(shippingDetails : any){  
    if(shippingDetails.control.status === "INVALID"){
      alert('Please enter all the details!'); 
      return;
    } 

    let order = new Order(
      this.userId, 
      shippingDetails.value, 
      this.cartItems,
      '₹'+(this.price.getTotalPrice(this.cartItems)) );     

    let result = this.orderService.placeOrder(order);
    this.router.navigate(['/order-success/',result.key]);

  }

}
