import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Class, ClassService } from '../shared/services/class.service';
import { startWith } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  newClassName: string = '';
  columnsToDisplay = ['number', 'name', 'studentsCount', 'creationDate'];
  classes: Class[] = [];
  classes$: Observable<Class[]>; // Asynchrone Datenquelle für Klassen-Datenstrom

  constructor(
    private classService: ClassService,
    private router: Router
  ) {
    this.classes$ = this.classService.classes$.pipe(startWith([])); // Reihe von Operatoren, um Daten zu verarbeiten, bevor sie weiterverwendet werden
    this.classService.classes$.subscribe(classes => {
      this.classes = classes ?? []; // Reagiert auf ausgegebene Daten des Observables
    });
  }

  goToClassDetail(classId: number) {
    this.router.navigate(['/class-detail', classId]);
  }

  createClass() {
    if (this.newClassName) {
      const newClass: Class = {
        id: Date.now(),
        name: this.newClassName,
        studentsCount: 0,
        creationDate: new Date(),
        students: [],
      };
      this.classService.addClass(newClass);
      this.newClassName = '';
    }
  }
}