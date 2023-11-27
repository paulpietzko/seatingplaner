import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) {}

  addTestDocument() {
    const testData = { name: 'Test', timestamp: new Date() };
    return this.firestore.collection('testCollection').add(testData);
  }
}