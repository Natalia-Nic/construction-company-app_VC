// src/app/components/login/login.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, LoginRequest } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {
  // Данные формы
  loginData: LoginRequest = {
    email: '',
    password: ''
  };
  
  // Состояние компонента
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  /**
   * Обработка отправки формы входа
   */
  onSubmit(): void {
    // Сброс ошибок
    this.errorMessage = '';
    
    // Валидация
    if (!this.loginData.email || !this.loginData.password) {
      this.errorMessage = 'Пожалуйста, заполните все поля';
      return;
    }

    this.isLoading = true;

    // Вызов сервиса аутентификации
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.isLoading = false;
        
        // Перенаправление в зависимости от роли
        if (response.user.role === 'Contractor' || response.user.role === 'Admin') {
          this.router.navigate(['/contractor']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        
        // Обработка ошибок
        if (error.status === 401) {
          this.errorMessage = 'Неверный email или пароль';
        } else if (error.status === 400) {
          this.errorMessage = 'Некорректные данные';
        } else {
          this.errorMessage = 'Ошибка сервера. Попробуйте позже.';
        }
        
        console.error('Login error:', error);
      }
    });
  }

  /**
   * Быстрый вход для тестирования (можно удалить в продакшене)
   */
  quickLogin(role: string): void {
    switch (role) {
      case 'client':
        this.loginData = { email: 'client@test.com', password: 'Password123!' };
        break;
      case 'contractor':
        this.loginData = { email: 'contractor@test.com', password: 'Password123!' };
        break;
    }
  }
}