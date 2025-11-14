// src/app/components/register/register.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, RegisterRequest } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  registerData: RegisterRequest = {
    email: '',
    password: '',
    fullName: '',
    phone: '',
    role: 'Client'
  };

  confirmPassword: string = '';
  isLoading: boolean = false;
  errorMessage: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.errorMessage = '';

    if (!this.registerData.email || !this.registerData.password || 
        !this.registerData.fullName || !this.confirmPassword) {
      this.errorMessage = 'Заполните все поля';
      return;
    }

    if (this.registerData.password !== this.confirmPassword) {
      this.errorMessage = 'Пароли не совпадают';
      return;
    }

    if (this.registerData.password.length < 6) {
      this.errorMessage = 'Пароль минимум 6 символов';
      return;
    }

    this.isLoading = true;

    this.authService.register(this.registerData).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.isLoading = false;
        
        console.error('Registration error:', error);
        
        // Показываем реальную ошибку от сервера
        if (error.error && error.error.errors) {
          // Ошибки валидации Identity
          const errorMessages = error.error.errors.map((e: any) => e.description).join(', ');
          this.errorMessage = errorMessages;
        } else if (error.error && typeof error.error === 'string') {
          // Текстовая ошибка
          this.errorMessage = error.error;
        } else if (error.status === 400) {
          // Общая 400 ошибка
          this.errorMessage = 'Ошибка валидации данных';
        } else {
          this.errorMessage = 'Ошибка регистрации';
        }
      }
    });
  }
}