import { Component, OnInit } from '@angular/core';
import { MealsService } from '../../services/meals.service';
import { Meal } from '../../models/meal.model';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrls: ['./suggestions.component.css']
})
export class SuggestionsComponent implements OnInit {
  suggestions: string[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private mealsService: MealsService) {}

  ngOnInit(): void {
    this.fetchSuggestions();
  }

  fetchSuggestions(): void {
    this.mealsService.getMeals().subscribe({
      next: (meals) => {
        // Only proceed with meals data
        this.mealsService.getSuggestions(meals).subscribe({
          next: (response) => {
            this.suggestions = response.suggestions;
            this.isLoading = false;
          },
          error: (error) => {
            this.errorMessage = 'Unable to load suggestions. Try again later.';
            this.isLoading = false;
          }
        });
      },
      error: (error) => {
        this.errorMessage = 'Unable to load meals. Please try again later.';
        this.isLoading = false;
      }
    });
  }
}
