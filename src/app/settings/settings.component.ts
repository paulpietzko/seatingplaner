import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from '../shared/models/class.models';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  isPairingsOpen: boolean = false;
  isAntiPairingsOpen: boolean = false;
  mustSitTogether: [Student, Student][] = [];
  mustNotSitTogether: [Student, Student][] = [];
  
  @Input() students: Student[] = [];

  selectedStudentOneId: string | undefined;
  selectedStudentTwoId: string | undefined;
  selectedStudentOneAntiId: string | undefined;
  selectedStudentTwoAntiId: string | undefined;

  constructor(private snackBar: MatSnackBar) { }

  // Methods to toggle the visibility of each section
  togglePairings() {
    this.isPairingsOpen = !this.isPairingsOpen;
  }

  toggleAntiPairings() {
    this.isAntiPairingsOpen = !this.isAntiPairingsOpen;
  }

  handlePairSelection(studentOneId?: string, studentTwoId?: string, isMustSitTogether?: boolean) {
    if (!studentOneId || !studentTwoId || isMustSitTogether === undefined) {
      this.snackBar.open('Bitte wählen Sie zwei Schüler aus und geben Sie an, ob sie zusammensitzen müssen oder nicht.', 'Schließen', { duration: 3000 });
      return;
    }
  

    const studentOne = this.students.find(s => s.id.toString() === studentOneId);
    const studentTwo = this.students.find(s => s.id.toString() === studentTwoId);

    if (studentOne && studentTwo) {
      this.addPair(isMustSitTogether ? this.mustSitTogether : this.mustNotSitTogether, studentOne, studentTwo, isMustSitTogether);
    } else {
      this.snackBar.open('Schüler nicht gefunden.', 'Schließen', { duration: 3000 });
    }
  }

  addPair(pairArray: [Student, Student][], studentOne: Student, studentTwo: Student, isMustSitTogether: boolean) {
    const oppositeArray = isMustSitTogether ? this.mustNotSitTogether : this.mustSitTogether;
    const isPairInOppositeArray = oppositeArray.some(pair =>
      (pair[0] === studentOne && pair[1] === studentTwo) ||
      (pair[0] === studentTwo && pair[1] === studentOne)
    );

    if (isPairInOppositeArray) {
      this.snackBar.open('Dieses Paar ist bereits in der gegensätzlichen Liste.', 'Verstanden', {
        duration: 3000,
      });
      return;
    }

    pairArray.push([studentOne, studentTwo]);
  }

  getPairingsDisplay(pairings: [Student, Student][]): string {
    return pairings.map(pair => `${pair[0].name} & ${pair[1].name}`).join(', ');
  }
}