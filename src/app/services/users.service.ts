import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject} from '@angular/fire/database';
import * as firebase from 'firebase/app';
import { AppUser } from '../models/app-user';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase, private authService: AuthService) { 

  }

  registerUser(user: firebase.User){
    this.db.object('/users/'+ user.uid).update({
      name: user.displayName,
      email: user.email,
    });
  }

  getUser(uid: any):AngularFireObject<AppUser>{
    return this.db.object('/users/'+ uid);
  }  

  getAppUser$(){
    return this.authService.user$
    .switchMap(user => {
      if(user){
        return this.getUser(user!.uid).valueChanges();
      }      
      return Observable.of(null);
    });
  }

}
