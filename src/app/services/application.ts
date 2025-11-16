// src/app/services/application.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Application, CreateApplicationRequest } from '../models/application.model';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://localhost:5248/api/applications';

  constructor(
    private http: HttpClient,
    private authService: AuthService // ДОБАВИЛ
  ) { }

  /**
   * Получить все заявки текущего пользователя
   */
  getMyApplications(): Observable<Application[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Application[]>(`${this.apiUrl}/my`, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Создать новую заявку
   */
  createApplication(application: CreateApplicationRequest): Observable<Application> {
    const headers = this.getAuthHeaders();
    return this.http.post<Application>(this.apiUrl, application, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Получить заявку по ID
   */
  getApplication(id: number): Observable<Application> {
    const headers = this.getAuthHeaders();
    return this.http.get<Application>(`${this.apiUrl}/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Обновить заявку (для подрядчика)
   */
  updateApplication(id: number, updates: any): Observable<Application> {
    const headers = this.getAuthHeaders();
    return this.http.put<Application>(`${this.apiUrl}/${id}`, updates, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * СМЕНИТЬ СТАТУС ЗАЯВКИ (НОВЫЙ МЕТОД)
   */
  updateStatus(id: number, newStatus: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(
      `${this.apiUrl}/${id}/status`, 
      { newStatus: newStatus },
      { headers }
    ).pipe(catchError(this.handleError));
  }

  /**
   * Получить все заявки (для подрядчика)
   */
  getAllApplications(): Observable<Application[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Application[]>(this.apiUrl, { headers })
      .pipe(catchError(this.handleError));
  }

  /**
   * Удалить заявку
   */
  deleteApplication(id: number): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers })
      .pipe(catchError(this.handleError));
  }

  // ПРИВАТНЫЕ МЕТОДЫ

  /**
   * Получить headers с авторизацией
   */
  private getAuthHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Обработка ошибок
   */
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Произошла ошибка';
    if (error.error instanceof ErrorEvent) {
      // Клиентская ошибка
      errorMessage = `Ошибка: ${error.error.message}`;
    } else {
      // Серверная ошибка
      errorMessage = `Код ошибки: ${error.status}\nСообщение: ${error.message}`;
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}