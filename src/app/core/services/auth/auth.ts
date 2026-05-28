import { Injectable, signal, computed } from '@angular/core';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { firebaseApp } from '@core/firebase/firebase.config';
import { FirebaseError } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = getAuth(firebaseApp);
  private _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();
  readonly isAuthenticated = computed(() => !!this._user());

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      console.log(user);
      this._user.set(user);
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
