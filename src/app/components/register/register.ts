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

    if (this.registerData.password.length < 3) {
      this.errorMessage = 'Пароль минимум 3 символа';
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
        
        // 🔥 ИСПРАВЛЕННАЯ ОБРАБОТКА ОШИБОК
        if (error.error && typeof error.error === 'string') {
          // Если ошибка в виде строки
          this.errorMessage = error.error;
        } else if (error.error && Array.isArray(error.error)) {
          // Если ошибка в виде массива
          this.errorMessage = error.error.join(', ');
        } else if (error.error && error.error.errors) {
          // Если ошибки в формате Identity (объект)
          const errorMessages = Object.values(error.error.errors).flat();
          this.errorMessage = errorMessages.join(', ');
        } else if (error.error && error.error.message) {
          // Если есть message
          this.errorMessage = error.error.message;
        } else if (error.status === 400) {
          this.errorMessage = 'Ошибка валидации данных';
        } else {
          this.errorMessage = 'Ошибка регистрации. Попробуйте другие данные.';
        }
      }
    });
  }
}