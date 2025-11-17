// src/app/components/login/login.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Вход в систему</h2>
        
        <form (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label>Email</label>
            <input
              type="email"
              [(ngModel)]="email"
              name="email"
              placeholder="Введите email"
              required>
          </div>

          <div class="form-group">
            <label>Пароль</label>
            <input
              type="password"
              [(ngModel)]="password"
              name="password"
              placeholder="Введите пароль"
              required>
          </div>

          <div *ngIf="errorMessage" class="error-message">
            {{ errorMessage }}
          </div>

          <button
            type="submit"
            class="login-btn"
            [disabled]="!email || !password || isLoading">
            {{ isLoading ? 'Вход...' : 'Войти' }}
          </button>
        </form>

        <p class="register-link">
          Нет аккаунта? <a routerLink="/register">Зарегистрироваться</a>      
        </p>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }

    .login-card {
      background: white;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      width: 100%;
      max-width: 400px;
    }

    h2 {
      text-align: center;
      color: #2c3e50;
      margin-bottom: 30px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    label {
      display: block;
      margin-bottom: 5px;
      font-weight: 500;
      color: #2c3e50;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
    }

    input:focus {
      outline: none;
      border-color: #3498db;
    }

    .login-btn {
      width: 100%;
      padding: 12px;
      background: #2c3e50;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      cursor: pointer;
      margin-top: 10px;
    }

    .login-btn:hover:not(:disabled) {
      background: #34495e;
    }

    .login-btn:disabled {
      background: #bdc3c7;
      cursor: not-allowed;
    }

    .error-message {
      color: #e74c3c;
      background: #ffeaea;
      padding: 10px;
      border-radius: 4px;
      margin: 10px 0;
      font-size: 14px;
    }

    .register-link {
      text-align: center;
      margin-top: 20px;
      color: #7f8c8d;
    }

    .register-link a {
      color: #3498db;
      text-decoration: none;
    }

    .register-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class Login {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.errorMessage = 'Заполните все поля';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login({email: this.email, password: this.password}).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading = false;
        this.errorMessage = 'Неверный email или пароль';
      }
    });
  }
}