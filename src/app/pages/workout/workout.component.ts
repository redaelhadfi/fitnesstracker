// src/app/pages/workout/workout.component.ts
import { Component, OnInit } from '@angular/core';
import { Workout } from '../../models/workout.model'; // Ensure this path is correct

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {
  workouts: Workout[] = [
    {
      name: 'Full Body Workout',
      description: 'A complete workout targeting all major muscle groups.',
      duration: '45 minutes',
      level: 'Intermediate',
      exercises: ['Push-ups', 'Squats', 'Lunges', 'Burpees']
    },
  
    {
      name: 'Core Workout',
      description: 'A workout focusing on the core muscles.',
      duration: '30 minutes',
      level: 'Beginner',
      exercises: ['Plank', 'Crunches', 'Leg raises', 'Russian twists']
    }
    ,{
      name: 'Leg Workout',
      description: 'A workout focusing on the leg muscles.',
      duration: '30 minutes',
      level: 'Beginner',
      exercises: ['Squats', 'Lunges', 'Leg press', 'Calf raises']
    },
    {
      name: 'Upper Body Workout',
      description: 'A workout focusing on the upper body muscles.',
      duration: '30 minutes',
      level: 'Beginner',
      exercises: ['Push-ups', 'Pull-ups', 'Bench press', 'Shoulder press']
    }
    ,
    {
      name: 'Cardio Workout',
      description: 'A workout focusing on cardiovascular fitness.',
      duration: '30 minutes',
      level: 'Beginner',
      exercises: ['Running', 'Cycling', 'Jumping jacks', 'Burpees']
    }
    
  ];

  constructor() {}

  ngOnInit(): void {}
}
