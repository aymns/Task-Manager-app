import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class UsersService{
    notesCollection: AngularFirestoreCollection<any>;
    noteDocument:   AngularFirestoreDocument<any>;

    
  constructor(private afs: AngularFirestore) {
    this.notesCollection = this.afs.collection('users', (ref) => ref.limit(5));
  }

  getData(): Observable<any[]> {
    // ['added', 'modified', 'removed']
    return this.notesCollection.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          return { id: a.payload.doc.id, ...data };
        });
      })
    );
  }


  getUser(name: string){
    return this.afs.collection("users", query => query.where('email',"array-contains",name)).get();
  }

}