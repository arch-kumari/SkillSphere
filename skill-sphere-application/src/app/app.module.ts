import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomepageComponent } from './welcomepage/welcomepage.component';
import { ReadMoreComponent } from './read-more/read-more.component';
import { GetInTouchComponent } from './get-in-touch/get-in-touch.component';
import { FooterComponent } from './footer/footer.component';
import { CreateClassComponent } from './create-class/create-class.component';
import { CoachesComponent } from './coaches/coaches.component';
import { ClassesComponent } from './classes/classes.component';
import { ClassComponent } from './class/class.component';
import { HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { ClassesService } from './service/classes.service';
import { ClassService } from './service/class.service';
import { CoachesService } from './service/coaches.service';
import { RegisterclassService } from './service/registerclass.service';
import { InstructorDashboardComponent } from './instructor-dashboard/instructor-dashboard.component';
import { UpdateClassComponent } from './update-class/update-class.component';
import { InstructorDashboardService } from './service/instructor-dashboard.service';
import { LoggingService } from './service/logging.service';

@NgModule({
  declarations: [
    AppComponent,
    WelcomepageComponent,
    ReadMoreComponent,
    GetInTouchComponent,
    FooterComponent,
    CreateClassComponent,
    CoachesComponent,
    ClassesComponent,
    ClassComponent,
    InstructorDashboardComponent,
    UpdateClassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [ClassesService,CoachesService,RegisterclassService,ClassService,InstructorDashboardService,LoggingService,
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
