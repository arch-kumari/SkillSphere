import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { ClassesComponent } from './classes/classes.component';
import { CoachesComponent } from './coaches/coaches.component';
import { ClassComponent } from './class/class.component';
import { GetInTouchComponent } from './get-in-touch/get-in-touch.component';
import { ReadMoreComponent } from './read-more/read-more.component';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { CreateClassComponent } from './create-class/create-class.component';
import { UpdateClassComponent } from './update-class/update-class.component';

const routes: Routes = [{ path: '', component: WelcomepageComponent },
{ path: 'classes', component: ClassesComponent },
{ path: 'class/:courseName', component: ClassComponent},
{ path: 'coaches', component: CoachesComponent},
{ path: 'create-course', component: CreateClassComponent },
{ path: 'contact-us', component: GetInTouchComponent},
{ path: 'about-us', component: ReadMoreComponent},
{ path: 'instructor/dashboard', component: InstructorDashboardComponent},
{ path: 'update-course/:courseID', component: UpdateClassComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
