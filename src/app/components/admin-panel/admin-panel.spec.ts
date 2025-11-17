import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class AdminPanel implements OnInit {
  users: User[] = [];
  loading = false;
  error: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.error = null;

    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Ошибка при загрузке пользователей';
        console.error(err);
        this.loading = false;
      }
    });
  }

  getUserRoleLabel(role: string): string {
    switch (role) {
      case 'Admin':
        return 'Администратор';
      case 'Client':
        return 'Клиент';
      case 'Contractor':
        return 'Подрядчик';
      default:
        return 'Неизвестно';
    }
  }

  formatDate(date?: Date | string): string {
    if (!date) return 'Не указана';
    const d = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('ru-RU', { dateStyle: 'short', timeStyle: 'short' }).format(d);
  }

  changeUserRole(userId: string, newRole: 'Admin' | 'Client' | 'Contractor'): void {
    this.userService.updateUserRole(userId, newRole).subscribe({
      next: () => {
        const user = this.users.find(u => u.id === userId);
        if (user) user.role = newRole;
      },
      error: (err) => {
        console.error('Ошибка при изменении роли:', err);
      }
    });
  }
}
