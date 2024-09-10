import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { Database, DatabaseReference, getDatabase, onValue, ref, remove, set, push } from
  "firebase/database";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FirebaseRTBService {
  private db: Database;
  private ref: DatabaseReference;
  public mensajes: string[] = [];
  constructor() {
    initializeApp(environment.firebaseConfig);
    this.db = getDatabase();
    this.ref = ref(this.db, '/');

    onValue(this.ref, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        this.mensajes.push(childSnapshot.val());
        console.log(childSnapshot.val());
      });
    }, {
      onlyOnce: false
    });
  }
}