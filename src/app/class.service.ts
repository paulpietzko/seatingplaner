import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

  constructor() {}

  addClass(newClass: Class) {
    const currentClasses = this.classesSubject.value;
    this.classesSubject.next([...currentClasses, newClass]);
  }
}