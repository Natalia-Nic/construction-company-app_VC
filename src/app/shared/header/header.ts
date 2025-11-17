import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth'; // ← ДОБАВИЛИ ИМПОРТ
import { CommonModule } from '@angular/common'; // ← ДОБАВИЛИ ДЛЯ *ngIf

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule], // ← ДОБАВИЛИ CommonModule
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  
  constructor(private authService: AuthService) {} // ← ДОБАВИЛИ КОНСТРУКТОР

  get currentUser() {
    return this.authService.getCurrentUser(); // ← ДОБАВИЛИ МЕТОД
  }

  logout() {
    this.authService.logout(); // ← ДОБАВИЛИ МЕТОД
  }
}