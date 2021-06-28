import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { UserService } from './users.service';
import { AppUser } from '../models/app-user';
import { Observable } from 'rxjs';
import { app } from 'firebase';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private userService: UserService, private authService: AuthService) { }

  canActivate(){
    return this.userService.getAppUser$().map( appUser => appUser!.isAdmin);
  }
}
