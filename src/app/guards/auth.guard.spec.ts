import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/AuthService';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { inject } from '@angular/core';

describe('AuthGuard', () => {
  let authService: jasmine.SpyObj<AuthService>;
  let router: Router;
  let guard: AuthGuard;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });

    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router);
    guard = TestBed.inject(AuthGuard);
  });

  it('should allow activation if the user is logged in', () => {
    authService.isLoggedIn.and.returnValue(true);
    const canActivate = guard.canActivate() as boolean;

    expect(canActivate).toBeTrue();
  });

  it('should block activation and redirect if the user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);
    const canActivate = guard.canActivate() as boolean;

    expect(canActivate).toBeFalse();
  });
});