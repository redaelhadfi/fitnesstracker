import { Component, OnInit } from '@angular/core';
import { MealsService } from '../../services/meals.service';
import { Meal } from '../../models/meal.model';
import { ApexOptions } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalCaloriesToday = 0;
  proteinIntakeToday = 0;
  fatIntakeToday = 0;
  carbsIntakeToday = 0;
  mealTypeSeries: number[] = [0, 0, 0, 0];
  mealTypeLabels = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];
  isLoading = true;

  mealTypeDistributionChart: ApexOptions = {};
  dailyCaloriesChart: ApexOptions = {};
  macrosChart: ApexOptions = {};

  constructor(private mealsService: MealsService) {}

  ngOnInit(): void {
    this.loadData();
  }

  private loadData() {
    this.mealsService.getMeals().subscribe({
      next: (meals) => {
        this.calculateTodayMetrics(meals);
        this.calculateMacros(meals);
        this.setupCharts();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading meals data:', error);
        this.isLoading = false;
      }
    });
  }

  private calculateTodayMetrics(meals: Meal[]) {
    const today = new Date().toLocaleDateString();

    this.totalCaloriesToday = 0;
    this.proteinIntakeToday = 0;
    this.fatIntakeToday = 0;
    this.carbsIntakeToday = 0;

    meals
      .filter(meal => new Date(meal.timestamp).toLocaleDateString() === today)
      .forEach(meal => {
        this.totalCaloriesToday += meal.calories || 0;
        this.proteinIntakeToday += meal.protein || 0;
        this.fatIntakeToday += meal.fat || 0;
        this.carbsIntakeToday += meal.carbs || 0;
      });
  }

  private calculateMacros(meals: Meal[]) {
    const mealTypeCounts: { [key: string]: number } = { breakfast: 0, lunch: 0, dinner: 0, snacks: 0 };
    meals.forEach((meal) => {
      const mealType = meal.mealType.toLowerCase() as keyof typeof mealTypeCounts;
      if (mealTypeCounts[mealType] !== undefined) {
        mealTypeCounts[mealType]++;
      }
    });
    this.mealTypeSeries = Object.values(mealTypeCounts);
  }

  private setupCharts() {
    this.mealTypeDistributionChart = {
      series: this.mealTypeSeries,
      chart: {
        type: 'pie',
      },
      labels: this.mealTypeLabels,
      colors: ['#63a4ff', '#83eaf1', '#a1c4fd', '#ff7e5f'],
    };

    this.dailyCaloriesChart = {
      series: [{ name: 'Calories', data: [300, 450, 600, 400, 500, 700] }],
      chart: {
        type: 'line',
        height: 350,
      },
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      colors: ['#ff9a8b'],
      stroke: { curve: 'smooth' },
    };

    this.macrosChart = {
      series: [
        { name: 'Protein', data: [20, 30, 25, 35, 40, 30, 25] },
        { name: 'Fat', data: [10, 15, 12, 20, 18, 15, 12] },
        { name: 'Carbs', data: [50, 70, 65, 80, 75, 60, 55] },
      ],
      chart: {
        type: 'bar',
        height: 350,
        stacked: true,
      },
      colors: ['#f093fb', '#63a4ff', '#c3cfe2'],
      xaxis: {
        categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
    };
  }
}
