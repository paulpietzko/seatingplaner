import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Class, ClassService } from '../shared/services/class.service';

@Component({
  selector: 'app-class-detail',
  templateUrl: './class-detail.component.html',
  styleUrls: ['./class-detail.component.scss']
})
export class ClassDetailComponent implements OnInit {
  classDetails?: Class;

  constructor(
    private route: ActivatedRoute,
    private classService: ClassService
  ) {}

  ngOnInit() {
    const classId = this.route.snapshot.paramMap.get('id');
    if (classId !== null) {
      this.classService.getClassById(+classId).subscribe(
        details => {
          if (details) {
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
}