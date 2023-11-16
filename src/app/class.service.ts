import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs'; // Fügen Sie 'of' hier hinzu

export interface Class {
  id: number;
  name: string;
  studentsCount: number;
  creationDate: Date;
}

@Injectable({ providedIn: 'root' })
export class ClassService {
  private classesSubject = new BehaviorSubject<Class[]>([]);
  classes$ = this.classesSubject.asObservable();
  private classes: Class[] = [];

  constructor() {}

  addClass(newClass: Class) {
    const currentClasses = this.classesSubject.value;
    this.classesSubject.next([...currentClasses, newClass]);
  }

  getClassById(id: number): Observable<Class | undefined> {
    const foundClass = this.classes.find(c => c.id === id);
    return of(foundClass);
  } 
}
