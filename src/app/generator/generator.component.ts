import { Component, OnInit } from '@angular/core';
import { Class, Student } from '../shared/models/class.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})

export class GeneratorComponent implements OnInit {
  rows: number = 5;
  cols: number = 10;
  seats: (Student | null)[][];
  selectedClass: Class;

  constructor(private snackBar: MatSnackBar) {
    this.seats = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => null)
    );

    this.selectedClass = {
      id: 1,
      name: 'Klasse 10A',
      students: [
        { id: 1, name: 'Alina' },
        { id: 2, name: 'Max' },
        { id: 3, name: 'Peter' },
        { id: 4, name: 'Susanne' },
        { id: 5, name: 'Tim' },
        { id: 6, name: 'Timmi' },
      ],
    };
  }

  assignStudentToSeat(row: number, col: number): void {
    const availableStudents = this.selectedClass.students.filter(
      (student) => !this.seats.flat().includes(student)
    );

    if (availableStudents.length === 0) {
      this.snackBar.open('Alle Schüler sind bereits platziert.', 'X', {
        duration: 3000,
      });
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableStudents.length);
    const student = availableStudents[randomIndex];

    this.seats[row][col] = student;
  }

  ngOnInit() {
    this.prepareDisplayNames();
  }

  prepareDisplayNames(): void {
    const nameCount = new Map<string, number>();

    this.selectedClass.students.forEach(student => {
      let shortName = student.name.slice(0, 3).toUpperCase();
      let count = nameCount.get(shortName) || 0;

      if (count > 0) {
        shortName += `(${count + 1})`;
      }
      
      nameCount.set(shortName, count + 1);
      student.displayName = shortName;
    });
  }
}