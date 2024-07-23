import { Component, OnInit } from '@angular/core';
import { ClassesService } from '../service/classes.service';
import { CoachesService } from '../service/coaches.service';
import  ICourseModel  from '../interfaces/ICourseModel';
import  IInstructorOrOrganizerModel  from '../interfaces/IInstructorOrOrganizerModel';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-coaches',
  templateUrl: './coaches.component.html',
  styleUrl: './coaches.component.scss',
  providers: [ClassesService,
    CoachesService]
})
export class CoachesComponent implements OnInit {

  
  instructorsDetails: IInstructorOrOrganizerModel[] = [];

  constructor(private classesService: ClassesService, private coachesService: CoachesService) { }

  ngOnInit(): void {
      this.coachesService.getInstructors().subscribe(instructors => {
      this.instructorsDetails = instructors;
    });
  }
}
