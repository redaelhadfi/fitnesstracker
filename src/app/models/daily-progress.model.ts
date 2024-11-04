export interface DailyProgress {
    id?: number;
    caloriesConsumed: number;
    caloriesBurned: number;
    netCalories: number;  // Add this if it's missing
    date: string;
    userId: number;
  }
  