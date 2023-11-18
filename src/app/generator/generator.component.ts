import { Component, OnInit, HostListener } from '@angular/core';
import { Class, Student, ClassService } from '../shared/services/class.service';
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
  selectedClassId: number | null = null;
  classes: Class[] = [];
  selectedClass: Class | null = null;

  constructor(private snackBar: MatSnackBar, private classService: ClassService) {
    this.seats = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => null)
    );
  }

  ngOnInit() {
    this.adjustCols();
    this.loadClasses();
  }

  loadClasses() {
    this.classService.classes$.subscribe(classes => {
      this.classes = classes;
      if (this.classes.length > 0) {
        this.selectedClassId = this.classes[0].id;
        this.selectedClass = this.classes[0];
        this.prepareDisplayNames();
      }
    });
  }

  onClassChange(classId: number) {
    this.selectedClass = this.classes.find(c => c.id === classId) || null;
    this.createSeats();
    if (this.selectedClass) {
      this.prepareDisplayNames();
    }
  }

  prepareDisplayNames(): void {
    if (!this.selectedClass) return;

    const nameCount = new Map<string, number>();

    this.selectedClass.students.forEach(student => {
      const shortName = student.name.slice(0, 3).toUpperCase();
      let count = nameCount.get(shortName) || 0;

      student.shortName = shortName;
      student.numberSuffix = count > 0 ? `(${count + 1})` : '';

      nameCount.set(shortName, count + 1);
    });
  }

  assignStudentToSeat(row: number, col: number): void {
    const availableStudents = this.selectedClass?.students.filter(
      (student) => !this.seats.flat().includes(student)
    ) || [];

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

  adjustCols() {
    const screenWidth = window.innerWidth;
    const maxCols = Math.floor((screenWidth * 0.9) / 60);
    this.cols = Math.min(maxCols, 15);
    this.createSeats();
  }

  createSeats() {
    this.seats = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => null)
    );
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event) {
    this.adjustCols();
  }
}