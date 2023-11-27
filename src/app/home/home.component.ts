import { Component } from '@angular/core';
import { ClassService } from '../shared/services/class.service';
import { Class } from '../shared/models/class.models';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent {
  newClassName = '';
  classes$ = this.classService.getClasses().pipe(
    map((classes: Class[] | null) => classes ?? []) // '??', um 'null' in ein leeres Array zu konvertieren
  );
  columnsToDisplay = ['number', 'name', 'studentsCount', 'creationDate'];

  constructor(private classService: ClassService) {}

  goToClassDetail(classId: string) {
    console.log('Navigiere zu Klasse mit ID:', classId);
  }

  createClass() {
    if (this.newClassName.trim() === '') return;

    this.classService.addClass({ name: this.newClassName }).then(() => {
      console.log('Klasse wurde erstellt');
      this.newClassName = '';
    }).catch(error => {
      console.error('Fehler beim Erstellen der Klasse: ', error);
    });
  }
}