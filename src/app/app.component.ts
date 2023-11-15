import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Class, ClassService } from './class.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  newClassName: string = '';
  columnsToDisplay = ['number', 'name', 'studentsCount', 'creationDate'];
  classes: Class[] = [];
  classes$: Observable<Class[]>;

  constructor(private classService: ClassService) {
    this.classes$ = this.classService.classes$.pipe(startWith([]));
    this.classService.classes$.subscribe(classes => {
      this.classes = classes ?? [];
    });
  }

  createClass() {
    if (this.newClassName) {
      const newClass: Class = { 
        id: Date.now(), 
        name: this.newClassName,
        studentsCount: 0, // Standardwert
        creationDate: new Date() // Aktuelles Datum
      };
      this.classService.addClass(newClass);
      this.newClassName = ''; // Zurücksetzen des Eingabefelds
    }
  }
}