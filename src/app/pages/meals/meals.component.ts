import { Component, OnInit } from '@angular/core';
import { MealsService } from '../../services/meals.service';
import { AuthService } from '../../services/AuthService';
import { Meal } from '../../models/meal.model';
import { FoodDTO } from '../../models/food.model';

declare const Object: any; // This line ensures TypeScript recognizes Object usage in this context

@Component({
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})
export class MealsComponent implements OnInit {
  mealTypes = ['breakfast', 'lunch', 'dinner', 'snacks'];
  meals: Meal[] = [];
  groupedMeals: Record<string, Meal[]> = {}; 
  foodResults: FoodDTO[] = [];
  selectedFoods: { food: FoodDTO; quantity: number }[] = [];
  foodQuery: string = '';
  foodQuantity: number = 100;
  totalCalories: number = 0;
  totalProtein: number = 0;
  totalFat: number = 0;
  totalCarbs: number = 0;

  totalCaloriesByType: { [key: string]: number } = {};
  successMessage = '';
  errorMessage = '';
  username: string | null = null;

  mealType: string = '';
  description: string = '';

  constructor(private mealsService: MealsService, private authService: AuthService) {}

  ngOnInit(): void {
    this.username = this.authService.getUsernameFromToken();
    if (this.authService.isLoggedIn() && this.username) {
      this.getMeals();
    } else {
      console.error('User is not authenticated.');
      this.errorMessage = 'Authentication required to log meals';
    }
  }

  getMeals(): void {
    this.mealsService.getMeals().subscribe({
      next: (data) => {
        this.meals = data;
        this.groupMealsByDate();
        this.calculateTotalCaloriesForToday();
        this.errorMessage = '';
      },
      error: (err) => {
        console.error('Error fetching meals:', err);
        this.errorMessage = 'Unable to fetch meals. Please try again later.';
      }
    });
  }

  groupMealsByDate(): void {
    this.groupedMeals = {};
    this.meals.forEach((meal) => {
      const date = new Date(meal.timestamp).toLocaleDateString();
      if (!this.groupedMeals[date]) {
        this.groupedMeals[date] = [];
      }
      this.groupedMeals[date].push(meal);
    });
  }

  calculateTotalCaloriesForToday(): void {
    const today = new Date().toLocaleDateString();
    this.totalCaloriesByType = {};
    this.meals
      .filter((meal) => new Date(meal.timestamp).toLocaleDateString() === today)
      .forEach((meal) => {
        if (!this.totalCaloriesByType[meal.mealType]) {
          this.totalCaloriesByType[meal.mealType] = 0;
        }
        this.totalCaloriesByType[meal.mealType] += meal.calories;
      });
  }

  searchFoods(): void {
    if (this.foodQuery.length > 2) {
      this.mealsService.searchFoods(this.foodQuery).subscribe({
        next: (results) => (this.foodResults = results),
        error: (err) => console.error('Error searching foods:', err)
      });
    }
  }

  addFoodToMeal(food: FoodDTO): void {
    if (this.foodQuantity <= 0) return;
    this.selectedFoods.push({ food, quantity: this.foodQuantity });
    this.updateTotalNutrition();
    this.foodQuery = '';
    this.foodResults = [];
  }

  removeFoodFromMeal(index: number): void {
    this.selectedFoods.splice(index, 1);
    this.updateTotalNutrition();
  }

  updateTotalNutrition(): void {
    this.totalCalories = this.totalProtein = this.totalFat = this.totalCarbs = 0;
    for (const { food, quantity } of this.selectedFoods) {
      this.totalCalories += (food.calories * quantity) / 100;
      this.totalProtein += (food.protein * quantity) / 100;
      this.totalFat += (food.fat * quantity) / 100;
      this.totalCarbs += (food.carbs * quantity) / 100;
    }
  }

  logMeal(): void {
    const userId = this.authService.getUserIdFromToken();
    const timestamp = new Date().toISOString();

    const meal: Meal = {
      mealType: this.mealType,
      description: this.description,
      calories: this.totalCalories,
      protein: this.totalProtein,
      fat: this.totalFat,
      carbs: this.totalCarbs,
      timestamp: timestamp,
      userId: userId || 0
    };

    this.mealsService.logMeal(meal).subscribe({
      next: () => {
        this.successMessage = 'Meal logged successfully!';
        this.getMeals();
        this.clearForm();
      },
      error: (error) => {
        console.error('Error logging meal:', error);
        this.errorMessage = 'Error logging meal. Please try again.';
      }
    });
  }

  clearForm(): void {
    this.mealType = '';
    this.description = '';
    this.totalCalories = 0;
    this.totalProtein = 0;
    this.totalFat = 0;
    this.totalCarbs = 0;
    this.selectedFoods = [];
    this.foodQuery = '';
    this.foodQuantity = 100;
  }
}
