import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Meal } from '../models/meal.model';
import { FoodDTO } from '../models/food.model';
import { AuthService } from './AuthService';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private apiUrl = 'http://localhost:8080/api/meals';
  private foodsApiUrl = 'http://localhost:8080/api/foods';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Fetch all meals
  getMeals(): Observable<Meal[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Meal[]>(`${this.apiUrl}/all`, { headers });
  }

  // Log a new meal
  logMeal(meal: Meal): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`${this.apiUrl}/log`, meal, { headers });
  }

  // Search for foods by description
  searchFoods(query: string): Observable<FoodDTO[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<FoodDTO[]>(`${this.foodsApiUrl}/search`, {
      headers,
      params: { query }
    });
  }

  // Calculate nutrition for a food item based on grams
  calculateNutrition(foodId: number, grams: number): Observable<FoodDTO> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<FoodDTO>(`${this.foodsApiUrl}/calculate`, {
      headers,
      params: {
        id: foodId.toString(),
        grams: grams.toString()
      }
    });
  }
}
