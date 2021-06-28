import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/throw';
import { ActivatedRoute } from '@angular/router';
// import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable< firebase.User | null>;

  constructor(private fAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = this.fAuth?.authState;
  }

  login(){
    let returnUrl:any = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.fAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){    
    this.fAuth.auth.signOut();
  }

}
