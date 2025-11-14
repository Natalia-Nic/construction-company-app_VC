// src/app/services/auth.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router'; // ← ДОБАВЬ ЭТОТ ИМПОРТ!

// Модели для аутентификации
export interface RegisterRequest {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    fullName: string;
    phone?: string;
    role: string;
  };
}

export interface User {
  id: string;
  email: string;
  fullName: string;
  phone?: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5248/api/auth';
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router // ← ДОБАВЬ ROUTER В КОНСТРУКТОР!
  ) {
    // При загрузке приложения проверяем есть ли сохраненный токен
    this.loadUserFromStorage();
  }

  // ============================================================================
  // РЕГИСТРАЦИЯ НОВОГО ПОЛЬЗОВАТЕЛЯ
  // ============================================================================
  register(registerData: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, registerData)
      .pipe(
        tap(response => {
          this.handleAuthentication(response);
        })
      );
  }

  // ============================================================================
  // ВХОД В СИСТЕМУ
  // ============================================================================
  login(loginData: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, loginData)
      .pipe(
        tap(response => {
          this.handleAuthentication(response);
        })
      );
  }

  // ============================================================================
  // ОБРАБОТКА УСПЕШНОЙ АУТЕНТИФИКАЦИИ
  // ============================================================================
  private handleAuthentication(response: AuthResponse): void {
    // Сохраняем JWT токен в localStorage
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    
    // Обновляем текущего пользователя
    this.currentUserSubject.next(response.user);
  }

  // ============================================================================
  // ВЫХОД ИЗ СИСТЕМЫ
  // ============================================================================
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']); // ← ТЕПЕРЬ РОУТЕР РАБОТАЕТ!
  }

  // ============================================================================
  // ЗАГРУЗКА ПОЛЬЗОВАТЕЛЯ ИЗ LOCALSTORAGE
  // ============================================================================
  private loadUserFromStorage(): void {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (token && userStr) {
      const user = JSON.parse(userStr);
      this.currentUserSubject.next(user);
    }
  }

  // ============================================================================
  // ПОЛУЧЕНИЕ ТОКЕНА (для HTTP запросов)
  // ============================================================================
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // ============================================================================
  // ПРОВЕРКА АВТОРИЗАЦИИ
  // ============================================================================
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // ============================================================================
  // ПОЛУЧЕНИЕ ТЕКУЩЕГО ПОЛЬЗОВАТЕЛЯ
  // ============================================================================
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // ============================================================================
  // ПРОВЕРКА РОЛИ ПОЛЬЗОВАТЕЛЯ
  // ============================================================================
  hasRole(role: string): boolean {
    const user = this.currentUserSubject.value;
    return user?.role === role;
  }
}