import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './components/LoginPage/login-page/login-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SignUpComponent } from './components/SignUpPage/sign-up/sign-up.component';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { HttpConfigInterceptor } from './Services/httpInterceptor/httpconfig.interceptor';
import { HomeComponent } from './components/HomePage/home/home.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CreateSurveyComponent } from './components/create-survey/create-survey.component';
import { MatRadioModule} from '@angular/material/radio';
// import { MatDatepickerModule} from '@angular/material/datepicker';
// import { MatNativeDateModule} from '@angular/material/core'
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
// import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from 'ngx-mat-datetime-picker';
import { McQsOptionComponent } from './components/mc-qs-option/mc-qs-option.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MySurveyComponent } from './components/MySurvey/survey.component';
import { SurveyComponent } from './components/Survey/survey.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SurveyRecordComponent } from './components/survey-record/survey-record.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogOverviewExampleDialog } from "./components/HomePage/home/home.component"

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    SignUpComponent,
    HomeComponent,
    DashboardComponent,
    MySurveyComponent,
    SurveyComponent,
    ProfileComponent,
    CreateSurveyComponent,
    McQsOptionComponent,
    SurveyRecordComponent,
    DialogOverviewExampleDialog,
    LandingPageComponent  ],
  imports: [
    BrowserModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSelectModule,
    AppRoutingModule,
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    MatDialogModule,
    // MatDatepickerModule,
    // MatNativeDateModule,
    ReactiveFormsModule, 
    // NgxMatTimepickerModule,
    // NgxMatDatetimePickerModule,
    MatPaginatorModule,
    MatCheckboxModule
    // FormControl 
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    // MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
