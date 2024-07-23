import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../service/classes.service';
import { CoachesService } from '../service/coaches.service';
import  ICourseModel  from '../interfaces/ICourseModel';
import  IInstructorOrOrganizerModel  from '../interfaces/IInstructorOrOrganizerModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.scss'],
  providers: [ClassesService,
    CoachesService]
})
export class ClassesComponent implements OnInit {

  coursesWithInstructors: any[] = [];

  courses: Observable<ICourseModel[]>| undefined; // Initialize as undefined

  constructor(private classesService: ClassesService, private coachesService: CoachesService) { }

  ngOnInit(): void {
    this.classesService.getCourses().subscribe(courses => {
      courses.forEach(course => {
        this.coachesService.getInstructorNameUsingId(course.instructorID).subscribe(instructor => {
          this.coursesWithInstructors.push({ course, instructor });
        });
      });
    });
  }
}

