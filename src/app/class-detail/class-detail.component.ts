import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Class, Student } from '../shared/models/class.models';
import { ClassService } from '../shared/services/class.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss']
})

export class ClassDetailComponent implements OnInit {
  classDetails?: Class;
  newStudentName: string = '';
  hoveredStudent: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private classService: ClassService,
    private router: Router
  ) {}

  ngOnInit() {
    const classId = this.route.snapshot.paramMap.get('id'); // Holt Klassen-ID aus Route
    if (classId) {
      this.classService.getClassById(classId).subscribe( // Abonniert Klassendetails
        details => {
          if (details) {
            if (!details.students) {
              details.students = []; // Initialisiert Schülerliste
              this.classService.updateClass(details);
            }
            this.classDetails = details; // Setzt Klassendetails
          }
        }
      );
    }
  }

  addStudent() {
    if (this.newStudentName.trim() && this.classDetails) { // Überprüft Schülername Gültigkeit
      const newStudent: Student = {
        id: Date.now(),
        name: this.newStudentName
      };
      this.classDetails.students.push(newStudent);
      this.classDetails.studentsCount = this.classDetails.students.length;
      this.newStudentName = '';
      this.classService.updateClass(this.classDetails);
    }
  }

  removeStudent(index: number) {
    if (this.classDetails) {
      this.classDetails.students.splice(index, 1); // Entferne Schüler an Index
      this.classDetails.studentsCount = this.classDetails.students.length;
      this.classService.updateClass(this.classDetails);
    }
  }
}