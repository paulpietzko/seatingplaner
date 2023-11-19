import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class, Student, ClassService } from '../shared/services/class.service';
import { Router } from '@angular/router';

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
  ) { }

  navigateHome() {
    this.router.navigate(['../home/']);
  }

  navigateGenerator() {
    this.router.navigate(['../generator/']);
  }

  ngOnInit() {
    const classId = this.route.snapshot.paramMap.get('id');
    const id = Number(classId);
    if (!isNaN(id) && id > 0) {
      this.classService.getClassById(id).subscribe(
        details => {
          if (details) {
            if (!details.students) { // Initialisiert 'students' Liste, falls noch nicht vorhanden
              details.students = [];
              this.classService.updateClass(details);
            }
            this.classDetails = details;
          }
        }
      );
    }
  }

  addStudent() {
    if (this.newStudentName.trim() && this.classDetails) {
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
      this.classDetails.students.splice(index, 1);
      this.classDetails.studentsCount = this.classDetails.students.length;
      this.classService.updateClass(this.classDetails);
    }
  }
}