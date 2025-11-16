// src/app/components/contractor-panel/contractor-panel.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../services/application';
import { Application, ApplicationStatus } from '../../models/application.model';

@Component({
  selector: 'app-contractor-panel',
  imports: [CommonModule],
  templateUrl: './contractor-panel.html',
  styleUrl: './contractor-panel.scss',
})
export class ContractorPanel implements OnInit {
  applications: Application[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private applicationService: ApplicationService) {}

  ngOnInit(): void {
    this.loadAllApplications();
  }

  // Загружаем ВСЕ заявки (для подрядчика)
  loadAllApplications(): void {
    this.loading = true;
    this.applicationService.getAllApplications().subscribe({
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

  // Взять заявку в работу
  takeToWork(applicationId: number): void {
    this.applicationService.updateStatus(applicationId, 'InProgress').subscribe({
      next: (response) => {
        alert('Заявка взята в работу!');
        this.loadAllApplications();
      },
      error: (error) => {
        alert('Ошибка: ' + error.message);
      }
    });
  }

  // ОТПРАВИТЬ ДОГОВОР (НОВЫЙ МЕТОД)
  sendContract(applicationId: number): void {
    this.applicationService.updateStatus(applicationId, 'ContractSent').subscribe({
      next: (response) => {
        alert('Договор отправлен клиенту!');
        this.loadAllApplications();
      },
      error: (error) => {
        alert('Ошибка: ' + error.message);
      }
    });
  }

  // Завершить заявку
  completeApplication(applicationId: number): void {
    this.applicationService.updateStatus(applicationId, 'Completed').subscribe({
      next: (response) => {
        alert('Заявка завершена!');
        this.loadAllApplications();
      },
      error: (error) => {
        alert('Ошибка: ' + error.message);
      }
    });
  }

  // Получить заявки по статусу для статистики
  getApplicationsByStatus(status: string): Application[] {
    return this.applications.filter(app => app.status === status);
  }

  // Безопасная проверка статуса
  isStatus(application: Application, status: string): boolean {
    return application.status === status;
  }

  getStatusInfo(status: string) {
    const statusEntry = Object.values(ApplicationStatus).find(s => s.value === status);
    return statusEntry || { label: status, color: 'default' };
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('ru-RU');
  }
}