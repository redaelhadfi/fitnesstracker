import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { WorkoutComponent } from './pages/workout/workout.component';
import { MealsComponent } from './pages/meals/meals.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent , canActivate: [AuthGuard] },

  { path: 'workout', component: WorkoutComponent , canActivate: [AuthGuard] },
  { path: 'meals', component: MealsComponent , canActivate: [AuthGuard] },
  { path: 'progress', component: ProgressComponent , canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent }, // Login route
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Default route
  { path: '**', redirectTo: '/login', pathMatch: 'full' } // Wildcard route for unmatched paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
