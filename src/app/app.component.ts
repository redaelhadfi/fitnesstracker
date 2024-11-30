// src/app/app.component.ts
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username: string | null = null;
  dropdownOpen = false;
  loggedIn = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void {
    this.loggedIn = this.authService.isLoggedIn();
    this.username = this.loggedIn ? this.authService.getUsernameFromToken() : null;
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout(): void {
    this.authService.logout();
    this.loggedIn = false;
    this.router.navigate(['/login']);
  }
}
