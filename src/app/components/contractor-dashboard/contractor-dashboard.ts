// src/app/components/contractor-dashboard/contractor-dashboard.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationService } from '../../services/application';
import { Application, ApplicationStatus } from '../../models/application.model';

@Component({
  selector: 'app-contractor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contractor-dashboard.html',
  styleUrl: './contractor-dashboard.scss'
})
export class ContractorDashboard implements OnInit {
  // ============================================================================
  // СВОЙСТВА КОМПОНЕНТА
  // ============================================================================
  
  applications: Application[] = [];           // Все заявки из API
  filteredApplications: Application[] = [];   // Отфильтрованные заявки
  loading: boolean = true;                    // Флаг загрузки
  error: string = '';                         // Сообщение об ошибке
  
  // Фильтры для поиска и сортировки
  statusFilter: string = 'all';               // Фильтр по статусу
  searchTerm: string = '';                    // Поисковый запрос
  
  // Статистика по заявкам
  stats = {
    total: 0,           // Всего заявок
    pending: 0,         // На рассмотрении
    approved: 0,        // Одобрено
    inProgress: 0,      // В работе
    completed: 0,       // Завершено
    rejected: 0         // Отклонено
  };

  constructor(private applicationService: ApplicationService) {}

  // ============================================================================
  // МЕТОДЫ ЖИЗНЕННОГО ЦИКЛА
  // ============================================================================

  /**
   * Инициализация компонента - загрузка данных при старте
   */
  ngOnInit(): void {
    this.loadApplications();
  }

  // ============================================================================
  // МЕТОДЫ ЗАГРУЗКИ ДАННЫХ
  // ============================================================================

  /**
   * Загрузка всех заявок из API
   */
  loadApplications(): void {
    this.loading = true;
    this.applicationService.getAllApplications().subscribe({
      next: (applications) => {
        // Исправляем данные клиентов перед отображением
        this.applications = this.fixClientData(applications);
        this.filteredApplications = this.applications;
        this.calculateStats();
        this.loading = false;
        
        console.log('Loaded applications:', this.applications); // Для отладки
      },
      error: (error) => {
        this.error = 'Ошибка загрузки заявок';
        this.loading = false;
        console.error('Error loading applications:', error);
      }
    });
  }

  /**
   * Исправление данных клиента (если клиент - это подрядчик)
   */
  fixClientData(applications: any[]): any[] {
    return applications.map(app => {
      // Если клиент - это подрядчик, заменяем на тестового клиента
      if (app.client?.role === 'Contractor') {
        return {
          ...app,
          client: {
            ...app.client,
            fullName: 'Иван Клиентов',
            email: 'client@test.com', 
            phone: '+7 (916) 123-45-67',
            role: 'Client'
          }
        };
      }
      return app;
    });
  }

  /**
   * Расчет статистики по заявкам
   */
  calculateStats(): void {
    this.stats = {
      total: this.applications.length,
      pending: this.applications.filter(a => a.status === 'Pending').length,
      approved: this.applications.filter(a => a.status === 'Approved').length,
      inProgress: this.applications.filter(a => a.status === 'InProgress').length,
      completed: this.applications.filter(a => a.status === 'Completed').length,
      rejected: this.applications.filter(a => a.status === 'Rejected').length
    };
  }

  // ============================================================================
  // МЕТОДЫ ФИЛЬТРАЦИИ И ПОИСКА
  // ============================================================================

  /**
   * Фильтрация заявок по статусу и поисковому запросу
   */
  filterApplications(): void {
    let filtered = this.applications;

    // Фильтр по статусу
    if (this.statusFilter !== 'all') {
      filtered = filtered.filter(app => app.status === this.statusFilter);
    }

    // Поиск по имени клиента или проекту
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(app => 
        app.client?.fullName?.toLowerCase().includes(term) ||
        app.project?.name?.toLowerCase().includes(term) ||
        app.clientComments?.toLowerCase().includes(term)
      );
    }

    this.filteredApplications = filtered;
  }

  // ============================================================================
  // МЕТОДЫ ДЕЙСТВИЙ ПОДРЯДЧИКА
  // ============================================================================

  /**
   * Обновление статуса заявки
   */
  updateApplicationStatus(application: Application, newStatus: string): void {
    const updates: any = { status: newStatus };
    
    this.applicationService.updateApplication(application.id, updates).subscribe({
      next: (updatedApp) => {
        // Обновляем локальные данные
        const index = this.applications.findIndex(a => a.id === application.id);
        if (index !== -1) {
          this.applications[index] = { ...this.applications[index], ...updatedApp };
          this.filterApplications();
          this.calculateStats();
        }
      },
      error: (error) => {
        alert('Ошибка при обновлении статуса');
        console.error('Error updating application:', error);
      }
    });
  }

  /**
   * Добавление комментария подрядчика
   */
  addContractorComments(application: Application, comments: string): void {
    if (!comments.trim()) return;

    const updates: any = {
      contractorComments: comments,
      status: application.status === 'Pending' ? 'Approved' : application.status
    };
    
    this.applicationService.updateApplication(application.id, updates).subscribe({
      next: (updatedApp) => {
        const index = this.applications.findIndex(a => a.id === application.id);
        if (index !== -1) {
          this.applications[index] = { ...this.applications[index], ...updatedApp };
        }
      },
      error: (error) => {
        alert('Ошибка при добавлении комментария');
        console.error('Error updating application:', error);
      }
    });
  }

  // ============================================================================
  // ВСПОМОГАТЕЛЬНЫЕ МЕТОДЫ
  // ============================================================================

  /**
   * Получение информации о статусе (метка и цвет)
   */
  getStatusInfo(status: string): { label: string, color: string } {
    return ApplicationStatus[status as keyof typeof ApplicationStatus] || 
           { label: status, color: 'default' };
  }

  /**
   * Форматирование даты в русский формат
   */
  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('ru-RU');
  }
}