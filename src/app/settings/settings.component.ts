import { Component, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Student } from '../shared/models/class.models';
import { PairingService } from '../shared/services/PairingService';

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

  @Input() students: Student[] = []; // Bekommt Student Array vom Generator HTML

  selectedStudentOneId: string | undefined;
  selectedStudentTwoId: string | undefined;
  selectedStudentOneAntiId: string | undefined;
  selectedStudentTwoAntiId: string | undefined;

  constructor(private snackBar: MatSnackBar, private pairingService: PairingService) { }

  togglePairings() {
    this.isPairingsOpen = !this.isPairingsOpen;
  }

  toggleAntiPairings() {
    this.isAntiPairingsOpen = !this.isAntiPairingsOpen;
  }

  handlePairSelection(studentOneId?: string, studentTwoId?: string, isMustSitTogether?: boolean) {
    if (!studentOneId || !studentTwoId || isMustSitTogether === undefined) {
      this.snackBar.open('Bitte wählen Sie zwei Schüler aus und geben Sie an, ob sie zusammensitzen müssen oder nicht.', 'Schliessen', { duration: 3000 });
      return;
    }

    const studentOne = this.students.find(s => s.id.toString() === studentOneId);
    const studentTwo = this.students.find(s => s.id.toString() === studentTwoId);

    if (studentOne && studentTwo) {
      if (isMustSitTogether)
        this.pairingService.addMustSitTogetherPair(studentOne, studentTwo);
    }

    if (studentOne && studentTwo && isMustSitTogether) {
      this.pairingService.addMustSitTogetherPair(studentOne, studentTwo);
    } else {
      this.snackBar.open('Schüler nicht gefunden.', 'Schliessen', { duration: 3000 });
    }
  }

  addPair(pairArray: [Student, Student][], studentOne: Student, studentTwo: Student, isMustSitTogether: boolean) {
    const oppositeArray = isMustSitTogether ? this.mustNotSitTogether : this.mustSitTogether;
    const isPairInOppositeArray = oppositeArray.some(pair => // Stellt fest ob mindestens ein Element Bedingungen erfüllt
      (pair[0] === studentOne && pair[1] === studentTwo) ||
      (pair[0] === studentTwo && pair[1] === studentOne)
    );

    if (isPairInOppositeArray) {
      this.snackBar.open('Dieses Paar ist bereits in der gegensätzlichen Liste.', 'Verstanden', {
        duration: 3000,
      });
      return;
    }

    this.pairingService.addMustSitTogetherPair(studentOne, studentTwo);
  }

  getPairingsDisplay(): string {
    const mustSitTogetherPairs = this.pairingService.getMustSitTogetherPairs();
    const formattedMustSitTogether = mustSitTogetherPairs.map(pair => `${pair[0].name} & ${pair[1].name}`).join(', ');
    return formattedMustSitTogether;
  }
}