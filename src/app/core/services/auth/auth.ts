import { Injectable, signal } from '@angular/core';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { firebaseApp } from '@core/firebase/firebase.config';
import { FirebaseError } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = getAuth(firebaseApp);
  private _isLoggedIn = signal(false);
  readonly isAuthenticated = this._isLoggedIn.asReadonly();

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        console.log('user is signed in');
        this._isLoggedIn.set(true);
      } else {
        console.log('user is signed out');
        this._isLoggedIn.set(false);
      }
    });
  }

  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      } else {
        console.error('login error:', error);
      }
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.error(error.message);
      } else {
        console.error('logout error:', error);
      }
    }
  }
}
