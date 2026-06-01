import { Injectable, signal, computed } from '@angular/core';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { firebaseApp } from '@app/core/firebase/firebase.config';
import { FirebaseError } from 'firebase/app';
import { AuthState } from './auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly auth = getAuth(firebaseApp);

  private _user = signal<User | null>(null);
  readonly user = this._user.asReadonly();

  private _authState = signal<AuthState>('loading');
  readonly authState = this._authState.asReadonly();

  readonly isCheckingAuth = computed(() => this.authState() === 'loading');
  readonly isAuthenticated = computed(() => this.authState() === 'auth');

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this._user.set(user);
      if (user) {
        this._authState.set('auth');
      } else {
        this._authState.set('guest');
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
