import { Injectable, signal, computed, inject, effect } from '@angular/core';
import { Router } from '@angular/router';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { firebaseApp } from '@app/core/firebase/firebase.config';
import { REQUIRES_AUTH } from '@shared/constants/requires-auth.const';
import { AuthState } from './types/auth.type';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);
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
      this._authState.set(user ? 'auth' : 'guest');
    });
    effect(() => {
      if (this.authState() !== 'guest') {
        return;
      }
      const activeRoute = this.router.routerState.snapshot.root.firstChild;
      if (activeRoute?.data?.[REQUIRES_AUTH]) {
        this.router.navigate(['/']);
      }
    });
  }

  async login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      this.handleError(error, 'login');
    }
  }

  async logout() {
    try {
      await signOut(this.auth);
    } catch (error) {
      this.handleError(error, 'logout');
    }
  }

  async register(email: string, password: string) {
    try {
      await createUserWithEmailAndPassword(this.auth, email, password);
    } catch (error) {
      this.handleError(error, 'register');
    }
  }

  // TEMP: local error handler until global ErrorHandlerService is implemented
  private handleError(error: unknown, context: string) {
    if (error instanceof FirebaseError) {
      console.error(`[${context}] ${error.message}`);
    } else {
      console.error(`[${context}] unknown error`, error);
    }
  }
}
