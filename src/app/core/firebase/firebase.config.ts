import { initializeApp } from 'firebase/app';
import { environment } from '@env/environment';

export const firebaseApp = initializeApp(environment.firebase);
