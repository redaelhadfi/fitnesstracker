import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DailyProgress } from '../models/daily-progress.model';

@Injectable({
  providedIn: 'root'
})
export class ProgressService {

  private apiUrl = 'http://localhost:8080/progress';

  constructor(private http: HttpClient) { }

  getDailyProgress(username: string, date: string): Observable<DailyProgress> {
    return this.http.get<DailyProgress>(`${this.apiUrl}/daily?username=${username}&date=${date}`);
  }

  getSuggestions(username: string): Observable<string> {
    return this.http.get<string>(`${this.apiUrl}/suggestions?username=${username}`);
  }
}
