import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Student, Class } from '../models/class.models';

@Injectable({ providedIn: 'root' })
export class ClassService {
  private classesSubject = new BehaviorSubject<Class[]>([]); // Initialisiert Observable mit leeren Array von Class-Objekten als Anfangswert
  classes$ = this.classesSubject.asObservable();

  constructor() { }

  updateClass(updatedClass: Class) {
    const classes = [...this.classesSubject.value]; // Erstellt eine Kopie des Arrays
    const classIndex = classes.findIndex(c => c.id === updatedClass.id);
    if (classIndex > -1) {
      classes[classIndex] = updatedClass;
      this.classesSubject.next(classes); // Aktualisiert das Subject mit der neuen Array-Instanz
    }
  }

  addClass(newClass: Class) {
    const currentClasses = [...this.classesSubject.value];
    this.classesSubject.next([...currentClasses, newClass]);
  }

  getClassById(id: number): Observable<Class | undefined> {
    const foundClass = this.classesSubject.value.find(c => c.id === id);
    return of(foundClass);
  }
}

export { Student, Class };