import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Workout } from '../models/workout.model';

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {

  private apiUrl = 'http://localhost:8080/workouts';

  constructor(private http: HttpClient) { }

  logWorkout(workout: Workout): Observable<any> {
    return this.http.post(`${this.apiUrl}/log`, workout);
  }

  getWorkouts(username: string): Observable<Workout[]> {
    return this.http.get<Workout[]>(`${this.apiUrl}/all?username=${username}`);
  }
}
