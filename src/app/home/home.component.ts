import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Class, ClassService } from '../class.service';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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
        studentsCount: 0,
        creationDate: new Date()
      };
      this.classService.addClass(newClass);
      this.newClassName = '';
    }
  }
}