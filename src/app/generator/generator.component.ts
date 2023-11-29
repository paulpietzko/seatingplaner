import { Component, OnInit, HostListener } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Class, Student } from '../shared/models/class.models';
import { ClassService } from '../shared/services/class.service';
import { PairingService } from '../shared/services/PairingService';

@Component({
  selector: 'app-generator',
  templateUrl: './generator.component.html',
  styleUrls: ['./generator.component.scss']
})

export class GeneratorComponent implements OnInit {
  rows: number = 6;
  cols: number = 10;
  seats: (Student | null)[][]; // 2 Dimensionales Array für Sitze
  selectedClassId: string | null = null;
  selectedClass: Class | null = null;
  classes: Class[] = [];
  students: Student[] = [];
  mustSitTogether: [Student, Student][] = [];

  constructor(
    private snackBar: MatSnackBar,
    private classService: ClassService,
    private pairingService: PairingService
  ) {
    this.seats = Array.from({ length: this.rows }, () => // Initialisiert Sitzplätze
      Array.from({ length: this.cols }, () => null)
    );
  }

  loadStudents() {
    this.classService.getClasses().subscribe(classes => {  // Wird als veraltet oder nicht best practice angesehen | Verbesserung: destroy$
      if (classes.length > 0) {
        this.students = classes[0].students;
      } else {
        this.students = [];
        this.snackBar.open('Keine Klassen gefunden.', 'Schließen', {
          duration: 3000,
        });
      }
    }, error => {
      this.snackBar.open('Fehler beim Laden der Klassen.', 'Schließen', {
        duration: 3000,
      });
    });
  }

  ngOnInit() {
    this.loadStudents();
    this.adjustCols();
    this.loadClasses();
  }

  loadClasses() {
    this.classService.getClasses().subscribe(classes => {
      this.classes = classes;
      if (this.classes.length > 0) {
        this.selectedClassId = this.classes[0].id;
        this.selectedClass = this.classes[0];
        this.prepareDisplayNames();
      }
    });
  }

  onClassChange(classId: string) {
    this.selectedClass = this.classes.find(c => c.id === classId) || null;
    this.createSeats();
    if (this.selectedClass) {
      this.prepareDisplayNames();
    }
  }

  prepareDisplayNames(): void {
    if (!this.selectedClass) return;

    // wie oft kommt ein bestimmter gekürzter Name vor
    const nameCount = new Map<string, number>(); // Datenstruktur, mit Schlüssel-Wert-Paaren

    this.selectedClass.students.forEach(student => {
      const shortName = student.name.slice(0, 3).toUpperCase();
      let count = nameCount.get(shortName) || 0;

      student.shortName = shortName;
      student.numberSuffix = count > 0 ? `(${count + 1})` : ''; // Suffix für Duplikate

      nameCount.set(shortName, count + 1); // Aktualisiert Zählung in Map um +1
    });
  }

  assignStudentToSeat(row: number, col: number): void {
    const availableStudents = this.selectedClass?.students.filter( // Filtert Schüler, die noch nicht Seats zugeteilt wurden
      (student) => !this.seats.flat().includes(student) // Verschachtelte Ebenen des Arrays werden entfernt
    ) || [];

    if (availableStudents.length === 0) {
      this.snackBar.open('Alle Schüler sind bereits platziert.', 'X', {
        duration: 4000,
      });
      return;
    }

    const randomIndex = Math.floor(Math.random() * availableStudents.length); // Zufälliger Schüler
    const student = availableStudents[randomIndex];
    const mustSitTogetherPairs = this.pairingService.getMustSitTogetherPairs();
    const pair = mustSitTogetherPairs.find(pair => pair[0] === student || pair[1] === student);

    if (pair) {
      const partner = pair[0] === student ? pair[1] : pair[0];
  
      // Versuchen, den Partner links oder rechts zu platzieren
      if (col > 0 && this.seats[row][col - 1] === null) {
        this.seats[row][col - 1] = partner;
      } else if (col < this.cols - 1 && this.seats[row][col + 1] === null) {
        this.seats[row][col + 1] = partner;
      } else {
        // Wenn kein Platz vorhanden, normale Zuweisung durchführen
        this.snackBar.open('Kein Platz für das Paar neben einander.', 'X', {
          duration: 4000,
        });
      }
    }
  
    // Platzieren des ursprünglichen Schülers
    this.seats[row][col] = student;
  }

  adjustCols() {
    const screenWidth = window.innerWidth;
    const maxCols = Math.floor((screenWidth * 0.8) / 60);
    this.cols = Math.min(maxCols, 15);
    this.createSeats();
  }

  createSeats() {
    this.seats = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.cols }, () => null)
    );
  }

  @HostListener('window:resize', ['$event']) // Decorator, um auf Ereignis zu hören
  onResize(event: Event) {
    this.adjustCols();
  }
}