// src/app/components/my-applications/my-applications.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../services/application';
import { Application, ApplicationStatus } from '../../models/application.model';

@Component({
  selector: 'app-my-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-applications.html',
  styleUrl: './my-applications.scss'
})
export class MyApplications implements OnInit {
  applications: Application[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.loadMyApplications();
  }

  loadMyApplications(): void {
    this.loading = true;
    this.applicationService.getMyApplications().subscribe({
      next: (applications) => {
        this.applications = applications;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Ошибка загрузки заявок';
        this.loading = false;
        console.error('Error loading applications:', error);
      }
    });
  }

  getStatusInfo(status: string): { label: string, color: string } {
    return ApplicationStatus[status as keyof typeof ApplicationStatus] || 
           { label: status, color: 'default' };
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('ru-RU');
  }
}