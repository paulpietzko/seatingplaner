import { Injectable } from '@angular/core';
import { Student } from '../models/class.models';

@Injectable({ providedIn: 'root' })
export class PairingService {
  private mustSitTogether: [Student, Student][] = [];

  addMustSitTogetherPair(studentOne: Student, studentTwo: Student) {
    const pairExists = this.mustSitTogether.some(pair =>
      (pair[0] === studentOne && pair[1] === studentTwo) ||
      (pair[0] === studentTwo && pair[1] === studentOne)
    );
    if (!pairExists) {
      this.mustSitTogether.push([studentOne, studentTwo]);
    }
  }

  getMustSitTogetherPairs(): [Student, Student][] {
    return this.mustSitTogether;
  }
}