import {
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  DocumentData,
  WithFieldValue,
} from 'firebase/firestore';

// export const firestoreDataConverter = <T>(): FirestoreDataConverter<T> => ({
//   toFirestore: (data: WithFieldValue<T>): DocumentData => {
//     return data as DocumentData;
//   },
//   fromFirestore: (snapshot: QueryDocumentSnapshot): T => {
//     const data = snapshot.data();
//     return {
//       id: snapshot.id,
//       ...data,
//     } as T;
//   },
// });
export function firestoreDataConverter<T>(): FirestoreDataConverter<T> {
  return {
    toFirestore(data: WithFieldValue<T>): DocumentData {
      return data as DocumentData;
    },

    fromFirestore(snapshot: QueryDocumentSnapshot): T {
      const data = snapshot.data();
      return {
        id: snapshot.id,
        ...data,
      } as T;
    },
  };
}
