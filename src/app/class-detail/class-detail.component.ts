import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class, Student, ClassService } from '../shared/services/class.service';

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
    private classService: ClassService
  ) {}

  ngOnInit() {
    const classId = this.route.snapshot.paramMap.get('id');
    if (classId !== null) {
      this.classService.getClassById(+classId).subscribe(
        details => {
          console.log('Class details:', details);  // Debugging output
          if (details) {
            if (!details.students) {
              details.students = [];
              this.classService.updateClass(details);
            }
            this.classDetails = details;
          } else {
            console.log('Klasse nicht gefunden');
          }
        },
        error => {
          console.error('Error fetching class details:', error);
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