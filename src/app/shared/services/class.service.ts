import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Student, Class } from '../models/class.models';

@Injectable({ providedIn: 'root' })

export class ClassService {
  private classesSubject = new BehaviorSubject<Class[]>([]);
  classes$ = this.classesSubject.asObservable();
  private classes: Class[] = [];

  constructor() {}

  updateClass(updatedClass: Class) {
    const classes = this.classesSubject.value;
    const classIndex = classes.findIndex(c => c.id === updatedClass.id);
    if (classIndex > -1) {
      classes[classIndex] = updatedClass;
      this.classesSubject.next(classes);
    }
  }

  addClass(newClass: Class) {
    const currentClasses = this.classesSubject.value;
    this.classesSubject.next([...currentClasses, newClass]);
    console.log("test", this.classesSubject.value);
  }

  getClassById(id: number): Observable<Class | undefined> {
    const foundClass = this.classesSubject.value.find(c => c.id === id);
    return of(foundClass);
  }

  getAllClasses(): Observable<Class[]> {
    return of(this.classesSubject.value);
  }
}
export { Student, Class };

