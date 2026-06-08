import { Injectable } from '@angular/core';
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  WithFieldValue,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
  UpdateData,
} from 'firebase/firestore';
import { firebaseApp } from '@core/firebase/firebase.config';
import { firestoreDataConverter } from '@shared/utils/firestore-data-converter';
import { CollectionRegistry } from '@shared/models/firestore.model';

type CollectionName = keyof CollectionRegistry;

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private db = getFirestore(firebaseApp);

  generateId<K extends CollectionName>(colName: K): string {
    return doc(collection(this.db, colName)).id;
  }

  private getDocRef<K extends CollectionName>(colName: K, docId: string) {
    return doc(this.db, colName, docId).withConverter(
      firestoreDataConverter<CollectionRegistry[K]>()
    );
  }

  setData<K extends CollectionName>(
    colName: K,
    docId: string,
    data: WithFieldValue<CollectionRegistry[K]>
  ) {
    return setDoc(this.getDocRef(colName, docId), data);
  }

  async getData<K extends CollectionName>(colName: K, docId: string) {
    const snapshot = await getDoc(this.getDocRef(colName, docId));
    return snapshot.exists() ? snapshot.data() : null;
  }

  async getDocsByUid<K extends CollectionName>(colName: K, uid: string) {
    const colRef = collection(this.db, colName).withConverter(
      firestoreDataConverter<CollectionRegistry[K]>()
    );
    const userQuery = query(colRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(userQuery);
    return querySnapshot.docs.map((doc) => doc.data());
  }

  updateData<K extends CollectionName>(
    colName: K,
    docId: string,
    data: UpdateData<CollectionRegistry[K]>
  ) {
    return updateDoc(this.getDocRef(colName, docId), data);
  }

  deleteDoc<K extends CollectionName>(colName: K, docId: string) {
    return deleteDoc(this.getDocRef(colName, docId));
  }
}
