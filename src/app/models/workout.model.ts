export interface Workout {
    id?: number;                 // Matches the Long id in the backend entity
    workoutType: string;         // E.g., running, cycling, etc.
    duration: number;            // Duration in minutes
    caloriesBurned: number;
    timestamp: string;           // LocalDateTime in backend; ISO 8601 date-time string in Angular
    userId: number;              // Reference to the user's ID
  }
  