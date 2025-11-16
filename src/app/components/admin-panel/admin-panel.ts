import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-admin-panel',
  imports: [CommonModule],
  templateUrl: './admin-panel.html',
  styleUrl: './admin-panel.scss',
})
export class AdminPanel implements OnInit {
  users: User[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Ошибка загрузки пользователей';
        this.loading = false;
        console.error('Error loading users:', error);
      }
    });
  }

  changeUserRole(userId: string, newRole: string): void {
    this.userService.updateUserRole(userId, newRole).subscribe({
      next: (response) => {
        alert('Роль пользователя обновлена!');
        this.loadUsers();
      },
      error: (error) => {
        alert('Ошибка обновления роли: ' + error.message);
      }
    });
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('ru-RU');
  }
}