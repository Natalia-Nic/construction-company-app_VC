// src/app/models/application.model.ts

/**
 * Модель заявки клиента на строительство
 * Создается когда клиент выбирает проект из каталога
 */
export interface Application {
  id: number;                           // Уникальный идентификатор заявки
  clientId: number;                     // ID клиента, который подал заявку
  projectId: number;                    // ID выбранного проекта
  status: 'Pending' | 'Approved' | 'Rejected' | 'InProgress' | 'Completed';  // Статус заявки
  createdAt: Date;                      // Дата подачи заявки
  updatedAt: Date;                      // Дата последнего обновления
  clientComments?: string;              // Комментарии клиента при подаче заявки
  contractorComments?: string;          // Комментарии подрядчика
  
  // Эти поля будут подгружаться при запросе (не хранятся в базе)
  client?: {                            // Данные клиента (для подрядчика)
    fullName: string;
    email: string;
    phone: string;
  };
  project?: {                           // Данные проекта (для отображения)
    name: string;
    price: number;
    imageUrl: string;
  };
}

/**
 * Модель для создания новой заявки
 */
export interface CreateApplicationRequest {
  projectId: number;           // ID выбранного проекта
  clientComments?: string;     // Дополнительные пожелания клиента
}

/**
 * Статусы заявки с переводами для интерфейса
 */
export const ApplicationStatus = {
  Pending: { value: 'Pending', label: 'На рассмотрении', color: 'warning' },
  Approved: { value: 'Approved', label: 'Одобрена', color: 'success' },
  Rejected: { value: 'Rejected', label: 'Отклонена', color: 'error' },
  InProgress: { value: 'InProgress', label: 'В работе', color: 'info' },
  Completed: { value: 'Completed', label: 'Завершена', color: 'primary' }
} as const;