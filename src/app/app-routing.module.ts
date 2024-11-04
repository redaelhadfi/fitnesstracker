import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WorkoutComponent } from './pages/workout/workout.component';
import { MealsComponent } from './pages/meals/meals.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'workout', component: WorkoutComponent },
  { path: 'meals', component: MealsComponent },
  { path: 'progress', component: ProgressComponent },
  { path: 'login', component: LoginComponent }, // Login route
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/login', pathMatch: 'full' } // Wildcard route for unmatched paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
