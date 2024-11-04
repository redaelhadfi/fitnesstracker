// src/app/models/meal.model.ts

export interface Meal {
  id?: number;
  mealType: string;
  description: string;
  calories: number;
  protein: number; // Added protein
  fat: number;     // Added fat
  carbs: number;   // Added carbs
  timestamp: string; // Backend date-time, displayed as 'timestamp' in Angular
  userId: number;
}
