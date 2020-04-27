import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/user.interface';

import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore, AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;

  constructor(
    private fireauth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router
  ) { 
    this.user = this.fireauth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.firestore.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    )
  }

  public async googleSignIn() {
    const provider = new auth.GoogleAuthProvider();
    const credential = await this.fireauth.signInWithPopup(provider);
    return this.updateUserData(credential.user);
  }

  async signOut() {
    await this.fireauth.signOut();
    return this.router.navigate(['/']);
  }
  
  private updateUserData({ uid, email, displayName}: User) {
    const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${uid}`);
    
    const user = {
      uid,
      email,
      displayName
    }

    console.log('new user', user);

    return userRef.set(user, { merge: true});
  }
}
