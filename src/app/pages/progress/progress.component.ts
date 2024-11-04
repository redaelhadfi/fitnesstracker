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
  suggestions: string = '';

  constructor(private progressService: ProgressService) { }

  ngOnInit(): void {
    this.getProgress('username', '2024-10-28');
  }

  getProgress(username: string, date: string): void {
    this.progressService.getDailyProgress(username, date).subscribe(data => {
      this.progress = data;
    });
    this.getSuggestions(username);
  }

  getSuggestions(username: string): void {
    this.progressService.getSuggestions(username).subscribe(data => {
      this.suggestions = data;
    });
  }
}
