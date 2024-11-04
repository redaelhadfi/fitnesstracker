import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module'; // Ensure this import is correct

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WorkoutComponent } from './pages/workout/workout.component';
import { MealsComponent } from './pages/meals/meals.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { LoginComponent } from './pages/login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  imports: [NgApexchartsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatSelectModule,
    MatListModule,
    BrowserModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule, // Ensure AppRoutingModule is in imports
    FormsModule
  ],
  
  declarations: [
    AppComponent,
    DashboardComponent,
    WorkoutComponent,
    MealsComponent,
    ProgressComponent,
    LoginComponent
  ],

  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
