import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: 'Admin' | 'Client' | 'Contractor';
  phone?: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'api/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<User[]> {
    // Временные моковые данные
    const mockUsers: User[] = [
      {id: '1', fullName: 'Иван Петров', email: 'ivan@mail.com', role: 'Client', phone: '123', createdAt: new Date().toISOString()},
      {id: '2', fullName: 'Петр Подрядчик', email: 'petr@mail.com', role: 'Contractor', phone: '456', createdAt: new Date().toISOString()},
      {id: '3', fullName: 'Админ Админов', email: 'admin@mail.com', role: 'Admin', phone: '789', createdAt: new Date().toISOString()}
    ];
    
    return of(mockUsers);
    // return this.http.get<User[]>(this.apiUrl); // закомментировать пока
  }

  changeUserRole(userId: string, role: 'Admin' | 'Client' | 'Contractor'): Observable<any> {
    console.log('Role changed (mock):', userId, role);
    return of({success: true});
    // return this.http.put(`${this.apiUrl}/${userId}/role`, { role });
  }

  updateUserRole(userId: string, role: string): Observable<any> {
    console.log('Role updated (mock):', userId, role);
    return of({success: true});
    // return this.http.patch(`${this.apiUrl}/${userId}`, { role });
  }

  getUserById(userId: string): Observable<User> {
    return of({id: userId, fullName: 'Test', email: 'test@mail.com', role: 'Client', createdAt: new Date().toISOString()});
    // return this.http.get<User>(`${this.apiUrl}/${userId}`);
  }
}