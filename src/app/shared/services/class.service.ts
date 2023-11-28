import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Class } from '../models/class.models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ClassService {
  constructor(private firestore: AngularFirestore) { }

  getClassById(classId: string) {
    return this.firestore
      .collection('classes') // Greift auf Collection "classes" zu
      .doc(classId) // Wählt spezifisches Dokument aus Sammlung
      .snapshotChanges()
      .pipe(
        map(action => { // Transformiert Snapshot 
          const data = action.payload.data() as Class; // Speichert Daten als Class
          const id = action.payload.id;
          const { id: dataId, ...rest } = data; // Erfasst alle Eigenschaften des Objekts, ausser die, die explizit ausgeschlossenen
          return { id, ...rest };
        })
    );
  }

  updateClass(updatedClass: Class) {
    const classId = String(updatedClass.id);
    return this.firestore.collection('classes').doc(classId).update(updatedClass);
  }

  addClass(newClass: { name: string }) {
    return this.firestore.collection('classes').add({
      ...newClass,
      studentsCount: 0,
      students: [] // Initialisiert leere Schülerliste
    });
  }

  getClasses() {
    return this.firestore.collection<Class>('classes').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Class;
        const id = a.payload.doc.id;
        const { id: _, ...rest } = data; // "_" wird ignoriert
        return { id, ...rest };
      }))
    );
  }
}