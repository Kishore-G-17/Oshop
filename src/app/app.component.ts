import { ShoppingCartService } from 'src/app/shopping-cart.service';
import { AuthService } from './services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{

  constructor(private userService: UserService, 
              private service: AuthService, 
              private router: Router){ }

  ngOnInit(): void {
    this.service.user$
    .subscribe( user=>{``
      if(!user) return;

      this.userService.registerUser(user);      
      let url :any = localStorage.getItem('returnUrl');

      if(!url) return;

      localStorage.removeItem('returnUrl');
      this.router.navigateByUrl(url);
    });
  }
}