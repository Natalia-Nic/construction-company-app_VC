// src/app/services/application.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application, CreateApplicationRequest } from '../models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://localhost:5248/api/applications';

  constructor(private http: HttpClient) { }

  /**
   * Получить все заявки текущего пользователя
   */
  getMyApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}/my`);
  }

  /**
   * Создать новую заявку
   */
  createApplication(application: CreateApplicationRequest): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, application);
  }

  /**
   * Получить заявку по ID
   */
  getApplication(id: number): Observable<Application> {
    return this.http.get<Application>(`${this.apiUrl}/${id}`);
  }

  /**
   * Обновить заявку (для подрядчика)
   */
  updateApplication(id: number, updates: any): Observable<Application> {
    return this.http.put<Application>(`${this.apiUrl}/${id}`, updates);
  }

  /**
   * Получить все заявки (для подрядчика) - ОБНОВЛЕННЫЙ МЕТОД!
   */
  getAllApplications(): Observable<Application[]> {
    return this.http.get<Application[]>(this.apiUrl);
  }

  /**
   * Удалить заявку
   */
  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}