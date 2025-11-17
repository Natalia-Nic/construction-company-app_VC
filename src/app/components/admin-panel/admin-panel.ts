import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.scss']
})
export class AdminPanel implements OnInit {
  users: any[] = [];
  applications: any[] = [];
  projects: any[] = [];
  loading = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
    this.loadMockData();
  }

  loadUsers() {
    this.loading = true;
    this.userService.getAllUsers().subscribe(users => {
      this.users = users;
      this.loading = false;
    });
  }

  loadMockData() {
    this.applications = [{id: 1}, {id: 2}, {id: 3}];
    this.projects = [{id: 1}, {id: 2}, {id: 3}];
  }

  changeUserRole(userId: string, role: string) {
    const validRole = role as 'Admin' | 'Client' | 'Contractor';
    this.userService.changeUserRole(userId, validRole).subscribe({
      next: () => {
        this.loadUsers();
        alert('Роль изменена!');
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Ошибка изменения роли');
      }
    });
  }

  formatDate(date: string) {
    return new Date(date).toLocaleDateString('ru-RU');
  }
}