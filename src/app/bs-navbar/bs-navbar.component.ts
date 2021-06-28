import { UserService } from './../services/users.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app-user';
import { ShoppingCartService } from '../shopping-cart.service';
import 'rxjs/add/operator/take';
import { timer } from 'rxjs';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})

export class BsNavbarComponent implements OnInit{
    
  appUser!: AppUser | null;
  isCollapsed : boolean = true;

  constructor(public authService: AuthService, 
              private usersService: UserService,
              private cartService: ShoppingCartService) {    
  }

  ngOnInit(){  
    this.usersService.getAppUser$().subscribe( appUser=> this.appUser = appUser);
  }

  logout(){
    this.authService.logout();
  }

}