import { Component, OnInit, HostListener } from '@angular/core';
import { Class, Student } from '../shared/models/class.models';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})

export class GeneratorComponent implements OnInit {
  rows: number = 6;
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
      studentsCount: 0,  // Add this
      creationDate: new Date(),  // Add this
      students: [],
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

  maxColWidth: number = 60;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustCols();
  }

  ngOnInit() {
    this.prepareDisplayNames();
    this.adjustCols();
  }

  adjustCols() {
    const screenWidth = window.innerWidth;
    const maxCols = Math.floor((screenWidth * 0.9) / this.maxColWidth);
    this.cols = Math.min(maxCols, 15);
    this.createSeats();
  }

  createSeats() {
    this.seats = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => null)
    );
  }

  prepareDisplayNames(): void {
    const nameCount = new Map<string, number>();
  
    this.selectedClass.students.forEach(student => {
      const shortName = student.name.slice(0, 3).toUpperCase();
      let count = nameCount.get(shortName) || 0;
      
      // Speichern Sie die Nummer separat, wenn es Duplikate gibt.
      student.shortName = shortName;
      student.numberSuffix = count > 0 ? `(${count + 1})` : '';
      
      nameCount.set(shortName, count + 1);
    });
  }
}