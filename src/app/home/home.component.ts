import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Class, ClassService } from '../class.service';
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
  classes$: Observable<Class[]>;

  constructor(
    private classService: ClassService,
    private router: Router
  ) {
    this.classes$ = this.classService.classes$.pipe(startWith([]));
    this.classService.classes$.subscribe(classes => {
      this.classes = classes ?? [];
    });
  }

  goToClassDetail(classId: number) {
    console.log('Navigating to class with ID:', classId);
    this.router.navigate(['/class-detail', classId]);
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
