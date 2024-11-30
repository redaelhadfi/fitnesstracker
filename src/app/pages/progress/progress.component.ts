import { Component, OnInit } from '@angular/core';
import { ProgressService } from '../../services/progress.service';
import { DailyProgress } from '../../models/daily-progress.model';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  progress: DailyProgress | null = null;
  suggestions: string[] = [];
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private progressService: ProgressService) {}

  ngOnInit(): void {
    const username = this.getCurrentUsername();
    const today = this.getTodayDate();
    this.fetchProgress(username, today);
    this.fetchSuggestions(username);
  }

  /**
   * Fetch progress data for the user.
   */
  fetchProgress(username: string, date: string): void {
    this.isLoading = true;
    this.progressService.getDailyProgress(username, date).subscribe(
      (data) => {
        this.progress = data;
        this.isLoading = false;
      },
      (err) => {
        this.error = 'Failed to load progress. Please try again later.';
        console.error('Error fetching progress:', err);
        this.isLoading = false;
      }
    );
  }

  /**
   * Fetch AI suggestions for the user.
   */
  fetchSuggestions(username: string): void {
    this.progressService.getSuggestions(username).subscribe(
      (data) => {
        this.suggestions = Array.isArray(data) ? data : [data];
      },
      (err) => {
        console.error('Error fetching suggestions:', err);
        this.suggestions = ['Unable to fetch suggestions at this time.'];
      }
    );
  }

  /**
   * Mock function to get the current username (replace with actual logic).
   */
  private getCurrentUsername(): string {
    return 'test_user'; // Replace with actual username fetching logic
  }

  /**
   * Get today's date in `YYYY-MM-DD` format.
   */
  private getTodayDate(): string {
    return new Date().toISOString().split('T')[0];
  }
}
